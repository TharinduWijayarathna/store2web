import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: false })
    .notNull()
    .defaultNow(),
});

export { users };
