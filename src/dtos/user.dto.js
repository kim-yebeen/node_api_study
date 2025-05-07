// src/dtos/user.dto.js
export function bodyToUser(body) {
  return {
    email:         String(body.email),
    name:          String(body.name),
    gender:        String(body.gender),
    birth:         new Date(body.birth),
    address:       body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber:   String(body.phoneNumber),
    preferences:   Array.isArray(body.preferences) ? body.preferences : []
  };
}

export function responseFromUser(user) {
  if (!user) {
    const e = new Error("User not found");
    e.status = 404;
    throw e;
  }
  return {
    memberId: user.id,
    email:    user.email,
    name:     user.name,
    gender:   user.gender,
    birth:    user.birth,
    address:  user.address,
    detailAddress: user.detailAddress,
    phoneNumber:   user.phoneNumber,
    preferences:   user.userFavorCategories?.map(u => u.foodCategoryId) || []
  };
}
