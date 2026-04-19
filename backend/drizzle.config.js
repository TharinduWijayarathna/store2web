const path = require("path");
const { defineConfig } = require("drizzle-kit");

require("dotenv").config();

const dbPath = process.env.DB_PATH || path.resolve(process.cwd(), "dev.db");

module.exports = defineConfig({
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: dbPath,
  },
});
