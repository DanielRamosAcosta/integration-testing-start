import { ErrorCode } from "../../../domain/errors/ErrorCode.js"

const errorCodeToStatusMap = {
  [ErrorCode.USER_ALREADY_EXISTS]: 400,
  [ErrorCode.POST_NOT_FOUND]: 404,
  [ErrorCode.PASSWORD_TOO_SMALL]: 400,
  [ErrorCode.INVALID_EMAIL_ERROR]: 400,
  [ErrorCode.INVALID_PARAMS]: 400,
  [ErrorCode.INVALID_PASSWORD_ERROR]: 400,
  [ErrorCode.USER_MUST_BE_ADULT_ERROR]: 400,
  [ErrorCode.USER_WAS_NOT_FOUND]: 404,
  [ErrorCode.WRONG_PASSWORD_ERROR]: 400,
}

export function errorCodeToStatus(code) {
  return errorCodeToStatusMap[code] ?? 500
}
