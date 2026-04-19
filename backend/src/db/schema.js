const { sqliteTable, integer, text } = require("drizzle-orm/sqlite-core");
const { sql } = require("drizzle-orm");

const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

module.exports = { users };
