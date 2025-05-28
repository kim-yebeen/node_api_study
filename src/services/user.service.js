import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  updateUser,
  getUserById
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(db, joinUserId, preference);
  }

  const user = await getUser(db, joinUserId);
  const preferences = await getUserPreferencesByUserId(db, joinUserId);

  return responseFromUser({ user, preferences });
};

// 회원정보 수정 서비스
export const updateUserProfile = async (userId, data) => {
  // 1. 사용자 존재 확인
  const existingUser = await getUserById(userId);
  if (!existingUser) {
    throw new UserNotFoundError("사용자를 찾을 수 없습니다.", { userId });
  }

  // 2. 사용자 기본 정보 업데이트 (이메일 제외)
  const updateData = {
    name: data.name || existingUser.name,
    gender: data.gender || existingUser.gender,
    birth: data.birth ? new Date(data.birth) : existingUser.birth,
    address: data.address !== undefined ? data.address : existingUser.address,
    detailAddress: data.detailAddress !== undefined ? data.detailAddress : existingUser.detailAddress,
    phoneNumber: data.phoneNumber || existingUser.phoneNumber,
  };

  await updateUser(userId, updateData);

  // 3. 업데이트된 사용자 정보 반환
  const updatedUser = await getUser(userId);
  const preferences = await getUserPreferencesByUserId(userId);

  return responseFromUser({ user: updatedUser, preferences });
};