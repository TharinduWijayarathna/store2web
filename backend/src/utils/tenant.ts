import { asc, eq } from "drizzle-orm";

import { db } from "../db";
import { spaces, tenants } from "../db/schema";

const getTenantBySlug = async (slug: string) => {
  const [tenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.slug, slug))
    .limit(1);

  return tenant ?? null;
};

const getPrimarySpace = async (tenantId: number) => {
  const [space] = await db
    .select()
    .from(spaces)
    .where(eq(spaces.tenantId, tenantId))
    .orderBy(asc(spaces.id))
    .limit(1);

  return space ?? null;
};

export { getTenantBySlug, getPrimarySpace };
