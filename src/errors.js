import { StatusCodes } from 'http-status-codes';

export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }

  export class StoreNotFoundError extends Error {
    errorCode = "S001";
    statusCode = StatusCodes.NOT_FOUND;
  
    constructor(reason = "가게를 찾을 수 없습니다.", data = null) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class RegionNotFoundError extends Error {
    errorCode = "R001";
    statusCode = StatusCodes.NOT_FOUND;
  
    constructor(reason = "지역을 찾을 수 없습니다.", data = null) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class MissionNotFoundError extends Error {
    errorCode = "M001";
    statusCode = StatusCodes.NOT_FOUND;
  
    constructor(reason = "미션을 찾을 수 없습니다.", data = null) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class AlreadyChallengingMissionError extends Error {
    errorCode = "M002";
    statusCode = StatusCodes.CONFLICT;
  
    constructor(reason = "이미 도전 중인 미션입니다.", data = null) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }
  
  export class UserNotFoundError extends Error {
    errorCode = "U002";
    statusCode = StatusCodes.NOT_FOUND;
  
    constructor(reason = "사용자를 찾을 수 없습니다.", data = null) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }