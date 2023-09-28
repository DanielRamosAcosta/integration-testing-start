import { describe, expect, it } from "vitest"
import { EmailSenderMailgun } from "./EmailSenderMailgun.js"
import { User } from "../../domain/models/User.js"
import { TestInbox } from "./TestInbox.js"

describe("EmailSenderMailgun", () => {
  it("sends the welcome email to a user", async () => {
    const emailSender = new EmailSenderMailgun()
    const testInbox = new TestInbox()
    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = " 9eqfr.test@inbox.testmail.app"
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    await emailSender.sendWelcomeEmail(user)

    const receivedEmail = await testInbox.getLastEmail()
    expect(receivedEmail.html).toMatch("¡Bienvenido a Mi proyecto John Doe!")
  }, 10_000)

  it("throws an error if email is invalid", async () => {
    const emailSender = new EmailSenderMailgun()
    const invalidEmail = "@"
    const user = createUser({ email: invalidEmail })

    const result = emailSender.sendWelcomeEmail(user)

    expect(result).rejects.toThrow("to parameter is not a valid address. please check documentation")
  })

  it("throws an error if credentials are invalid", async () => {
    const emailSender = new EmailSenderMailgun({
      apiKey: "invalid",
    })
    const notImportantUser = createUser()

    const result = emailSender.sendWelcomeEmail(notImportantUser)

    expect(result).rejects.toThrow("Invalid API key")
  })
})

function createUser({ email = "pepe@example.com" } = {}) {
  const id = "00000000-0000-0000-0000-000000000000"
  const name = "John Doe"
  const age = 18
  const password = "password"
  return User.create(id, name, email, password, age)
}
