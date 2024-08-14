import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core"

import type { AdapterAccountType } from "next-auth/adapters"

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.userId, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const users = pgTable("user", {
  userId: text("userId")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  mail: varchar("mail", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
})

export const tables = pgTable("table", {
  tableId: serial("tableId").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  creationDate: timestamp("creationDate").defaultNow(),
  creatorId: text("creatorId")
    .notNull()
    .references(() => users.userId),
})

export const lists = pgTable("list", {
  listId: serial("listId").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  listOrder: integer("listOrder").notNull(),
  tableId: integer("tableId")
    .notNull()
    .references(() => tables.tableId),
})

export const cards = pgTable("card", {
  cardId: serial("cardId").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  creationDate: timestamp("creationDate").defaultNow(),
  deadline: timestamp("deadline"),
  listId: integer("listId")
    .notNull()
    .references(() => lists.listId),
  assignedId: text("assignedId").references(() => users.userId),
})

export const labels = pgTable("label", {
  labelId: serial("labelId").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  cardId: integer("cardId")
    .notNull()
    .references(() => cards.cardId),
})

export const comments = pgTable("comment", {
  commentId: serial("commentId").primaryKey(),
  content: text("content").notNull(),
  date: timestamp("date").defaultNow(),
  cardId: integer("cardId")
    .notNull()
    .references(() => cards.cardId),
  autorId: text("autorId")
    .notNull()
    .references(() => users.userId),
})

export const activities = pgTable("activity", {
  activityId: serial("activityId").primaryKey(),
  description: text("description").notNull(),
  date: timestamp("date").defaultNow(),
  cardId: integer("cardId")
    .notNull()
    .references(() => cards.cardId),
})
