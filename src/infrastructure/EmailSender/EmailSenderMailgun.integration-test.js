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
  })

  it("throws an error if email is invalid", async () => {
    const emailSender = new EmailSenderMailgun()
    const testInbox = new TestInbox()
    const id = "00000000-0000-0000-0000-000000000000"
    const name = "John Doe"
    const email = "@"
    const age = 18
    const password = "password"
    const user = User.create(id, name, email, password, age)

    const result = emailSender.sendWelcomeEmail(user)

    expect(result).rejects.toThrow("to parameter is not a valid address. please check documentation")
  })
})
