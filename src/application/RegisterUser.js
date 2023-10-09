import { User } from "../domain/models/User.js"
import { UserAlreadyExistsError } from "../domain/errors/UserAlreadyExistsError.js"

export class RegisterUser {
  /**
   *
   * @param {UserRepository} userRepository
   * @param idGenerator
   * @param emailSender
   */
  constructor(userRepository, idGenerator, emailSender) {
    this.userRepository = userRepository
    this.idGenerator = idGenerator
    this.emailSender = emailSender
  }

  async execute(name, email, password, age) {
    const alreadyExists = await this.userRepository.existsByEmail(email)

    if (alreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const user = User.create(this.idGenerator.generate(), name, email, password, age)

    await this.emailSender.sendWelcomeEmail(user)

    await this.userRepository.save(user)
  }
}
