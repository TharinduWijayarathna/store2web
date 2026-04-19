import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { DB_PATH } from "../config/env";
import * as schema from "./schema";

const sqlite = new Database(DB_PATH);
const db = drizzle(sqlite, { schema });

export { db, sqlite };
