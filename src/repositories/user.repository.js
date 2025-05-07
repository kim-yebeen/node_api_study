import { prisma } from "../db.config.js";

export async function addUser(data) {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) return null;
  const created = await prisma.user.create({
    data: {
      email:         data.email,
      name:          data.name,
      gender:        data.gender,
      birth:         data.birth,
      address:       data.address,
      detailAddress: data.detailAddress,
      phoneNumber:   data.phoneNumber,
  
      favorites: {
        create: data.preferences.map(prefId => ({
          foodCategory: { connect: { id: prefId } }
        }))
      }
    },
    include: {
      favorites: true }
  });
  return created.id;
}

export async function getUser(userId) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: { favorites: true }
  });
}

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};
