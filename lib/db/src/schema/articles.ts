import { mysqlTable, varchar, serial, datetime, boolean, int, text } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const articlesTable = mysqlTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: varchar("excerpt", { length: 500 }).notNull(),
  content: text("content").notNull(),
  pillar: varchar("pillar", { length: 50 }).notNull(),
  coverImage: varchar("cover_image", { length: 255 }),
  published: boolean("published").notNull().default(false),
  readingTime: int("reading_time"),
  createdAt: datetime("created_at").notNull().default(new Date()),
  updatedAt: datetime("updated_at").notNull().default(new Date()).$onUpdate(() => new Date()),
});

export const insertArticleSchema = createInsertSchema(articlesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articlesTable.$inferSelect;
