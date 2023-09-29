import express from "express"
import { RegisterUser } from "./application/RegisterUser.js"
import { UserRepositoryMongo } from "./infrastructure/UserRepository/UserRepositoryMongo.js"
import { IdGeneratorNode } from "./infrastructure/IdGenerator/IdGeneratorNode.js"
import { EmailSenderMock } from "./infrastructure/EmailSender/EmailSenderMock.js"
import { PostUserController } from "./infrastructure/Controllers/PostUserController.js"

const app = express()
const port = 3000

app.use(express.json())

const userRepository = new UserRepositoryMongo()
const idGenerator = new IdGeneratorNode()
const emailSender = new EmailSenderMock()
const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
const postUserController = new PostUserController(registerUser)

app.post("/users/register", postUserController.execute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
