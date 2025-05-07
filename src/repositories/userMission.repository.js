// src/repositories/userMission.repository.js
import { prisma } from "../db.config.js";

/**
 * 이미 도전 중인(userId, missionId, status === "in_progress") 미션이 있는지 찾습니다.
 * @returns UsersMission | null
 */
export async function findUserMission(userId, missionId) {
  return prisma.usersMission.findFirst({
    where: {
      userId,
      missionId,
      status: "in_progress"
    }
  });
}

/**
 * 해당 미션을 in_progress 상태로 users_mission 테이블에 추가합니다.
 * @returns 생성된 usersMission.id (BigInt)
 */
export async function addUserMission(userId, missionId) {
  const created = await prisma.usersMission.create({
    data: {
      user:    { connect: { id: userId } },
      mission: { connect: { id: missionId } },
      status:  "in_progress"
    }
  });
  return created.id;
}

/**
 * 특정 사용자가 진행 중인 모든 미션 목록을 조회합니다.
 * @returns UsersMission[] with nested Mission
 */
export async function getMyMissions(userId) {
  return prisma.usersMission.findMany({
    where: { userId },
    include: { mission: true },
    orderBy: { status: "asc" }
  });
}

/**
 * 진행 중인 미션의 상태를 업데이트(status: "completed" 등)합니다.
 * @returns 업데이트된 UsersMission 객체, 없으면 null
 */
export async function updateMissionStatus(userId, missionId, status) {
  // 먼저 in_progress 중인 레코드를 찾고
  const um = await prisma.usersMission.findFirst({
    where: {
      userId,
      missionId,
      status: "in_progress"
    }
  });
  if (!um) return null;

  // id 기준으로 상태만 업데이트
  return prisma.usersMission.update({
    where: { id: um.id },
    data: { status }
  });
}
