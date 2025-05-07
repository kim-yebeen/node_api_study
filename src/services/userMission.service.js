// src/services/userMission.service.js
import { StatusCodes } from "http-status-codes";
import {
  getMyMissions,
  updateMissionStatus,
  addUserMission,
  findUserMission
} from "../repositories/userMission.repository.js";
import {
  transformUserMissions,
  transformMissionStatus
} from "../dtos/userMission.dto.js";

export async function listUserMissions(userId) {
  const rows = await getMyMissions(userId);
  return transformUserMissions(rows);
}

export async function challengeUserMission(userId, missionId) {
  // 중복 등록 방지
  const existing = await findUserMission(userId, missionId);
  if (existing) {
    const err = new Error("이미 도전 중인 미션입니다.");
    err.status = StatusCodes.CONFLICT;
    throw err;
  }
  const id = await addUserMission(userId, missionId);
  return { userMissionId: id, status: "in_progress" };
}

export async function completeUserMission(userId, missionId) {
  const updated = await updateMissionStatus(userId, missionId, "completed");
  if (!updated) {
    const err = new Error("진행 중인 미션을 찾을 수 없습니다.");
    err.status = StatusCodes.NOT_FOUND;
    throw err;
  }
  return transformMissionStatus(updated);
}
