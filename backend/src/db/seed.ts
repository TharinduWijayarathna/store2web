import { eq } from "drizzle-orm";

import { SUPERADMIN_EMAIL } from "../config/env";
import { db } from "../db";
import { users } from "../db/schema";

const bootstrapSuperadmin = async () => {
  if (!SUPERADMIN_EMAIL) {
    return;
  }

  const email = SUPERADMIN_EMAIL.toLowerCase().trim();

  await db
    .update(users)
    .set({ platformRole: "superadmin" })
    .where(eq(users.email, email));
};

export { bootstrapSuperadmin };
