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
import { getMissionById } from "../repositories/mission.repository.js";

import {
  AlreadyChallengingMissionError,
  MissionNotFoundError // MissionNotFoundError import 추가
} from "../errors.js"; // errors.js 경로 확인
export async function listUserMissions(userId) {
  const rows = await getMyMissions(userId);
  return transformUserMissions(rows);
}

export async function challengeUserMission(userId, missionId) {
  const mission = await getMissionById(missionId);
  if (!mission) {
    throw new MissionNotFoundError(`ID가 ${missionId}인 미션을 찾을 수 없습니다.`);
  }
  // 중복 등록 방지
  const existing = await findUserMission(userId, missionId);
  if (existing) {
    //const err = new Error("이미 도전 중인 미션입니다.");
    //err.status = StatusCodes.CONFLICT;
    //throw err;
    throw new AlreadyChallengingMissionError("이미 도전 중인 미션입니다.");
  }
  const id = await addUserMission(userId, missionId);
  return { userMissionId: id, status: "in_progress" };
}

export async function completeUserMission(userId, missionId) {
  const updated = await updateMissionStatus(userId, missionId, "completed");
  if (!updated) {
    //const err = new Error("진행 중인 미션을 찾을 수 없습니다.");
    //err.status = StatusCodes.NOT_FOUND;
    //throw err;
    throw new MissionNotFoundError("진행 중인 미션을 찾을 수 없습니다.");
  }
  return transformMissionStatus(updated);
}
