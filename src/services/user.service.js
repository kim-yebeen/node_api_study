// src/services/user.service.js
import { StatusCodes } from "http-status-codes";
import { addUser, getUser } from "../repositories/user.repository.js";
import { bodyToUser, responseFromUser } from "../dtos/user.dto.js";

export async function userSignUp(rawBody) {
  // 1) DTO 변환
  const userData = bodyToUser(rawBody);

  // 2) 가입 시도
  const userId = await addUser(userData);
  if (userId === null) {
    const err = new Error("이미 존재하는 이메일입니다.");
    err.status = StatusCodes.CONFLICT;
    throw err;
  }

  // 3) 가입된 사용자 조회
  const user = await getUser(userId);
  if (!user) {
    const err = new Error("가입된 사용자를 찾을 수 없습니다.");
    err.status = StatusCodes.INTERNAL_SERVER_ERROR;
    throw err;
  }

  // 4) 응답 DTO
  return responseFromUser(user);
}
