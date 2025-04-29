import { pool } from "../db.config.js";

export async function getRegionById(regionId) {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query(
        `SELECT id, name FROM region WHERE id = ?;`,
        [regionId]
      );
      return rows[0] || null;  // 없으면 null
    } finally {
      conn.release();
    }
  }