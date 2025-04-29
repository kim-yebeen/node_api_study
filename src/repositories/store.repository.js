import { pool } from "../db.config.js";

export async function addStore(dto) {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query(
        `INSERT INTO store (region_id, name, address, score)
         VALUES (?, ?, ?, ?);`,
        [dto.regionId, dto.name, dto.address, dto.score]
      );
      return result.insertId;
    } finally {
      conn.release();
    }
  }

  export async function getStoreById(storeId) {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query(
        `SELECT * FROM store WHERE id = ?;`,
        [storeId]
      );
      return rows[0] || null;
    } finally {
      conn.release();
    }
  }
  