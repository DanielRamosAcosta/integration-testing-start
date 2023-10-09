import { DomainError } from "./DomainError.js"
import { ErrorCode } from "./ErrorCode.js"

export class UserAlreadyExistsError extends DomainError {
  constructor() {
    super(ErrorCode.USER_ALREADY_EXISTS, "User already exists")
  }
}
