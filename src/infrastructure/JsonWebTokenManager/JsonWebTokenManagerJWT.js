import { JsonWebTokenManager } from "../../domain/services/JsonWebTokenManager.js"
import jwt from "jsonwebtoken"

export class JsonWebTokenManagerJWT extends JsonWebTokenManager {
  generate(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET ?? "gatitos")
  }
}
