import { pool } from "../db.config.js";

export async function addMission(storeId, dto) {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query(
        `INSERT INTO mission (store_id, reward, deadline, mission_spec)
         VALUES (?, ?, ?, ?);`,
        [
          storeId,
          dto.reward,
          dto.deadline ? dto.deadline : null,
          dto.missionSpec
        ]
      );
      return result.insertId;
    } finally {
      conn.release();
    }
  }

  export async function getMissionById(missionId) {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query(
        `SELECT * FROM mission WHERE id = ?;`,
        [missionId]
      );
      return rows[0] || null;
    } finally {
      conn.release();
    }
  }