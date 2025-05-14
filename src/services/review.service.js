import { StatusCodes } from "http-status-codes";
import {
  addReview,
  addReviewImages,
  getReviewsByUserId,
  getReviewsByStoreId,
  getStoreById,
  getUserById
} from "../repositories/review.repository.js";

import { UserNotFoundError, StoreNotFoundError } from "../errors.js";

export async function createReview(userId, storeId, dto) {
  // 1) 가게 존재 검증
  const store = await getStoreById(storeId);
  if (!store) {
    //const err = new Error("가게를 찾을 수 없습니다.");
    //err.status = StatusCodes.NOT_FOUND;
    //throw err;
    throw new StoreNotFoundError("가게를 찾을 수 없습니다.");
  }

  // 2) 리뷰 저장 & 이미지 저장
  const reviewId = await addReview(userId, storeId, dto);
  await addReviewImages(reviewId, dto.images);
  return { reviewId };
}

export async function listMyReviews(userId) {
  const user = await getUserById(userId);
  if (!user) {  
    throw new UserNotFoundError(undefined, { userId });
   }
  return getReviewsByUserId(userId);
}

export async function listStoreReviews(storeId) {
  return getReviewsByStoreId(storeId);
}

