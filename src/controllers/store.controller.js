// src/controllers/store.controller.js
import { StatusCodes }      from "http-status-codes";
import { createStore }      from "../services/store.service.js";

export async function handleCreateStore(req, res, next) {
  /* #swagger.summary = '새로운 스토어 생성 API'
     #swagger.description = '새로운 스토어를 생성합니다. 지역 ID는 유효해야 합니다.'
     #swagger.tags = ['Stores']
     #swagger.requestBody = {
       required: true,
       content: {
         'application/json': {
           schema: {
             type: 'object',
             required: ['regionId', 'name', 'address'],
             properties: {
               regionId: {
                 type: 'integer',
                 example: 1,
                 description: '스토어가 위치한 지역의 ID'
               },
               name: {
                 type: 'string',
                 example: '스타벅스 강남점',
                 description: '스토어 이름'
               },
               address: {
                 type: 'string',
                 example: '서울시 강남구 역삼동 123-45',
                 description: '스토어 주소'
               },
               score: {
                 type: 'number',
                 example: 4.5,
                 description: '스토어 평점 (제공되지 않을 경우 기본값 0)'
               }
             }
           }
         }
       }
     }
     #swagger.responses[201] = {
       description: '스토어가 성공적으로 생성됨',
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
                   storeId: { type: 'integer', example: 1 }
                 }
               }
             }
           }
         }
       }
     }
     #swagger.responses[404] = {
       description: '지정된 지역을 찾을 수 없음',
       content: {
         'application/json': {
           schema: {
             type: 'object',
             properties: {
               resultType: { type: 'string', example: 'ERROR' },
               error: { 
                 type: 'object',
                 properties: {
                   message: { type: 'string', example: '지역을 찾을 수 없습니다.' }
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
    const result = await createStore(req.body);
        //res.status(StatusCodes.CREATED).json(result);
        res.status(StatusCodes.CREATED).success(result);
      } catch (err) {
    //const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    //res.status(code).json({ error: err.message });
    return next(err);
  }
}
