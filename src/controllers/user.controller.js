// src/controllers/user.controller.js
import { StatusCodes } from "http-status-codes";
import { userSignUp }  from "../services/user.service.js";

export async function handleUserSignUp(req, res) {
  try {
    const result = await userSignUp(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(code).json({ error: err.message });
  }
}
