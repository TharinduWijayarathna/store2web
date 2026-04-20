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
const TENANT_HEADER_NAME = process.env.TENANT_HEADER_NAME || "x-tenant-slug";
const TENANT_DOMAIN = process.env.TENANT_DOMAIN || "";
const DEFAULT_TENANT_SLUG = process.env.DEFAULT_TENANT_SLUG || "";

export {
  PORT,
  DATABASE_URL,
  CORS_ORIGIN,
  TENANT_HEADER_NAME,
  TENANT_DOMAIN,
  DEFAULT_TENANT_SLUG,
};
