// src/controllers/userMission.controller.js
import { StatusCodes } from "http-status-codes";
import {
  listUserMissions,
  completeUserMission,
  challengeUserMission
} from "../services/userMission.service.js";

export async function handleListUserMissions(req, res, next) {
  try {
    const userId = Number(req.params.userId);
    const data   = await listUserMissions(userId);
    //res.status(StatusCodes.OK).json(data);
    res.status(StatusCodes.OK).success(data);
  } catch (err) {
    //const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    //res.status(code).json({ error: err.message });
    return next(err);
  }
}

export async function handleCompleteMission(req, res, next) {
  try {
    const userId    = Number(req.params.userId);
    const missionId = Number(req.params.missionId);
    const data      = await completeUserMission(userId, missionId);
    //res.status(StatusCodes.OK).json(data);
    res.status(StatusCodes.OK).success(data);
  } catch (err) {
    //const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    //res.status(code).json({ error: err.message });
    return next(err);
  }
}
