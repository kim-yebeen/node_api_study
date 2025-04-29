import { addReview, addReviewImages } from "../repositories/review.repository.js";
import { getStoreById } from "../repositories/store.repository.js";
import { StatusCodes } from "http-status-codes";

export async function createReview(userId, storeId, dto) {
    // 1) 가게 존재 검증
    const store = await getStoreById(storeId);
    if (!store) {
      const err = new Error("가게를 찾을 수 없습니다.");
      err.status = StatusCodes.NOT_FOUND;
      throw err;
    }
  
    // 2) 리뷰·이미지 저장
    const reviewId = await addReview(userId, storeId, dto);
    await addReviewImages(reviewId, dto.images);
  
    return { reviewId };
  }