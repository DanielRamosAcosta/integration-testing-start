import { UserMustBeAdultError } from "../errors/UserMustBeAdultError.js"

export class UserAge {
  constructor(age) {
    this.age = age

    if (age < 18) {
      throw new UserMustBeAdultError()
    }
  }

  equals(other) {
    return this.age === other.age
  }
}
