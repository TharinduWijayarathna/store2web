import path from "path";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db, pool } from "./index";

const migrationsFolder = path.resolve(process.cwd(), "drizzle");

const runMigrations = async () => {
  try {
    await migrate(db, { migrationsFolder });
    console.log("Migrations complete.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

void runMigrations();
