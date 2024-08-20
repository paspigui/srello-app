import { Hono } from "hono"
import { handle } from "@hono/node-server/vercel"
import { createNodeWebSocket } from "@hono/node-ws"
import { serve } from "@hono/node-server"
import users from "./users"

export const runtime = "edge"

const app = new Hono().basePath("/api")

const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`)
        ws.send("Hello from server")
      },
      onClose: () => {
        console.log("Connection closed")
      },
    }
  })
)

const server = serve(app)
injectWebSocket(server)

const routes = app.route("/users", users)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes
