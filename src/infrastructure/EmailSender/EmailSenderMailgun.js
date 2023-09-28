import { EmailSender } from "../../domain/services/EmailSender.js"

export class EmailSenderMailgun extends EmailSender {
  async sendWelcomeEmail(user) {
    const body = new FormData()
    const domain = "sandbox261f754ab73b43388177e85a621a13fb.mailgun.org"

    body.append("from", `Daniel Ramos <mailgun@${domain}>`)
    body.append("to", user.email.email)
    body.append("subject", "Hello")
    body.append("template", "welcome")
    body.append("t:variables", JSON.stringify({ name: user.name }))

    const mailgunUser = "api"
    const apiKey = "TODO"
    const response = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(mailgunUser + ":" + apiKey),
      },
      body,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }
  }
}
