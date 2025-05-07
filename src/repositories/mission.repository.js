// src/repositories/mission.repository.js
import { prisma } from "../db.config.js";

export async function addMission(storeId, dto) {
  const created = await prisma.mission.create({
    data: {
      store:       { connect: { id: storeId } },
      reward:      dto.reward,
      deadline:    dto.deadline,
      missionSpec: dto.missionSpec
    }
  });
  return created.id;
}

export async function getMissionById(id) {
  return prisma.mission.findUnique({ where: { id } });
}

export async function getMissionsByStore(storeId) {
  return prisma.mission.findMany({
    where: { storeId },
    orderBy: { id: "asc" }
  });
}
