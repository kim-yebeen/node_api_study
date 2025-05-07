/*
  Warnings:

  - You are about to alter the column `name` on the `food_category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(15)`.
  - You are about to alter the column `name` on the `store` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `address` on the `store` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.
  - You are about to alter the column `gender` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `VarChar(10)`.
  - Added the required column `updated_at` to the `food_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `region` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user_favor_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `food_category` ADD COLUMN `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updated_at` DATETIME(6) NOT NULL,
    MODIFY `name` VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE `region` ADD COLUMN `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updated_at` DATETIME(6) NOT NULL;

-- AlterTable
ALTER TABLE `store` ADD COLUMN `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updated_at` DATETIME(6) NOT NULL,
    MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `address` VARCHAR(50) NULL,
    MODIFY `score` FLOAT NULL;

-- AlterTable
ALTER TABLE `user_favor_category` ADD COLUMN `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updated_at` DATETIME(6) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    ADD COLUMN `updated_at` DATETIME(6) NOT NULL,
    MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `gender` VARCHAR(10) NOT NULL,
    MODIFY `birth` DATE NULL,
    MODIFY `address` VARCHAR(255) NULL,
    MODIFY `phone_number` VARCHAR(20) NULL;

-- CreateTable
CREATE TABLE `terms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(20) NOT NULL,
    `body` TEXT NULL,
    `optional` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_agree` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `terms_id` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `idx_users_agree_user`(`user_id`),
    INDEX `idx_users_agree_terms`(`terms_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER NOT NULL,
    `reward` INTEGER NULL,
    `deadline` DATETIME(6) NULL,
    `mission_spec` TEXT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `idx_mission_store`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_mission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `mission_id` INTEGER NOT NULL,
    `status` VARCHAR(15) NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `idx_um_user`(`user_id`),
    INDEX `idx_um_mission`(`mission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `store_id` INTEGER NOT NULL,
    `body` TEXT NULL,
    `score` FLOAT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `idx_review_user`(`user_id`),
    INDEX `idx_review_store`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `review_id` INTEGER NOT NULL,
    `image_url` TEXT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `idx_ri_review`(`review_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_agree` ADD CONSTRAINT `users_agree_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_agree` ADD CONSTRAINT `users_agree_terms_id_fkey` FOREIGN KEY (`terms_id`) REFERENCES `terms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_mission` ADD CONSTRAINT `users_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_mission` ADD CONSTRAINT `users_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review_image` ADD CONSTRAINT `review_image_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `store` RENAME INDEX `store_region_id_fkey` TO `idx_store_region`;

-- RenameIndex
ALTER TABLE `user_favor_category` RENAME INDEX `f_category_id` TO `idx_ufc_category`;

-- RenameIndex
ALTER TABLE `user_favor_category` RENAME INDEX `user_id` TO `idx_ufc_user`;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `email` TO `users_email_key`;
