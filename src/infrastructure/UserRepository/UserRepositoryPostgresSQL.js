import { Client } from "pg"
import { UserRepository } from "../../domain/repository/UserRepository.js"
import { User } from "../../domain/models/User.js"
import { UserPassword } from "../../domain/models/UserPassword.js"

export class UserRepositoryPostgresSQL extends UserRepository {
  constructor() {
    super()
    this.client = new Client({
      user: "admin",
      host: "localhost",
      database: "my-project",
      password: "password",
    })
  }

  async save(user) {
    await this.client.query(`INSERT INTO users VALUES ($1, $2, $3, $4, $5)`, [
      user.id,
      user.name,
      user.email.email,
      user.password.password,
      user.age.age,
    ])
  }

  async findById(id) {
    const users = await this.client.query(`SELECT * FROM users WHERE id = $1`, [id])

    const user = users.rows[0]

    if (!user) {
      return null
    }

    return new User(user.id, user.name, user.email, new UserPassword(user.password), user.age)
  }

  async existsByEmail(email) {
    const users = await this.client.query(`SELECT COUNT(1) FROM users WHERE email = $1`, [email])

    return users.rows[0].count === "1"
  }

  async connect() {
    await this.client.connect()
  }

  async reset() {
    await this.client.query("DELETE FROM users")
  }

  async disconnect() {
    await this.client.end()
  }
}
