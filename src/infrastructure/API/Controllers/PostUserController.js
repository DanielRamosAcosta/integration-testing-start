export class PostUserController {
  constructor(registerUser) {
    this.registerUser = registerUser
  }

  execute = async (req, res) => {
    await this.registerUser.execute(req.body.name, req.body.email, req.body.password, req.body.age)

    res.json({ status: "ok" })
  }
}
