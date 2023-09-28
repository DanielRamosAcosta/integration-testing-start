export class UserAge {
  constructor(age) {
    this.age = age

    if (age < 18) {
      throw new Error("User must be 18 or older")
    }
  }

  equals(other) {
    return this.age === other.age
  }
}
