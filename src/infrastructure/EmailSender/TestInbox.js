import { sleep } from "../../domain/utils/sleep.js"

export class TestInbox {
  constructor() {
    this.messages = []
  }

  /**
   * Retrieves the emails from the test inbox
   * @param {Date} from
   * @returns {Promise<void>}
   */
  async getEmails(from) {
    const params = new URLSearchParams({
      apikey: "TODO",
      namespace: "9eqfr",
      pretty: true,
      timestamp_from: from.getTime(),
    })

    const response = await fetch(`https://api.testmail.app/api/json?${params.toString()}`)

    const data = await response.json()

    return data.emails
  }

  async getEmailsInLast5Seconds() {
    const now = new Date()
    const fiveSecondsAgo = new Date(now.getTime() - 3000)
    return await this.getEmails(fiveSecondsAgo)
  }

  async getLastEmail() {
    while (true) {
      const emails = await this.getEmailsInLast5Seconds()
      if (emails.length > 0) {
        return emails[0]
      }
      await sleep(100)
    }
  }
}
