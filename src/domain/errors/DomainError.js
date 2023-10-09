export class DomainError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
}
