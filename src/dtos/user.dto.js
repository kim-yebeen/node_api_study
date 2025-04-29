export const bodyToUser = (body) => {
    const birth = new Date(body.birth);

    return {
        email: body.email,
        name: body.name,
        gender: body.gender,
        birth,
        address: body.address || "",
        detailAddress: body.detailAddress || "",
        phoneNumber: body.phoneNumber,
        preferences: body.preferences,
    };
};

export function responseFromUser({ user, preferences }) {
    if (!user) {
      throw new Error("User not found");
    }
  
    return {
      memberId: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      birth: user.birth instanceof Date
        ? user.birth.toISOString()
        : user.birth,
      address: user.address,
      detailAddress: user.detail_address || user.detailAddress,
      phoneNumber: user.phone_number || user.phoneNumber,
      preferences: Array.isArray(preferences)
        ? preferences.map((p) => ({
            categoryId: p.food_category_id,
            categoryName: p.name,
          }))
        : [],
    };
  }