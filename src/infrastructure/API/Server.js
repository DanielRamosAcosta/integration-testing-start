import express from "express"
import { UserRepositoryMongo } from "../UserRepository/UserRepositoryMongo.js"
import { IdGeneratorNode } from "../IdGenerator/IdGeneratorNode.js"
import { EmailSenderMock } from "../EmailSender/EmailSenderMock.js"
import { RegisterUser } from "../../application/RegisterUser.js"
import { PostUserController } from "./Controllers/PostUserController.js"
import { handleErrors } from "./Middlewares/handleErrors.js"
import { EmailSenderMailgun } from "../EmailSender/EmailSenderMailgun.js"

export class Server {
  static createForTesting() {
    return new Server({
      emailSender: new EmailSenderMock(),
    })
  }

  constructor(dependencies = {}) {
    this.dependencies = this.createDependencies(dependencies)

    this.app = express()
    this.app.use(express.json())
    this.app.post("/users/register", this.dependencies.postUserController.execute)
    this.app.use(handleErrors)
  }

  createDependencies({ userRepository = new UserRepositoryMongo(), emailSender = new EmailSenderMailgun() }) {
    const idGenerator = new IdGeneratorNode()
    const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
    const postUserController = new PostUserController(registerUser)

    return {
      userRepository,
      idGenerator,
      emailSender,
      registerUser,
      postUserController,
    }
  }

  async connect() {
    await this.dependencies.userRepository.connect()
  }

  async disconnect() {
    await this.dependencies.userRepository.disconnect()
  }

  async reset() {
    await this.dependencies.userRepository.reset()
  }

  listen() {
    const port = 3000

    this.app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }
}
