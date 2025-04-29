export function bodyToStore(body) {
    return {
      regionId: Number(body.regionId),          // 숫자형 ID
      name: String(body.name),                  // 가게 이름
      address: String(body.address),            // 주소
      score: body.score !== undefined
        ? Number(body.score)                    // 평점이 없으면 0으로 두려면 || 0 추가
        : 0
    };
  }