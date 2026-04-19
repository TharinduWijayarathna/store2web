import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.ENV_FILE || path.resolve(process.cwd(), ".env"),
});

const PORT = Number.parseInt(process.env.PORT ?? "", 10) || 3000;
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/store2web";

export { PORT, DATABASE_URL };
