import { EmailSender } from "../../domain/services/EmailSender.js"

export class EmailSenderMock extends EmailSender {
  // eslint-disable-next-line no-unused-vars
  sendWelcomeEmail(user) {}
}
