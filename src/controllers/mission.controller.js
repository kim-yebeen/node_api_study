import { StatusCodes }  from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";

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