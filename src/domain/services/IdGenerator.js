export class IdGenerator {
  /**
   * Generates a new id
   * @returns {string}
   */
  generate() {
    throw new Error("This is an abstract class. You should implement the generate method")
  }
}
