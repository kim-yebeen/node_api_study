import { StatusCodes } from "http-status-codes";
import {
  createReview,
  listMyReviews,
  listStoreReviews,
} from "../services/review.service.js";

// POST   /stores/:storeId/reviews
export async function handleCreateReview(req, res, next) {
   /* #swagger.summary = '리뷰 생성 API'
     #swagger.description = '특정 상점에 대한 새 리뷰를 작성합니다.'
     #swagger.tags = ['Review']
     #swagger.parameters['storeId'] = {
        in: 'path',
        description: '상점 ID',
        required: true,
        type: 'integer'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: '리뷰 정보',
        required: true,
        schema: {
          type: 'object',
          properties: {
            body: { 
              type: 'string', 
              example: '맛있고 서비스도 좋았어요!' 
            },
            score: { 
              type: 'number', 
              example: 4.5,
              description: '평점 (1-5)'
            },
            images: { 
              type: 'array', 
              items: {
                type: 'string'
              },
              example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
              description: '리뷰 이미지 URL 목록'
            }
          },
          required: ['body', 'score']
        }
     }
     #swagger.responses[201] = {
        description: '리뷰 생성 성공',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                resultType: { type: 'string', example: 'SUCCESS' },
                error: { type: 'object', nullable: true, example: null },
                success: { 
                  type: 'object',
                  properties: {
                    reviewId: { type: 'number', example: 1 }
                  }
                }
              }
            }
          }
        }
     }
     #swagger.responses[404] = {
        description: '가게를 찾을 수 없음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                resultType: { type: 'string', example: 'FAIL' },
                error: { 
                  type: 'object',
                  properties: {
                    errorCode: { type: 'string', example: 'store_not_found' },
                    reason: { type: 'string', example: '가게를 찾을 수 없습니다.' },
                    data: { type: 'object', nullable: true }
                  }
                },
                success: { type: 'object', nullable: true, example: null }
              }
            }
          }
        }
     }
  */
  try {
    const userId  = req.user.id; 
    const storeId = Number(req.params.storeId);
    const result  = await createReview(userId, storeId, req.body);
    //res.status(StatusCodes.CREATED).json(result);
    res.status(StatusCodes.CREATED).success(result);
  } catch (err) {
    //const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    //res.status(code).json({ error: err.message });
    return next(err);
  }
}

// GET    /users/:userId/reviews
export async function handleListMyReviews(req, res, next) {
  /* #swagger.summary = '사용자 리뷰 목록 조회 API'
     #swagger.description = '특정 사용자가 작성한 모든 리뷰를 조회합니다.'
     #swagger.tags = ['Review']
     #swagger.parameters['userId'] = {
        in: 'path',
        description: '사용자 ID',
        required: true,
        type: 'integer'
     }
     #swagger.responses[200] = {
        description: '사용자 리뷰 목록 조회 성공',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                resultType: { type: 'string', example: 'SUCCESS' },
                error: { type: 'object', nullable: true, example: null },
                success: { 
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      reviewId: { type: 'number', example: 1 },
                      store: { 
                        type: 'object',
                        properties: {
                          id: { type: 'number', example: 1 },
                          name: { type: 'string', example: '스타벅스 서교점' }
                        }
                      },
                      content: { type: 'string', example: '맛있고 서비스도 좋았어요!' },
                      score: { type: 'number', example: 4.5 },
                      createdAt: { 
                        type: 'string', 
                        format: 'date-time',
                        example: '2025-05-20T15:30:00.000Z'
                      }
                    }
                  }
                }
              }
            }
          }
        }
     }
     #swagger.responses[404] = {
        description: '사용자를 찾을 수 없음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                resultType: { type: 'string', example: 'FAIL' },
                error: { 
                  type: 'object',
                  properties: {
                    errorCode: { type: 'string', example: 'user_not_found' },
                    reason: { type: 'string', example: '사용자를 찾을 수 없습니다.' },
                    data: { 
                      type: 'object',
                      properties: {
                        userId: { type: 'number', example: 999 }
                      }
                    }
                  }
                },
                success: { type: 'object', nullable: true, example: null }
              }
            }
          }
        }
     }
  */
  try {
    const userId = req.user.id;
    const data   = await listMyReviews(userId);
    //res.status(StatusCodes.OK).json(data);
    res.status(StatusCodes.OK).success(data);
  } catch (err) {
    //const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    //res.status(code).json({ error: err.message });
    return next(err);
  }
}

// GET    /stores/:storeId/reviews
export async function handleListStoreReviews(req, res,next) {
  /* #swagger.summary = '상점 리뷰 목록 조회 API'
     #swagger.description = '특정 상점에 작성된 모든 리뷰를 조회합니다.'
     #swagger.tags = ['Review']
     #swagger.parameters['storeId'] = {
        in: 'path',
        description: '상점 ID',
        required: true,
        type: 'integer'
     }
     #swagger.responses[200] = {
        description: '상점 리뷰 목록 조회 성공',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                resultType: { type: 'string', example: 'SUCCESS' },
                error: { type: 'object', nullable: true, example: null },
                success: { 
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      reviewId: { type: 'number', example: 1 },
                      userName: { type: 'string', example: '홍길동' },
                      content: { type: 'string', example: '맛있고 서비스도 좋았어요!' },
                      score: { type: 'number', example: 4.5 },
                      createdAt: { 
                        type: 'string', 
                        format: 'date-time',
                        example: '2025-05-20T15:30:00.000Z'
                      }
                    }
                  }
                }
              }
            }
          }
        }
     }
  */
  try {
    const storeId = Number(req.params.storeId);
    const data    = await listStoreReviews(storeId);
    //res.status(StatusCodes.OK).json(data);
    res.status(StatusCodes.OK).success(data);
  } catch (err) {
    //const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    //res.status(code).json({ error: err.message });
    return next(err);
  }
}
