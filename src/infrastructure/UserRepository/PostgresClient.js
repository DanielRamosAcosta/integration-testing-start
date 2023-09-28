import { Client } from "pg"
import { config } from "../Shared/config.js"

export const postgresClient = new Client({
  user: config.postgres.user,
  host: config.postgres.host,
  database: config.postgres.database,
  password: config.postgres.password,
})