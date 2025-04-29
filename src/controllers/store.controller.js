import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { createStore } from "../services/store.service.js";


export async function handleCreateStore(req, res, next) {
    try {
      // 1) Body → DTO
      const storeDto = bodyToStore(req.body);
  
      // 2) Service 호출
      const result = await createStore(storeDto);
  
      // 3) 201 Created 응답
      res.status(StatusCodes.CREATED).json({ result });
    } catch (err) {
      // err.status가 세팅돼 있으면 그걸, 아니면 500
      const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      res.status(status).json({ error: err.message });
    }
  }