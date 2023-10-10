import express from "express"
import { UserRepositoryMongo } from "../UserRepository/UserRepositoryMongo.js"
import { IdGeneratorNode } from "../IdGenerator/IdGeneratorNode.js"
import { EmailSenderMock } from "../EmailSender/EmailSenderMock.js"
import { RegisterUser } from "../../application/RegisterUser.js"
import { PostUserController } from "./Controllers/PostUserController.js"
import { DomainError } from "../../domain/errors/DomainError.js"
import { errorCodeToStatus } from "./errorCodeToStatus.js"
import { ZodError } from "zod"
import { ErrorCode } from "../../domain/errors/ErrorCode.js"

export async function createApp() {
  const app = express()

  app.use(express.json())

  const userRepository = new UserRepositoryMongo()
  const idGenerator = new IdGeneratorNode()
  const emailSender = new EmailSenderMock()
  const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
  const postUserController = new PostUserController(registerUser)

  await userRepository.connect()

  app.post("/users/register", postUserController.execute)
  app.get("/hola-mundo", (req, res) => {
    res.json({ hola: "mundo" })
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err instanceof DomainError) {
      const { code } = err

      return res.status(errorCodeToStatus(code)).json({
        code: code,
        message: err.message,
        stack: err.stack,
      })
    }

    if (err instanceof ZodError) {
      return res.status(400).json({
        code: ErrorCode.INVALID_PARAMS,
        message: "There were invalid params",
        errors: err.errors,
      })
    }

    console.error(err)

    return res.status(500).json({
      code: ErrorCode.UNKNOWN,
      message: err.message,
      stack: err.stack,
    })
  })

  return app
}
