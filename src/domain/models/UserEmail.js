export class UserEmail {
  constructor(email) {
    this.email = email

    if (!this.email.includes("@")) {
      throw new Error("Invalid email")
    }
  }

  equals(email) {
    return this.email === email.email
  }
}
