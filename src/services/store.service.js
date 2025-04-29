import { addStore } from "../repositories/store.repository.js";
import { getRegionById } from "../repositories/region.repository.js"; // 아래에 구현 예시
import { StatusCodes } from "http-status-codes";


export async function createStore(storeDto) {
    // 1) 지역 검증
    const region = await getRegionById(storeDto.regionId);
    if (!region) {
      const err = new Error("지역을 찾을 수 없습니다.");
      err.status = StatusCodes.NOT_FOUND;
      throw err;
    }
  
    // 2) 가게 삽입
    const storeId = await addStore(storeDto);
    return { storeId };
  }