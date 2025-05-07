// src/repositories/store.repository.js
import { prisma } from "../db.config.js";

export async function addStore(dto) {
  const created = await prisma.store.create({
    data: {
      region:  { connect: { id: dto.regionId } },
      name:     dto.name,
      address:  dto.address,
      score:    dto.score
    }
  });
  return created.id;
}

export async function getStoreById(storeId) {
  return prisma.store.findUnique({ where: { id: storeId } });
}

export async function getRegionById(regionId) {
  return prisma.region.findUnique({ where: { id: regionId } });
}
