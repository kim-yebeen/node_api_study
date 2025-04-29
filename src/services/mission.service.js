import { addMission }   from "../repositories/mission.repository.js";
import { getStoreById } from "../repositories/store.repository.js";
import { StatusCodes }  from "http-status-codes";


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