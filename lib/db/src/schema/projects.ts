import { mysqlTable, varchar, serial, datetime, boolean, text } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const projectsTable = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  context: text("context").notNull(),
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  techStack: text("tech_stack").notNull(),
  results: text("results").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  coverImage: varchar("cover_image", { length: 255 }),
  metric: varchar("metric", { length: 255 }),
  featured: boolean("featured").notNull().default(false),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  createdAt: datetime("created_at").notNull().default(new Date()),
  updatedAt: datetime("updated_at").notNull().default(new Date()).$onUpdate(() => new Date()),
});

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projectsTable.$inferSelect;
