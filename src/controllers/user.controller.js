// src/controllers/user.controller.js
import { StatusCodes } from "http-status-codes";
import { userSignUp }  from "../services/user.service.js";
import { bodyToUser } from "../dtos/user.dto.js";


/*export async function handleUserSignUp(req, res) {
  try {
    const result = await userSignUp(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    const code = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(code).json({ error: err.message });
  }
}*/
export const handleUserSignUp = async (req, res, next) => {
   /* #swagger.summary = '회원가입 API'
     #swagger.description = '새로운 사용자를 등록합니다. 이메일은 고유해야 합니다.'
     #swagger.tags = ['Users']
     #swagger.requestBody = {
       required: true,
       content: {
         'application/json': {
           schema: {
             type: 'object',
             required: ['email', 'name', 'gender', 'birth', 'phoneNumber'],
             properties: {
               email: {
                 type: 'string',
                 example: 'user@example.com',
                 description: '사용자 이메일 (중복 불가)'
               },
               name: {
                 type: 'string',
                 example: '홍길동',
                 description: '사용자 이름'
               },
               gender: {
                 type: 'string',
                 example: 'MALE',
                 description: '성별'
               },
               birth: {
                 type: 'string',
                 format: 'date',
                 example: '1990-01-01',
                 description: '생년월일'
               },
               address: {
                 type: 'string',
                 example: '서울시 강남구',
                 description: '주소'
               },
               detailAddress: {
                 type: 'string',
                 example: '역삼동 123-45',
                 description: '상세 주소'
               },
               phoneNumber: {
                 type: 'string',
                 example: '010-1234-5678',
                 description: '전화번호'
               },
               preferences: {
                 type: 'array',
                 items: {
                   type: 'integer'
                 },
                 example: [1, 2, 3],
                 description: '선호하는 음식 카테고리 ID 목록'
               }
             }
           }
         }
       }
     }
     #swagger.responses[201] = {
       description: '회원가입 성공',
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
                   memberId: { type: 'integer', example: 1 },
                   email: { type: 'string', example: 'user@example.com' },
                   name: { type: 'string', example: '홍길동' },
                   gender: { type: 'string', example: 'MALE' },
                   birth: { 
                     type: 'string', 
                     format: 'date-time',
                     example: '1990-01-01T00:00:00.000Z' 
                   },
                   address: { type: 'string', example: '서울시 강남구' },
                   detailAddress: { type: 'string', example: '역삼동 123-45' },
                   phoneNumber: { type: 'string', example: '010-1234-5678' },
                   preferences: { 
                     type: 'array',
                     items: { type: 'integer' },
                     example: [1, 2, 3]
                   }
                 }
               }
             }
           }
         }
       }
     }
     #swagger.responses[400] = {
       description: '잘못된 요청',
       content: {
         'application/json': {
           schema: {
             type: 'object',
             properties: {
               resultType: { type: 'string', example: 'ERROR' },
               error: { 
                 type: 'object',
                 properties: {
                   message: { type: 'string', example: '잘못된 요청 형식입니다.' }
                 } 
               },
               success: { type: 'object', nullable: true, example: null }
             }
           }
         }
       }
     }
     #swagger.responses[409] = {
       description: '이메일 중복',
       content: {
         'application/json': {
           schema: {
             type: 'object',
             properties: {
               resultType: { type: 'string', example: 'ERROR' },
               error: { 
                 type: 'object',
                 properties: {
                   message: { type: 'string', example: '이미 존재하는 이메일입니다.' }
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
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);

    // 1) 요청 바디 → DTO
    const dto = bodyToUser(req.body);

    // 2) 서비스 호출 (DuplicateUserEmailError 같은 커스텀 에러 던짐)
    const user = await userSignUp(dto);

    // 3) 성공 응답 (워크북 패턴)
    return res
      .status(StatusCodes.CREATED)  // 201
      .success(user);
  } catch (err) {
    // 4) 에러를 전역 에러 핸들러로 넘겨줍니다.
    return next(err);
  }
}

