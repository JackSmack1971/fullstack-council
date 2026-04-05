import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const telemetry = pgTable("telemetry", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id").notNull(),
  event: text("event").notNull(),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
