import { describe, it, expect, vi } from "vitest"
import { PostUserController } from "./PostUserController.js"

describe("PostUserController", () => {
  it("invokes the use case", async () => {
    const registerUser = { execute: vi.fn() }
    const postUserController = new PostUserController(registerUser)
    const name = "John Doe"
    const email = "johndoe@example.com"
    const password = "password"
    const age = 18
    const req = {
      body: {
        name,
        email,
        password,
        age,
      },
    }
    const res = {
      json: vi.fn(),
    }

    await postUserController.execute(req, res)

    expect(registerUser.execute).toHaveBeenCalledWith(name, email, password, age)
  })

  it("responds with status 200", async () => {
    const registerUser = { execute: vi.fn() }
    const postUserController = new PostUserController(registerUser)
    const name = "John Doe"
    const email = "johndoe@example.com"
    const password = "password"
    const age = 18
    const req = {
      body: {
        name,
        email,
        password,
        age,
      },
    }
    const res = {
      json: vi.fn(),
    }

    await postUserController.execute(req, res)

    expect(res.json).toHaveBeenCalledWith({ status: "ok" })
  })
})
