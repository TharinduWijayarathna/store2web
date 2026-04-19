import path from "path";
import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const dbPath = process.env.DB_PATH ?? path.resolve(process.cwd(), "dev.db");

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: dbPath,
  },
});
