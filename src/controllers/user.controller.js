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

