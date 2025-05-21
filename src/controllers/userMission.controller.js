// src/controllers/userMission.controller.js
import { StatusCodes } from "http-status-codes";
import {
  listUserMissions,
  completeUserMission,
  challengeUserMission
} from "../services/userMission.service.js";

export async function handleListUserMissions(req, res, next) {
  /* #swagger.summary = '사용자 미션 목록 조회 API'
     #swagger.description = '특정 사용자의 모든 미션 목록을 조회합니다.'
     #swagger.tags = ['UserMission']
     #swagger.parameters['userId'] = {
        in: 'path',
        description: '사용자 ID',
        required: true,
        type: 'integer'
     }
     #swagger.responses[200] = {
        description: '사용자 미션 목록 조회 성공',
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
                      userMissionId: { type: 'number', example: 1 },
                      missionId: { type: 'number', example: 1 },
                      status: { type: 'string', example: 'in_progress' },
                      missionSpec: { type: 'string', example: '음료 3잔 구매 시 적립' },
                      reward: { type: 'number', example: 3000 },
                      deadline: { 
                        type: 'string', 
                        format: 'date-time',
                        example: '2025-06-30T00:00:00.000Z',
                        nullable: true
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
                resultType: { type: 'string', example: 'ERROR' },
                error: { 
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: '사용자를 찾을 수 없습니다.' }
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
   /* #swagger.summary = '사용자 미션 완료 API'
     #swagger.description = '진행 중인 미션을 완료 상태로 변경합니다.'
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
        description: '미션 완료 처리 성공',
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
                    missionId: { type: 'number', example: 1 },
                    status: { type: 'string', example: 'completed' }
                  }
                }
              }
            }
          }
        }
     }
     #swagger.responses[404] = {
        description: '진행 중인 미션을 찾을 수 없음',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                resultType: { type: 'string', example: 'ERROR' },
                error: { 
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: '진행 중인 미션을 찾을 수 없습니다.' }
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
