import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id_user: serial("id_user").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  mail: varchar("mail", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const tables = pgTable("tables", {
  id_table: serial("id_table").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  creation_date: timestamp("creation_date").defaultNow(),
  id_creator: integer("id_creator")
    .notNull()
    .references(() => users.id_user),
});

export const lists = pgTable("lists", {
  id_list: serial("id_list").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  list_order: integer("list_order").notNull(),
  id_table: integer("id_table")
    .notNull()
    .references(() => tables.id_table),
});

export const cards = pgTable("cards", {
  id_card: serial("id_card").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  creation_date: timestamp("creation_date").defaultNow(),
  deadline: timestamp("deadline"),
  id_list: integer("id_list")
    .notNull()
    .references(() => lists.id_list),
  id_assigned: integer("id_assigned").references(() => users.id_user),
});

export const labels = pgTable("labels", {
  id_label: serial("id_label").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  id_card: integer("id_card")
    .notNull()
    .references(() => cards.id_card),
});

export const comments = pgTable("comments", {
  id_comment: serial("id_comment").primaryKey(),
  content: text("content").notNull(),
  date: timestamp("date").defaultNow(),
  id_card: integer("id_card")
    .notNull()
    .references(() => cards.id_card),
  id_autor: integer("id_autor")
    .notNull()
    .references(() => users.id_user),
});

export const activities = pgTable("activities", {
  id_activity: serial("id_activity").primaryKey(),
  description: text("description").notNull(),
  date: timestamp("date").defaultNow(),
  id_card: integer("id_card")
    .notNull()
    .references(() => cards.id_card),
});
