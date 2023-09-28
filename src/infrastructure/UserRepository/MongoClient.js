import { MongoClient } from "mongodb"
import { config } from "../Shared/config.js"

const { user, password, address, port } = config.mongo

export const mongoClient = new MongoClient(`mongodb://${user}:${password}@${address}:${port}`)
