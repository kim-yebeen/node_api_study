// src/services/mission.service.js
import { StatusCodes }            from "http-status-codes";
import {
  addMission,
  getMissionById,
  getMissionsByStore
} from "../repositories/mission.repository.js";
import { bodyToMission }          from "../dtos/mission.dto.js";

export async function createMission(storeId, rawBody) {
  // 1) DTO 변환
  const dto = bodyToMission(rawBody);

  // 2) storeId 검증
  const missionId = await addMission(storeId, dto);
  return { missionId };
}

export async function listStoreMissions(storeId) {
  const rows = await getMissionsByStore(storeId);
  return rows.map(r => ({
    missionId:   r.id,
    storeId:     r.storeId,
    reward:      r.reward,
    deadline:    r.deadline,
    missionSpec: r.missionSpec
  }));
}
