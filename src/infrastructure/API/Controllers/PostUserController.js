import * as z from "zod"

const schema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  age: z.number(),
})

export class PostUserController {
  constructor(registerUser) {
    this.registerUser = registerUser
  }

  execute = async (req, res) => {
    const { name, email, password, age } = schema.parse(req.body)

    await this.registerUser.execute(name, email, password, age)

    res.json({ status: "ok" })
  }
}
