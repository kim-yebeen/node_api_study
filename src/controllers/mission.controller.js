// src/controllers/mission.controller.js
import { StatusCodes }       from "http-status-codes";
import {
  createMission,
  listStoreMissions
} from "../services/mission.service.js";
import { challengeUserMission } from "../services/userMission.service.js";

export async function handleCreateMission(req, res,next) {
   /* #swagger.summary = '미션 생성 API'
     #swagger.description = '상점에 새로운 미션을 생성합니다.'
     #swagger.tags = ['Mission']
     #swagger.parameters['storeId'] = {
        in: 'path',
        description: '상점 ID',
        required: true,
        type: 'integer'
     }
     #swagger.parameters['body'] = {
        in: 'body',
        description: '미션 정보',
        required: true,
        schema: {
          type: 'object',
          properties: {
            reward: { 
              type: 'number', 
              example: 3000 
            },
            deadline: { 
              type: 'string', 
              format: 'date-time',
              example: '2025-06-30T00:00:00.000Z' 
            },
            missionSpec: { 
              type: 'string', 
              example: '음료 3잔 구매 시 적립' 
            }
          },
          required: ['reward', 'missionSpec']
        }
     }
     #swagger.responses[201] = {
        description: '미션 생성 성공',
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
                    missionId: { type: 'number', example: 1 }
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
   /* #swagger.summary = '상점 미션 목록 조회 API'
     #swagger.description = '특정 상점의 모든 미션 목록을 조회합니다.'
     #swagger.tags = ['Mission']
     #swagger.parameters['storeId'] = {
        in: 'path',
        description: '상점 ID',
        required: true,
        type: 'integer'
     }
     #swagger.responses[200] = {
        description: '미션 목록 조회 성공',
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
                      missionId: { type: 'number', example: 1 },
                      storeId: { type: 'number', example: 1 },
                      reward: { type: 'number', example: 3000 },
                      deadline: { 
                        type: 'string', 
                        format: 'date-time',
                        example: '2025-06-30T00:00:00.000Z',
                        nullable: true
                      },
                      missionSpec: { type: 'string', example: '음료 3잔 구매 시 적립' }
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
  /* #swagger.summary = '미션 도전 API'
     #swagger.description = '새로운 미션에 도전합니다. 이미 도전 중인 미션이면 에러가 발생합니다.'
     #swagger.tags = ['UserMission']
     #swagger.parameters['userId'] = {
        in: 'path',
        description: '사용자 ID',
        required: true,
        type: 'integer'
     }
     #swagger.parameters['missionId'] = {
        in: 'path',
        description: '미션 ID',
        required: true,
        type: 'integer'
     }
     #swagger.responses[200] = {
        description: '미션 도전 성공',
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
                    userMissionId: { type: 'number', example: 1 },
                    status: { type: 'string', example: 'in_progress' }
                  }
                }
              }
            }
          }
        }
     }
     #swagger.responses[404] = {
        description: '미션을 찾을 수 없음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                resultType: { type: 'string', example: 'ERROR' },
                error: { 
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'ID가 1인 미션을 찾을 수 없습니다.' }
                  } 
                },
                success: { type: 'object', nullable: true, example: null }
              }
            }
          }
        }
     }
     #swagger.responses[409] = {
        description: '이미 도전 중인 미션',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                resultType: { type: 'string', example: 'ERROR' },
                error: { 
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: '이미 도전 중인 미션입니다.' }
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
    const userId    = req.user.id;
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
