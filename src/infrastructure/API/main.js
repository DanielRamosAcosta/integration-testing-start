import express from "express"
import { RegisterUser } from "../../application/RegisterUser.js"
import { UserRepositoryMongo } from "../UserRepository/UserRepositoryMongo.js"
import { IdGeneratorNode } from "../IdGenerator/IdGeneratorNode.js"
import { EmailSenderMock } from "../EmailSender/EmailSenderMock.js"
import { PostUserController } from "./Controllers/PostUserController.js"
import { DomainError } from "../../domain/errors/DomainError.js"
import { errorCodeToStatus } from "./errorCodeToStatus.js"
import { ErrorCode } from "../../domain/errors/ErrorCode.js"

const app = express()
const port = 3000

app.use(express.json())

const userRepository = new UserRepositoryMongo()
const idGenerator = new IdGeneratorNode()
const emailSender = new EmailSenderMock()
const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
const postUserController = new PostUserController(registerUser)

await userRepository.connect()

app.post("/users/register", postUserController.execute)

app.use((err, req, res, next) => {
  if (err instanceof DomainError) {
    const { code } = err

    return res.status(errorCodeToStatus(code)).json({
      code: code,
      message: err.message,
      stack: err.stack,
    })
  }

  console.error(err)

  return res.status(500).json({
    code: ErrorCode.UNKNOWN,
    message: err.message,
    stack: err.stack,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
