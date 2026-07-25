import { integer, pgTable, serial, text, boolean } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("content").notNull(),
  url: text("url").notNull(),
  author: text("author").notNull(),
  likes: integer("likes").notNull().default(0),
})