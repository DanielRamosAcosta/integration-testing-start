import { DomainError } from "./DomainError.js"
import { ErrorCode } from "./ErrorCode.js"

export class InvalidPasswordError extends DomainError {
  constructor() {
    super(ErrorCode.INVALID_PASSWORD_ERROR, "Password must be 6 characters or longer")
  }
}
