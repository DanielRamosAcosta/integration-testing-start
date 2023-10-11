export class JsonWebTokenManager {
  /**
   * It generates a jwt token
   * @param {string} userId
   */
  generate(userId) {
    throw new Error("This is an abstract class. You should implement the generate method")
  }
}
