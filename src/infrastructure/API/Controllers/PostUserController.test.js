import { describe, it, expect, vi } from "vitest"
import { PostUserController } from "./PostUserController.js"
import { ZodError } from "zod"

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
    const json = vi.fn()
    const res = {
      status: () => ({ json }),
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
    const json = vi.fn()
    const res = {
      status: () => ({ json }),
    }

    await postUserController.execute(req, res)

    expect(json).toHaveBeenCalledWith({ status: "ok" })
  })

  it("throws a zod error if email is not defined", async () => {
    const registerUser = { execute: vi.fn() }
    const postUserController = new PostUserController(registerUser)
    const name = "John Doe"
    const password = "password"
    const age = 18
    const req = {
      body: {
        name,
        password,
        age,
      },
    }
    const res = {
      json: vi.fn(),
    }

    const result = postUserController.execute(req, res)

    expect(result).rejects.toBeInstanceOf(ZodError)
  })
})
