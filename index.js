import dotenv from "dotenv";
import express from "express";
import cors from "cors";

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
app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행 중`);
});