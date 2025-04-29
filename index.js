import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {handleUserSignUp} from "./src/controllers/user.controller.js";
import {handleCreateStore} from "./src/controllers/store.controller.js"
import { handleCreateReview } from "./src/controllers/review.controller.js";
import { handleCreateMission } from "./src/controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); //cors 방식 허용
app.use(express.static('public')); //정적 파일 접근
app.use(express.json()); //request의 본문을 json으로 해석할 수 있도록함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({extended: false})); //단순 객체 문자열 형태로 본문 데이터 해석


app.get("/", (req,res)=>{
    res.status(200);
    res.send("학교가기싫어요");
});

app.post("/users/signup", handleUserSignUp);
app.post("/stores", handleCreateStore);
app.post("/stores/:storeId/reviews", handleCreateReview);
app.post("/stores/:storeId/missions", handleCreateMission);

app.listen(port, () =>{
    console.log(`${port}번 포트에서 서버 실행 중`);
});