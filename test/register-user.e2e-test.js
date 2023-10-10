import { describe, it, expect } from "vitest"
import { app } from "../src/infrastructure/API/app.js"
import tepper from "tepper"

describe("POST /users/register", () => {
  it("returns Hello World with status 200", async () => {
    const { status, body } = await tepper(app).get("/hola-mundo").run()

    expect(status).toBe(200)
    expect(body).toEqual({ hola: "mundo" })
  })
})
