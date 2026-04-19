const Database = require("better-sqlite3");
const { drizzle } = require("drizzle-orm/better-sqlite3");

const { DB_PATH } = require("../config/env");
const schema = require("./schema");

const sqlite = new Database(DB_PATH);
const db = drizzle(sqlite, { schema });

module.exports = { db, sqlite };
