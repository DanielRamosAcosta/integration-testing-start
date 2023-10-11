import jwt from "jsonwebtoken"
import { describe, expect, it } from "vitest"
import { JsonWebTokenManagerJWT } from "./JsonWebTokenManagerJWT.js"

describe("JsonWebTokenManagerJWT", () => {
  it("generates a jwt", () => {
    const jsonWebTokenManagerJWT = new JsonWebTokenManagerJWT()

    const userId = "userId"
    const token = jsonWebTokenManagerJWT.generate(userId)

    const data = jwt.decode(token)

    expect(data.userId).toEqual(userId)
  })
})
