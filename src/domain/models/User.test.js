import { describe, expect, it } from "vitest"
import { User } from "./User.js"

describe("User", () => {
  const notImportantId = "00000000-0000-0000-0000-000000000000"
  const notImportantName = "John Doe"
  const notImportantEmail = "john@email.com"
  const notImportantAge = 18
  const notImportantPassword = "password"

  it("has an id", () => {
    const userId = "f969af7f-bc05-46ed-8a82-62a9f49f4927"

    const user = User.create(userId, notImportantName, notImportantEmail, notImportantPassword, notImportantAge)

    expect(user.hasId(userId)).toBe(true)
  })

  it("has another id", () => {
    const userId = "f969af7f-bc05-46ed-8a82-62a9f49f4927"
    const otherId = "54124556-9B55-4924-A9A3-51E8B20769C4"

    const user = User.create(userId, notImportantName, notImportantEmail, notImportantPassword, notImportantAge)

    expect(user.hasId(otherId)).toBe(false)
  })

  it("has a name", () => {
    const userName = "Maria"

    const user = User.create(notImportantId, userName, notImportantEmail, notImportantPassword, notImportantAge)

    expect(user.hasName(userName)).toBe(true)
  })

  it("has another name", () => {
    const userName = "Maria"
    const otherUserName = "Jose"

    const user = User.create(notImportantId, userName, notImportantEmail, notImportantPassword, notImportantAge)

    expect(user.hasName(otherUserName)).toBe(false)
  })

  it("has an email", () => {
    const email = "maria@email.com"

    const user = User.create(notImportantId, notImportantName, email, notImportantPassword, notImportantAge)

    expect(user.hasEmail(email)).toBe(true)
  })

  it("has another email", () => {
    const email = "maria@email.com"
    const otherEmail = "jose@email.com"

    const user = User.create(notImportantId, notImportantName, email, notImportantPassword, notImportantAge)

    expect(user.hasEmail(otherEmail)).toBe(false)
  })

  it("has an age", () => {
    const age = 18

    const user = User.create(notImportantId, notImportantName, notImportantEmail, notImportantPassword, age)

    expect(user.hasAge(age)).toBe(true)
  })

  it("has another age", () => {
    const age = 18
    const otherAge = 20

    const user = User.create(notImportantId, notImportantName, notImportantEmail, notImportantPassword, age)

    expect(user.hasAge(otherAge)).toBe(false)
  })

  it("has a password", () => {
    const password = "password"

    const user = User.create(notImportantId, notImportantName, notImportantEmail, password, notImportantAge)

    expect(user.compareWith(password)).toBe(true)
  })

  it("has another password", () => {
    const password = "password"
    const anotherPassword = "anotherPassword"

    const user = User.create(notImportantId, notImportantName, notImportantEmail, password, notImportantAge)

    expect(user.compareWith(anotherPassword)).toBe(false)
  })

  it("keeps the password hashed", () => {
    const password = "password"

    const user = User.create(notImportantId, notImportantName, notImportantEmail, password, notImportantAge)

    expect(user.getPassword()).not.toBe(password)
  })

  it("throws an error if age is under 18", () => {
    const underAge = 17

    expect(() =>
      User.create(notImportantId, notImportantName, notImportantEmail, notImportantPassword, underAge),
    ).toThrow("User must be 18 or older")
  })

  it("throws an error if password if is below 6 characters", () => {
    const tooShortPassword = "12345"

    expect(() =>
      User.create(notImportantId, notImportantName, notImportantEmail, tooShortPassword, notImportantAge),
    ).toThrow("Password must be 6 characters or longer")
  })

  it("throws an error with an invalid email", () => {
    const invalidEmail = "invalidemail"

    expect(() =>
      User.create(notImportantId, notImportantName, invalidEmail, notImportantPassword, notImportantAge),
    ).toThrow("Invalid email")
  })
})
