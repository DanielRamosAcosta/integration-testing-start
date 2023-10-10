import { DomainError } from "../../../domain/errors/DomainError.js"
import { errorCodeToStatus } from "./errorCodeToStatus.js"
import { ZodError } from "zod"
import { ErrorCode } from "../../../domain/errors/ErrorCode.js"

// eslint-disable-next-line no-unused-vars
export function handleErrors(err, req, res, next) {
  if (err instanceof DomainError) {
    const { code } = err

    return res.status(errorCodeToStatus(code)).json({
      code: code,
      message: err.message,
      stack: err.stack,
    })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      code: ErrorCode.INVALID_PARAMS,
      message: "There were invalid params",
      errors: err.errors,
    })
  }

  console.error(err)

  return res.status(500).json({
    code: ErrorCode.UNKNOWN,
    message: err.message,
    stack: err.stack,
  })
}
