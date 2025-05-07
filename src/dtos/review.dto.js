// src/dtos/review.dto.js
export function bodyToReview(body) {
  return {
    body:   String(body.body),
    score:  Number(body.score),
    images: Array.isArray(body.images) ? body.images : []
  };
}

export function transformSingleReview(r) {
  return {
    reviewId: r.id,
    storeId:  r.storeId,
    userId:   r.userId,
    content:  r.body,
    score:    r.score,
    images:   r.images || []
  };
}

export function transformReviewList(rows) {
  return rows.map(r => ({
    reviewId:  r.id,
    store:     { id: r.storeId, name: r.store?.name },
    user:      { id: r.userId, name: r.user?.name },
    content:   r.content,
    score:     r.score,
    createdAt: r.createdAt
  }));
}
