import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/store2web";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: databaseUrl,
  },
});
