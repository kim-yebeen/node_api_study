// src/controllers/mission.controller.js
import { StatusCodes }       from "http-status-codes";
import {
  createMission,
  listStoreMissions
} from "../services/mission.service.js";
import { challengeUserMission } from "../services/userMission.service.js";

export async function handleCreateMission(req, res,next) {
  try {
    const storeId = Number(req.params.storeId);
    const result  = await createMission(storeId, req.body);
    //res.status(StatusCodes.CREATED).json(result);
    res.status(StatusCodes.CREATED).success(result);
  } catch (err) {
   // const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    //res.status(code).json({ error: err.message });
    return next(err);
  }
}

export async function handleListStoreMissions(req, res, next) {
  try {
    const storeId = Number(req.params.storeId);
    const data    = await listStoreMissions(storeId);
    //res.status(StatusCodes.OK).json(data);
    res.status(StatusCodes.OK).success(data);
  } catch (err) {
    //const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    //res.status(code).json({ error: err.message });
    return next(err);
  }
}

export async function handleChallengeMission(req, res, next) {
  try {
    const userId    = Number(req.params.userId);
    const missionId = Number(req.params.missionId);
    const data      = await challengeUserMission(userId, missionId);
    //res.status(StatusCodes.CREATED).json(data);
    res.status(StatusCodes.CREATED).success(data);
  } catch (err) {
    //const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    //res.status(code).json({ error: err.message });
    return next(err);
  }
}
