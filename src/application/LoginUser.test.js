import { describe, expect, it, vi } from "vitest"
import { UserRepositoryMock } from "../infrastructure/UserRepository/UserRepositoryMock.js"
import { User } from "../domain/models/User.js"
import { IdGeneratorMock } from "../infrastructure/IdGenerator/IdGeneratorMock.js"
import { LoginUser } from "./LoginUser.js"
import { UserNotFoundError } from "../domain/errors/UserNotFoundError.js"
import { WrongPasswordError } from "../domain/errors/WorngPasswordError.js"
import { JsonWebTokenManagerMock } from "../infrastructure/JsonWebTokenManager/JsonWebTokenManagerMock.js"

describe("LoginUser", () => {
  it("generates a JWT for the given user", async () => {
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"
    const user = User.create(IdGeneratorMock.MOCK_ID, name, email, password, age)
    const tokenMock = "thisIsAJWTSignedToken"
    const userRepository = new UserRepositoryMock()
    vi.spyOn(userRepository, "findByEmail").mockReturnValue(user)
    const jsonWebTokenManager = new JsonWebTokenManagerMock()
    vi.spyOn(jsonWebTokenManager, "generate").mockReturnValue(tokenMock)
    const loginUser = new LoginUser(userRepository, jsonWebTokenManager)

    const token = await loginUser.execute(email, password)

    expect(token).toEqual(tokenMock)
  })

  it("throws an error if user does not exists", async () => {
    const email = "john@email.com"
    const password = "password"
    const userRepository = new UserRepositoryMock()
    vi.spyOn(userRepository, "findByEmail").mockReturnValue(null)
    const loginUser = new LoginUser(userRepository, new JsonWebTokenManagerMock())

    const result = loginUser.execute(email, password)

    await expect(result).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it("throws an error if password is worng", async () => {
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"
    const wrongPassword = "wrongPassword"
    const user = User.create(IdGeneratorMock.MOCK_ID, name, email, password, age)
    const userRepository = new UserRepositoryMock()
    vi.spyOn(userRepository, "findByEmail").mockReturnValue(user)
    const loginUser = new LoginUser(userRepository, new JsonWebTokenManagerMock())

    const result = loginUser.execute(email, wrongPassword)

    await expect(result).rejects.toBeInstanceOf(WrongPasswordError)
  })
})
