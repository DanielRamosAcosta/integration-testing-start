import crypto from "node:crypto"

export class UserPassword {
  static fromPlain(plainPassword) {
    if (plainPassword.length < 6) {
      throw new Error("Password must be 6 characters or longer")
    }

    const hashed = crypto.createHash("sha256").update(plainPassword).digest().toString("hex")

    return new UserPassword(hashed)
  }

  constructor(password) {
    this.password = password
  }

  compareWith(plainPassword) {
    const hash = crypto.createHash("sha256").update(plainPassword).digest().toString("hex")

    return this.password === hash
  }
}
