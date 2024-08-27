import { Hono } from "hono"
import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { prettyJSON } from "hono/pretty-json"
import { logger } from "hono/logger"

const app = new Hono().use(prettyJSON(), logger()).get("/", async (c) => {
  const data = await db
    .select({
      id: users.id,
    })
    .from(users)
  return c.json({ data })
})

export default app
