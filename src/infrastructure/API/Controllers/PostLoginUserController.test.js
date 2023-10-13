import { describe, it, expect, vi, beforeEach } from "vitest"
import { PostLoginUserController } from "./PostLoginUserController.js"
import { ZodError } from "zod"

describe("PostLoginUserController", () => {
  const token = "thisIsMyToken"
  const email = "johndoe@example.com"
  const password = "password"
  let loginUser
  let postLoginUserController
  let json
  let res

  beforeEach(() => {
    loginUser = { execute: vi.fn(() => token) }
    postLoginUserController = new PostLoginUserController(loginUser)
    json = vi.fn()
    res = {
      status: vi.fn(() => ({ json })),
    }
  })

  it("invokes the use case", async () => {
    const req = {
      body: {
        email,
        password,
      },
    }

    await postLoginUserController.execute(req, res)

    expect(loginUser.execute).toHaveBeenCalledWith(email, password)
  })

  it("responds with status 200", async () => {
    const req = {
      body: {
        email,
        password,
      },
    }

    await postLoginUserController.execute(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
  })

  it("responds with the token", async () => {
    const req = {
      body: {
        email,
        password,
      },
    }

    await postLoginUserController.execute(req, res)

    expect(json).toHaveBeenCalledWith({ token })
  })

  it("throws a zod error if email is not defined", async () => {
    const req = {
      body: {
        password,
      },
    }

    const result = postLoginUserController.execute(req, res)

    await expect(result).rejects.toBeInstanceOf(ZodError)
  })

  it("throws a zod error if password is not defined", async () => {
    const req = {
      body: {
        email,
      },
    }

    const result = postLoginUserController.execute(req, res)

    await expect(result).rejects.toBeInstanceOf(ZodError)
  })
})
