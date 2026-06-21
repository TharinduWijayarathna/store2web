import { eq } from "drizzle-orm";
import { Request, Response } from "express";

import { db } from "../db";
import {
  businessProfiles,
  spaces,
  subscriptions,
  tenants,
  users,
} from "../db/schema";

const addDays = (days: number) =>
  new Date(Date.now() + days * 24 * 60 * 60 * 1000);

const registerTenant = async (req: Request, res: Response) => {
  const body = req.body as {
    name?: string;
    email?: string;
    tenantName?: string;
    tenantSlug?: string;
    spaceName?: string;
    plan?: string;
    businessName?: string;
  };

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const tenantName =
    typeof body.tenantName === "string" ? body.tenantName.trim() : "";
  const tenantSlug =
    typeof body.tenantSlug === "string" ? body.tenantSlug.trim() : "";
  const spaceName =
    typeof body.spaceName === "string" ? body.spaceName.trim() : "";
  const plan = typeof body.plan === "string" ? body.plan.trim() : "";
  const businessName =
    typeof body.businessName === "string" ? body.businessName.trim() : "";

  if (!name || !email || !tenantName || !tenantSlug) {
    res.status(400).json({
      error:
        "name, email, tenantName, and tenantSlug are required to register.",
    });
    return;
  }

  const [existingTenant] = await db
    .select()
    .from(tenants)
    .where(eq(tenants.slug, tenantSlug))
    .limit(1);

  if (existingTenant) {
    res.status(409).json({ error: "Tenant slug already exists." });
    return;
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser) {
    res.status(409).json({ error: "Email already registered." });
    return;
  }

  const [tenant] = await db
    .insert(tenants)
    .values({ name: tenantName, slug: tenantSlug })
    .returning();

  const [owner] = await db
    .insert(users)
    .values({
      name,
      email,
      tenantId: tenant.id,
      role: "owner",
    })
    .returning();

  const [space] = await db
    .insert(spaces)
    .values({
      tenantId: tenant.id,
      name: spaceName || `${tenantName} Space`,
      slug: tenantSlug,
    })
    .returning();

  const [subscription] = await db
    .insert(subscriptions)
    .values({
      tenantId: tenant.id,
      plan: plan || "starter",
      status: "active",
      currentPeriodEnd: addDays(30),
    })
    .returning();

  const [businessProfile] = await db
    .insert(businessProfiles)
    .values({
      tenantId: tenant.id,
      spaceId: space.id,
      displayName: businessName || tenantName,
      contactEmail: email,
    })
    .returning();

  res.status(201).json({
    tenant,
    owner,
    space,
    subscription,
    businessProfile,
  });
};

export { registerTenant };
