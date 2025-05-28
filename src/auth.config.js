import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import { Strategy as NaverStrategy } from 'passport-naver-v2';

dotenv.config();

export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
    clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
    callbackURL: process.env.PASSPORT_NAVER_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 네이버 프로필에서 email, id 등 추출
      const email = profile.email;
      if (!email) {
        return done(new Error("profile.email was not found: " + JSON.stringify(profile)));
      }

      // 기존 사용자 확인
      let user = await prisma.user.findFirst({ where: { email } });
      if (user) {
        return done(null, { id: user.id, email: user.email, name: user.name });
      }

      // 신규 사용자 생성
      user = await prisma.user.create({
        data: {
          email,
          name: profile.name || profile.nickname || "네이버사용자",
          gender: profile.gender || "추후 수정",
          birth: profile.birthYear && profile.birthday
            ? new Date(Number(profile.birthYear), Number(profile.birthday.split('-')[0]) - 1, Number(profile.birthday.split('-')[1]))
            : new Date(1970, 0, 1),
          address: "추후 수정",
          detailAddress: "추후 수정",
          phoneNumber: profile.mobile || "추후 수정",
        },
      });
      return done(null, { id: user.id, email: user.email, name: user.name });
    } catch (err) {
      return done(err);
    }
  }
);


export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);
const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};