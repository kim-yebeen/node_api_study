export function bodyToMission(body) {
    return {
      reward: Number(body.reward),                        
      deadline: body.deadline ? new Date(body.deadline) : null,  
      missionSpec: String(body.missionSpec)               
    };
  }