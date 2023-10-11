import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest"
import tepper from "tepper"
import { Server } from "../src/infrastructure/API/Server.js"

describe("authorization flow", () => {
  let server

  beforeAll(async () => {
    server = Server.createForTesting()
    await server.connect()
  })

  afterAll(async () => {
    await server.disconnect()
  })

  beforeEach(async () => {
    await server.reset()
  })

  it("can login after registering", async () => {
    const { status: registerStatus } = await tepper(server.app)
      .post("/users/register")
      .send({
        name: "Pepe",
        email: "pepe@gmail.com",
        password: "password123",
        age: 19,
      })
      .run()
    expect(registerStatus).toBe(201)

    const { status: loginStatus, body } = await tepper(server.app)
      .post("/users/login")
      .send({
        email: "pepe@gmail.com",
        password: "password123",
      })
      .run()

    expect(loginStatus).toBe(200)
    expect(body.token).toContain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
  })
})
