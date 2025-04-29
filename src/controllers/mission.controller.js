import { StatusCodes }  from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";
import { challengeMission } from "../services/mission.service.js";

export async function handleCreateMission(req, res) {
    try {
      const storeId    = Number(req.params.storeId);
      const missionDto = bodyToMission(req.body);
  
      const result = await createMission(storeId, missionDto);
      return res
        .status(StatusCodes.CREATED)
        .json({ result });
    } catch (err) {
      const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      return res
        .status(status)
        .json({ error: err.message });
    }
  }


  export async function handleChallengeMission(req, res) {
    try {
      const userId    = 1;  // 테스트용 하드코딩
      const storeId   = Number(req.params.storeId);
      const missionId = Number(req.params.missionId);
  
      const result = await challengeMission(userId, storeId, missionId);
      return res
        .status(StatusCodes.CREATED)
        .json({ result });
    } catch (err) {
      const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      return res
        .status(status)
        .json({ error: err.message });
    }
  }