const path = require("path");
const { migrate } = require("drizzle-orm/better-sqlite3/migrator");

const { db, sqlite } = require("./index");

const migrationsFolder = path.resolve(process.cwd(), "drizzle");

try {
  migrate(db, { migrationsFolder });
  console.log("Migrations complete.");
} catch (error) {
  console.error("Migration failed:", error);
  process.exitCode = 1;
} finally {
  sqlite.close();
}
