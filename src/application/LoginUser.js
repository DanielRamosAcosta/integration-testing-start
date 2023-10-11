import jwt from "jsonwebtoken"
import { UserNotFoundError } from "../domain/errors/UserNotFoundError.js"
import { WrongPasswordError } from "../domain/errors/WorngPasswordError.js"

export class LoginUser {
  constructor(userRepository, jsonWebTokenManager) {
    this.userRepository = userRepository
    this.jsonWebTokenManager = jsonWebTokenManager
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    const hasWrongPassword = !user.hasPassword(password)
    if (hasWrongPassword) {
      throw new WrongPasswordError()
    }

    return this.jsonWebTokenManager.generate(user.getId())
  }
}
