import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be a Neon postgres URL")
}

export const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema, logger: true })
