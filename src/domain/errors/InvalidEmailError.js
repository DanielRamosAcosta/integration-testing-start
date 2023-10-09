import { DomainError } from "./DomainError.js"
import { ErrorCode } from "./ErrorCode.js"

export class InvalidEmailError extends DomainError {
  constructor() {
    super(ErrorCode.INVALID_EMAIL_ERROR, "Invalid email")
  }
}
