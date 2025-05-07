// src/dtos/userMission.dto.js
export function transformUserMissions(rows) {
    return rows.map(r => ({
      userMissionId: r.id,
      missionId:     r.missionId,
      status:        r.status,
      missionSpec:   r.mission?.missionSpec,
      reward:        r.mission?.reward,
      deadline:      r.mission?.deadline
    }));
  }
  
  export function transformMissionStatus(record) {
    return {
      userMissionId: record.id,
      missionId:     record.missionId,
      status:        record.status
    };
  }
  