import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import { DATABASE_URL } from "../config/env";
import * as schema from "./schema";

const pool = new Pool({ connectionString: DATABASE_URL });
const db = drizzle(pool, { schema });

export { db, pool };
