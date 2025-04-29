import { addMission }   from "../repositories/mission.repository.js";
import { getStoreById } from "../repositories/store.repository.js";
import { StatusCodes }  from "http-status-codes";
import { getMissionById } from "../repositories/mission.repository.js";
import { findUserMission, addUserMission } from "../repositories/userMission.repository.js";


export async function createMission(storeId, missionDto) {
    // 1) 가게 존재 검증
    const store = await getStoreById(storeId);
    if (!store) {
      const err = new Error("가게를 찾을 수 없습니다.");
      err.status = StatusCodes.NOT_FOUND;
      throw err;
    }
  
    // 2) 미션 삽입
    const missionId = await addMission(storeId, missionDto);
    return { missionId };
  }


  export async function challengeMission(userId, storeId, missionId) {
    // 1) 미션 존재 검증
    const mission = await getMissionById(missionId);
    if (!mission || mission.store_id !== storeId) {
      const err = new Error("도전하려는 미션을 찾을 수 없습니다.");
      err.status = StatusCodes.NOT_FOUND;
      throw err;
    }
  
    // 2) 이미 도전 중인지 확인
    const existing = await findUserMission(userId, missionId);
    if (existing) {
      const err = new Error("이미 도전 중인 미션입니다.");
      err.status = StatusCodes.CONFLICT;
      throw err;
    }
  
    // 3) 도전 시작 (insert)
    const userMissionId = await addUserMission(userId, missionId);
    return { userMissionId };
  }