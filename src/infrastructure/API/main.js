import { Server } from "./Server.js"

const server = new Server()
await server.connect()
server.listen()
