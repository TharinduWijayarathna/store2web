import { and, asc, desc, eq } from "drizzle-orm";
import { Request, Response } from "express";

import { db } from "../db";
import {
  businessProfiles,
  spaces,
  subscriptions,
} from "../db/schema";
import { getPrimarySpace } from "../utils/tenant";

const getTenantOverview = async (req: Request, res: Response) => {
  const tenant = req.tenant;

  if (!tenant) {
    res.status(400).json({ error: "Tenant context is missing." });
    return;
  }

  const tenantSpaces = await db
    .select()
    .from(spaces)
    .where(eq(spaces.tenantId, tenant.id))
    .orderBy(asc(spaces.id));

  const primarySpace =
    tenantSpaces[0] || (await getPrimarySpace(tenant.id));

  const [businessProfile] = primarySpace
    ? await db
        .select()
        .from(businessProfiles)
        .where(
          and(
            eq(businessProfiles.tenantId, tenant.id),
            eq(businessProfiles.spaceId, primarySpace.id),
          ),
        )
        .limit(1)
    : [];

  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.tenantId, tenant.id))
    .orderBy(desc(subscriptions.id))
    .limit(1);

  res.status(200).json({
    tenant,
    spaces: tenantSpaces,
    businessProfile: businessProfile ?? null,
    subscription: subscription ?? null,
  });
};

const listSpaces = async (req: Request, res: Response) => {
  const tenant = req.tenant;

  if (!tenant) {
    res.status(400).json({ error: "Tenant context is missing." });
    return;
  }

  const tenantSpaces = await db
    .select()
    .from(spaces)
    .where(eq(spaces.tenantId, tenant.id))
    .orderBy(asc(spaces.id));

  res.status(200).json({ spaces: tenantSpaces });
};

const createSpace = async (req: Request, res: Response) => {
  const tenant = req.tenant;

  if (!tenant) {
    res.status(400).json({ error: "Tenant context is missing." });
    return;
  }

  const body = req.body as { name?: string; slug?: string };
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const slug = typeof body.slug === "string" ? body.slug.trim() : "";

  if (!name || !slug) {
    res
      .status(400)
      .json({ error: "name and slug are required for a space." });
    return;
  }

  const [space] = await db
    .insert(spaces)
    .values({
      tenantId: tenant.id,
      name,
      slug,
    })
    .returning();

  res.status(201).json(space);
};

export { getTenantOverview, listSpaces, createSpace };
