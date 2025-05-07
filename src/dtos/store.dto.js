// src/dtos/store.dto.js
export function bodyToStore(body) {
  return {
    regionId: Number(body.regionId),
    name:     String(body.name),
    address:  String(body.address),
    score:    body.score !== undefined ? Number(body.score) : 0
  };
}
