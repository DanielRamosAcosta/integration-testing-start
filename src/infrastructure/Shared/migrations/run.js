import { up as up1695745482646 } from "./1695745482646.js"
import { postgresClient } from "../../UserRepository/PostgresClient.js"

await postgresClient.connect()

console.log("Running migrations...")
await up1695745482646(postgresClient)

console.log("1695745482646 Done!")

await postgresClient.end()

console.log("Done!")
