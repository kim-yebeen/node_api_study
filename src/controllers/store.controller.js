// src/controllers/store.controller.js
import { StatusCodes }      from "http-status-codes";
import { createStore }      from "../services/store.service.js";

export async function handleCreateStore(req, res) {
  try {
    const result = await createStore(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(code).json({ error: err.message });
  }
}
