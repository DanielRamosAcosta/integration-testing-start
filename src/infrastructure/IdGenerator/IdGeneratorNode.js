import crypto from "node:crypto"
import { IdGenerator } from "../../domain/services/IdGenerator.js"

export class IdGeneratorNode extends IdGenerator {
  generate() {
    return crypto.randomUUID()
  }
}
