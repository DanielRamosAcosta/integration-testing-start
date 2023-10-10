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
    const { status, body } = await tepper(server.app)
      .post("/users/register")
      .send({
        name: "Pepe",
        email: "pepe@gmail.com",
        password: "password123",
        age: 19,
      })
      .run()

    expect(status).toBe(200)
    expect(body.status).toBe("ok")
  })
})
