const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: process.env.ENV_FILE || path.resolve(process.cwd(), ".env"),
});

const PORT = Number.parseInt(process.env.PORT, 10) || 3000;
const DB_PATH = process.env.DB_PATH || path.resolve(process.cwd(), "dev.db");

module.exports = { PORT, DB_PATH };
