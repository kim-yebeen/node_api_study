// src/services/store.service.js
import { StatusCodes }      from "http-status-codes";
import { addStore, getRegionById } from "../repositories/store.repository.js";
import { bodyToStore }      from "../dtos/store.dto.js";
import { RegionNotFoundError } from "../errors.js";

export async function createStore(rawBody) {
  // 1) DTO 변환
  const dto = bodyToStore(rawBody);

  // 2) region 검증
  const region = await getRegionById(dto.regionId);
  if (!region) {
    //const err = new Error("지역을 찾을 수 없습니다.");
    //err.status = StatusCodes.NOT_FOUND;
    //throw err;
    throw new RegionNotFoundError("지역을 찾을 수 없습니다.");
  }

  // 3) store 생성
  const storeId = await addStore(dto);
  return { storeId };
}
