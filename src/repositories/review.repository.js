import { pool } from "../db.config.js";

export async function addReview(userId, storeId, dto) {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query(
        `INSERT INTO review (user_id, store_id, body, score)
         VALUES (?, ?, ?, ?);`,
        [userId, storeId, dto.body, dto.score]
      );
      return result.insertId;
    } finally {
      conn.release();
    }
  }
  

  export async function addReviewImages(reviewId, images) {
    if (images.length === 0) return;
    const conn = await pool.getConnection();
    try {
      const vals = images.map((url) => [reviewId, url]);
      await conn.query(
        `INSERT INTO review_image (review_id, image_url)
         VALUES ?;`,
        [vals]
      );
    } finally {
      conn.release();
    }
  }