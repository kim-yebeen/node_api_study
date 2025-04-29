import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js";

export async function handleCreateReview(req, res) {
    try {
      const userId = 1; //일단 하드코딩..
      
      const storeId = Number(req.params.storeId);
      const dto = bodyToReview(req.body);
      const result = await createReview(userId, storeId, dto);
  
      res.status(StatusCodes.CREATED).json({ result });
    } catch (err) {
      const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
      res.status(status).json({ error: err.message });
    }
  }
  