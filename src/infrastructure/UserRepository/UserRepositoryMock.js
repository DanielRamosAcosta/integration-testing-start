import { UserRepository } from "../../domain/repository/UserRepository.js"

export class UserRepositoryMock extends UserRepository {
  save() {}

  existsByEmail() {}
}
