import { pool } from "../db.config.js";

export async function findUserMission(userId, missionId) {
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.query(
        `SELECT * 
           FROM users_mission 
          WHERE user_id = ? 
            AND mission_id = ? 
            AND status = 'in_progress';`,
        [userId, missionId]
      );
      return rows[0] || null;
    } finally {
      conn.release();
    }
  }
  
  export async function addUserMission(userId, missionId) {
    const conn = await pool.getConnection();
    try {
      const [result] = await conn.query(
        `INSERT INTO users_mission (user_id, mission_id, status)
         VALUES (?, ?, 'in_progress');`,
        [userId, missionId]
      );
      return result.insertId;
    } finally {
      conn.release();
    }
  }