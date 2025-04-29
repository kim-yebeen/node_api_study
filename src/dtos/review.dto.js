export function bodyToReview(body) {
    return {
      body: String(body.body),
      score: Number(body.score),
      images: Array.isArray(body.images) ? body.images : []
    };
  }
  