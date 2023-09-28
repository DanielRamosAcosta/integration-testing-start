import { UserEmail } from "./UserEmail.js"
import { UserPassword } from "./UserPassword.js"
import { UserAge } from "./UserAge.js"

export class User {
  static create(id, name, email, password, age) {
    return new User(id, name, email, UserPassword.fromPlain(password), age)
  }

  constructor(id, name, email, password, age) {
    this.id = id
    this.name = name
    this.email = new UserEmail(email)
    this.age = new UserAge(age)
    this.password = password
  }

  hasId(id) {
    return this.id === id
  }

  hasName(name) {
    return this.name === name
  }

  hasEmail(email) {
    return this.email.equals(new UserEmail(email))
  }

  hasAge(age) {
    return this.age.equals(new UserAge(age))
  }

  compareWith(plainPassword) {
    return this.password.compareWith(plainPassword)
  }

  getPassword() {
    return this.password
  }
}
