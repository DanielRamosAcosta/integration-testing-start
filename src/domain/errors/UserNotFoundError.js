import { DomainError } from "./DomainError.js"
import { ErrorCode } from "./ErrorCode.js"

export class UserNotFoundError extends DomainError {
  constructor() {
    super(ErrorCode.USER_WAS_NOT_FOUND, "User was not found")
  }
}
