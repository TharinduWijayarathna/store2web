import { and, eq } from "drizzle-orm";
import { Request, Response } from "express";

import { db } from "../db";
import { businessProfiles } from "../db/schema";
import { getPrimarySpace } from "../utils/tenant";

const getBusinessProfile = async (req: Request, res: Response) => {
  const tenant = req.tenant;

  if (!tenant) {
    res.status(400).json({ error: "Tenant context is missing." });
    return;
  }

  const spaceIdParam = req.query.spaceId;
  const spaceId = Number.parseInt(String(spaceIdParam ?? ""), 10);
  const resolvedSpace =
    Number.isFinite(spaceId) && spaceId > 0
      ? { id: spaceId }
      : await getPrimarySpace(tenant.id);

  if (!resolvedSpace) {
    res.status(404).json({ error: "Space not found." });
    return;
  }

  const [profile] = await db
    .select()
    .from(businessProfiles)
    .where(
      and(
        eq(businessProfiles.tenantId, tenant.id),
        eq(businessProfiles.spaceId, resolvedSpace.id),
      ),
    )
    .limit(1);

  if (!profile) {
    res.status(404).json({ error: "Business profile not found." });
    return;
  }

  res.status(200).json(profile);
};

const upsertBusinessProfile = async (req: Request, res: Response) => {
  const tenant = req.tenant;

  if (!tenant) {
    res.status(400).json({ error: "Tenant context is missing." });
    return;
  }

  const body = req.body as {
    spaceId?: number | string;
    displayName?: string;
    description?: string;
    contactEmail?: string;
    phone?: string;
    website?: string;
    address?: string;
  };

  const spaceId =
    body.spaceId === undefined
      ? NaN
      : Number.parseInt(String(body.spaceId), 10);
  const resolvedSpace =
    Number.isFinite(spaceId) && spaceId > 0
      ? { id: spaceId }
      : await getPrimarySpace(tenant.id);

  if (!resolvedSpace) {
    res.status(404).json({ error: "Space not found." });
    return;
  }

  const updates = {
    displayName:
      typeof body.displayName === "string"
        ? body.displayName.trim()
        : undefined,
    description:
      typeof body.description === "string"
        ? body.description.trim()
        : undefined,
    contactEmail:
      typeof body.contactEmail === "string"
        ? body.contactEmail.trim()
        : undefined,
    phone: typeof body.phone === "string" ? body.phone.trim() : undefined,
    website:
      typeof body.website === "string" ? body.website.trim() : undefined,
    address:
      typeof body.address === "string" ? body.address.trim() : undefined,
    updatedAt: new Date(),
  };

  const hasUpdates =
    updates.displayName !== undefined ||
    updates.description !== undefined ||
    updates.contactEmail !== undefined ||
    updates.phone !== undefined ||
    updates.website !== undefined ||
    updates.address !== undefined;

  if (!hasUpdates) {
    res
      .status(400)
      .json({ error: "Provide at least one field to update." });
    return;
  }

  const [existing] = await db
    .select()
    .from(businessProfiles)
    .where(
      and(
        eq(businessProfiles.tenantId, tenant.id),
        eq(businessProfiles.spaceId, resolvedSpace.id),
      ),
    )
    .limit(1);

  if (existing) {
    const [updated] = await db
      .update(businessProfiles)
      .set(updates)
      .where(eq(businessProfiles.id, existing.id))
      .returning();

    res.status(200).json(updated);
    return;
  }

  if (!updates.displayName) {
    res
      .status(400)
      .json({ error: "displayName is required when creating." });
    return;
  }

  const [created] = await db
    .insert(businessProfiles)
    .values({
      tenantId: tenant.id,
      spaceId: resolvedSpace.id,
      displayName: updates.displayName,
      description: updates.description,
      contactEmail: updates.contactEmail,
      phone: updates.phone,
      website: updates.website,
      address: updates.address,
    })
    .returning();

  res.status(201).json(created);
};

export { getBusinessProfile, upsertBusinessProfile };
