import { describe, it, expect, vi, beforeEach } from "vitest"
import { UserRepositoryMock } from "../infrastructure/UserRepository/UserRepositoryMock.js"
import { RegisterUser } from "./RegisterUser.js"
import { User } from "../domain/models/User.js"
import { IdGeneratorMock } from "../infrastructure/IdGenerator/IdGeneratorMock.js"
import { EmailSenderMock } from "../infrastructure/EmailSender/EmailSenderMock.js"

describe("RegisterUser", () => {
  let userRepository
  let idGenerator
  let registerUser
  let emailSender
  const notImportantName = "John Doe"
  const notImportantEmail = "john@email.com"
  const notImportantAge = 18
  const notImportantPassword = "password"

  beforeEach(() => {
    userRepository = new UserRepositoryMock()
    vi.spyOn(userRepository, "save")
    idGenerator = new IdGeneratorMock()
    emailSender = new EmailSenderMock()
    vi.spyOn(emailSender, "sendWelcomeEmail")
    registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
  })

  it("must save the user in the repository", async () => {
    await registerUser.execute(notImportantName, notImportantEmail, notImportantPassword, notImportantAge)

    expect(userRepository.save).toHaveBeenCalled()
  })

  it("must save the user with the correct data", async () => {
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"

    await registerUser.execute(name, email, password, age)

    const user = User.create(IdGeneratorMock.MOCK_ID, name, email, password, age)
    expect(userRepository.save).toHaveBeenCalledWith(user)
  })

  it("must throw an error if the user already exists", async () => {
    vi.spyOn(userRepository, "existsByEmail").mockReturnValue(true)

    const result = registerUser.execute(notImportantName, notImportantEmail, notImportantPassword, notImportantAge)

    expect(result).rejects.toThrow("User already exists")
  })

  it("sends a welcome email to the user", async () => {
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"

    await registerUser.execute(notImportantName, email, notImportantPassword, notImportantAge)

    const user = User.create(IdGeneratorMock.MOCK_ID, name, email, password, age)
    expect(emailSender.sendWelcomeEmail).toHaveBeenCalledWith(user)
  })
})
