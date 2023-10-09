import { InvalidEmailError } from "../errors/InvalidEmailError.js"

export class UserEmail {
  constructor(email) {
    this.email = email

    if (!this.email.includes("@")) {
      throw new InvalidEmailError()
    }
  }

  equals(email) {
    return this.email === email.email
  }
}
