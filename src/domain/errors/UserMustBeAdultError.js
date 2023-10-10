import { DomainError } from "./DomainError.js"
import { ErrorCode } from "./ErrorCode.js"

export class UserMustBeAdultError extends DomainError {
  constructor() {
    super(ErrorCode.USER_MUST_BE_ADULT_ERROR, "User must be 18 or older")
  }
}
