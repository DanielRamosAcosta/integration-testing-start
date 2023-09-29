import "dotenv/config"

export const config = {
  mailgun: {
    domain: "sandbox261f754ab73b43388177e85a621a13fb.mailgun.org",
    authUser: "api",
    apiKey: process.env.MAILGUN_API_KEY,
  },
  testInbox: {
    namespace: "9eqfr",
    apiKey: process.env.TESTMAIL_API_KEY,
  },
  postgres: {
    user: "admin",
    host: "localhost",
    database: "my-project",
    password: process.env.POSTGRES_PASSWORD || "password",
  },
  mongo: {
    user: "admin",
    password: process.env.MONGO_PASSWORD || "password",
    address: "localhost",
    port: "27017",
  },
}
