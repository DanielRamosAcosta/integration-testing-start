import { DomainError } from "./DomainError.js"
import { ErrorCode } from "./ErrorCode.js"

export class WrongPasswordError extends DomainError {
  constructor() {
    super(ErrorCode.WRONG_PASSWORD_ERROR, "Password is wrong")
  }
}
