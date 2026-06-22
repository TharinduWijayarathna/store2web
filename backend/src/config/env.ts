import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: process.env.ENV_FILE || path.resolve(process.cwd(), ".env"),
});

const PORT = Number.parseInt(process.env.PORT ?? "", 10) || 3000;
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:postgres@localhost:5432/store2web";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const JWT_SECRET =
  process.env.JWT_SECRET || "dev-secret-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const COOKIE_NAME = process.env.COOKIE_NAME || "s2w_token";
const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL || "";

export {
  PORT,
  DATABASE_URL,
  CORS_ORIGIN,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  COOKIE_NAME,
  SUPERADMIN_EMAIL,
};
