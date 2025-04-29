import { pool } from "../db.config.js"; // DB 커넥션 풀

// User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();
  try {
    // 이메일 중복 확인
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) AS isExistEmail;`,
      [data.email]
    );
    if (confirm[0].isExistEmail) {
      return null;
    }
    // 사용자 삽입
    const [result] = await conn.query(
      `INSERT INTO users (
         email, name, gender, birth,
         address, detail_address, phone_number
       ) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.detailAddress,
        data.phoneNumber,
      ]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 정보 조회
export const getUser = async (userId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM users WHERE id = ?;`,
      [userId]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO user_favor_category (user_id, food_category_id)
       VALUES (?, ?);`,
      [userId, foodCategoryId]
    );
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();
  try {
    const [preferences] = await conn.query(
      `SELECT
         ufc.id,
         ufc.user_id,
         ufc.food_category_id,
         fcl.name
       FROM user_favor_category AS ufc
       JOIN food_category AS fcl
         ON ufc.food_category_id = fcl.id
       WHERE ufc.user_id = ?
       ORDER BY ufc.food_category_id ASC;`,
      [userId]
    );
    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`
    );
  } finally {
    conn.release();
  }
};

