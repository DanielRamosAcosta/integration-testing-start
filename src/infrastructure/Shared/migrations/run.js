import pkg from "pg"
const { Client } = pkg
import { up as up1695745482646 } from "./1695745482646.js"

const client = new Client({
  user: "admin",
  host: "localhost",
  database: "my-project",
  password: "password",
})

await client.connect()

console.log("Running migrations...")
await up1695745482646(client)

console.log("1695745482646 Done!")

await client.end()

console.log("Done!")
