import { prisma } from "../db.config.js";

/** 리뷰 생성 (user, store FK 연결 포함) */
export async function addReview(userId, storeId, { body, score }) {
  const review = await prisma.review.create({
    data: {
      user:  { connect: { id: userId } },
      store: { connect: { id: storeId } },
      body,
      score,
    },
  });
  return review.id;
}

/** 리뷰 이미지 일괄 생성 */
export async function addReviewImages(reviewId, images = []) {
  if (!images.length) return;
  await prisma.reviewImage.createMany({
    data: images.map(url => ({
      reviewId,
      imageUrl: url,
    })),
    skipDuplicates: true,
  });
}

/** 내가 쓴 리뷰 목록 조회 */
export async function getReviewsByUserId(userId) {
  const reviews = await prisma.review.findMany({
    where: { userId },
    include: {
      store: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return reviews.map(r => ({
    reviewId:  r.id,
    store:     { id: r.store.id, name: r.store.name },
    content:   r.body,
    score:     r.score,
    createdAt: r.createdAt,
  }));
}

/** 특정 가게의 리뷰 목록 조회 */
export async function getReviewsByStoreId(storeId) {
  const reviews = await prisma.review.findMany({
    where: { storeId },
    include: {
      user: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return reviews.map(r => ({
    reviewId:  r.id,
    userName:  r.user.name,
    content:   r.body,
    score:     r.score,
    createdAt: r.createdAt,
  }));
}

/** (검증용) 가게가 실제로 있는지 확인 */
export async function getStoreById(storeId) {
  return prisma.store.findUnique({ where: { id: storeId } });
}

export async function getUserById(userId) {
  return prisma.user.findUnique({ where: { id: userId } });
}