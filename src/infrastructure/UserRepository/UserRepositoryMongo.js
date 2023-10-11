import { UserRepository } from "../../domain/repository/UserRepository.js"
import { User } from "../../domain/models/User.js"
import { UserPassword } from "../../domain/models/UserPassword.js"
import { mongoClient } from "./MongoClient.js"

export class UserRepositoryMongo extends UserRepository {
  isConnected = false

  constructor() {
    super()
    this.client = mongoClient
    this.database = this.client.db("my-project")
    this.users = this.database.collection("users")
  }

  async connect() {
    await this.client.connect()
    this.isConnected = true
  }

  async disconnect() {
    await this.client.close()
  }

  async reset() {
    this.ensureIsConnected()
    await this.users.deleteMany({})
  }

  async save(user) {
    this.ensureIsConnected()
    await this.users.insertOne({ ...user })
  }

  async findById(id) {
    this.ensureIsConnected()
    const savedUser = await this.users.findOne({ id })

    if (!savedUser) {
      return null
    }

    return this.mongoToUser(savedUser)
  }

  async findByEmail(email) {
    this.ensureIsConnected()
    const savedUser = await this.users.findOne({ "email.email": email })

    if (!savedUser) {
      return null
    }

    return this.mongoToUser(savedUser)
  }

  async existsByEmail(email) {
    this.ensureIsConnected()
    const savedUser = await this.users.findOne({ "email.email": email }, { projection: { _id: 1 } })

    return Boolean(savedUser)
  }

  ensureIsConnected() {
    if (!this.isConnected) {
      throw new Error("UserRepositoryMongo is not connected")
    }
  }

  mongoToUser(savedUser) {
    return new User(
      savedUser.id,
      savedUser.name,
      savedUser.email.email,
      new UserPassword(savedUser.password.password),
      savedUser.age.age,
    )
  }
}
