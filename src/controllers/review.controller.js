import { StatusCodes } from "http-status-codes";
import {
  createReview,
  listMyReviews,
  listStoreReviews,
} from "../services/review.service.js";

// POST   /stores/:storeId/reviews
export async function handleCreateReview(req, res) {
  try {
    const userId  = 1; // TODO: 인증 구현 전 임시 하드코딩
    const storeId = Number(req.params.storeId);
    const result  = await createReview(userId, storeId, req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(code).json({ error: err.message });
  }
}

// GET    /users/:userId/reviews
export async function handleListMyReviews(req, res) {
  try {
    const userId = Number(req.params.userId);
    const data   = await listMyReviews(userId);
    res.status(StatusCodes.OK).json(data);
  } catch (err) {
    const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(code).json({ error: err.message });
  }
}

// GET    /stores/:storeId/reviews
export async function handleListStoreReviews(req, res) {
  try {
    const storeId = Number(req.params.storeId);
    const data    = await listStoreReviews(storeId);
    res.status(StatusCodes.OK).json(data);
  } catch (err) {
    const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(code).json({ error: err.message });
  }
}
