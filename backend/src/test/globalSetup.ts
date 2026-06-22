import path from "path";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

export default async function globalSetup() {
  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret";
  process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
  process.env.COOKIE_NAME = process.env.COOKIE_NAME || "s2w_token";
  process.env.CORS_ORIGIN =
    process.env.CORS_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173";
  process.env.SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL || "super@test.com";

  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL =
      process.env.TEST_DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:5432/store2web";
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);
  await migrate(db, {
    migrationsFolder: path.resolve(process.cwd(), "drizzle"),
  });
  await pool.end();
}
