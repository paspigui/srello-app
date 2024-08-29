import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core"

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
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
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const tables = pgTable("table", {
  tableId: serial("tableId").primaryKey(),
  title: text("title").notNull(),
  creationDate: timestamp("creationDate").defaultNow(),
  creatorId: text("creatorId")
    .notNull()
    .references(() => users.id),
})

export const lists = pgTable("list", {
  listId: serial("listId").primaryKey(),
  title: text("title").notNull(),
  listOrder: integer("listOrder").notNull(),
  tableId: integer("tableId")
    .notNull()
    .references(() => tables.tableId),
})

export const cards = pgTable("card", {
  cardId: serial("cardId").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  creationDate: timestamp("creationDate").defaultNow(),
  deadline: timestamp("deadline"),
  listId: integer("listId")
    .notNull()
    .references(() => lists.listId),
  assignedId: text("assignedId").references(() => users.id),
})

export const labels = pgTable("label", {
  labelId: serial("labelId").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
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
  authorId: text("authorId")
    .notNull()
    .references(() => users.id),
})

export const activities = pgTable("activity", {
  activityId: serial("activityId").primaryKey(),
  description: text("description").notNull(),
  date: timestamp("date").defaultNow(),
  cardId: integer("cardId")
    .notNull()
    .references(() => cards.cardId),
})
