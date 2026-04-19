import path from "path";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import { db, sqlite } from "./index";

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
