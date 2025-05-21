import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import { handleUserSignUp }           from "./src/controllers/user.controller.js";
import { handleListMyReviews }        from "./src/controllers/review.controller.js";
import { handleCreateStore }          from "./src/controllers/store.controller.js";
import { handleListStoreMissions }    from "./src/controllers/mission.controller.js";
import { handleListUserMissions, 
         handleCompleteMission }      from "./src/controllers/userMission.controller.js";
import { handleCreateReview, handleListStoreReviews }         from "./src/controllers/review.controller.js";
import { handleCreateMission,
         handleChallengeMission }     from "./src/controllers/mission.controller.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});


app.use(cors()); //cors 방식 허용
app.use(express.static('public')); //정적 파일 접근
app.use(express.json()); //request의 본문을 json으로 해석할 수 있도록함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); //단순 객체 문자열 형태로 본문 데이터 해석


// ─────────── User ───────────
app.post("/users/signup",                 handleUserSignUp);
app.get ("/users/:userId/reviews",        handleListMyReviews);
app.get ("/users/:userId/missions",       handleListUserMissions);
app.patch("/users/:userId/missions/:missionId",
                                       handleCompleteMission);

// ─────────── Store ──────────
app.post("/stores",                       handleCreateStore);
app.get ("/stores/:storeId/missions",     handleListStoreMissions);

// ────────── Review ──────────
app.post("/stores/:storeId/reviews",      handleCreateReview);
app.get ("/users/:userId/reviews",        handleListMyReviews);
app.get ("/stores/:storeId/reviews",      handleListStoreReviews);

// ────────── Mission ─────────
app.post("/stores/:storeId/missions",     handleCreateMission);
app.post("/users/:userId/stores/:storeId/missions/:missionId/challenge", handleChallengeMission);



/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).
  error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});


//swagger
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./index.js"];
  const doc = {
    info: {
      title: "UMC 8th",
      description: "UMC 8th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});



app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
}
);
