import { ErrorCode } from "../../domain/errors/ErrorCode.js"

const errorCodeToStatusMap = {
  [ErrorCode.USER_ALREADY_EXISTS]: 400,
  [ErrorCode.POST_NOT_FOUND]: 404,
  [ErrorCode.PASSWORD_TOO_SMALL]: 400,
}

export function errorCodeToStatus(code) {
  return errorCodeToStatusMap[code] ?? 500
}
