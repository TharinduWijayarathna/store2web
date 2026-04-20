import { and, asc, eq } from "drizzle-orm";
import { Request, Response } from "express";

import { db } from "../db";
import { products } from "../db/schema";
import { getPrimarySpace } from "../utils/tenant";

const listProducts = async (req: Request, res: Response) => {
  const tenant = req.tenant;

  if (!tenant) {
    res.status(400).json({ error: "Tenant context is missing." });
    return;
  }

  const spaceIdParam = req.query.spaceId;
  const spaceId = Number.parseInt(String(spaceIdParam ?? ""), 10);

  const conditions = [eq(products.tenantId, tenant.id)];
  if (Number.isFinite(spaceId) && spaceId > 0) {
    conditions.push(eq(products.spaceId, spaceId));
  }

  const items = await db
    .select()
    .from(products)
    .where(conditions.length > 1 ? and(...conditions) : conditions[0])
    .orderBy(asc(products.id));

  res.status(200).json({ products: items });
};

const createProduct = async (req: Request, res: Response) => {
  const tenant = req.tenant;

  if (!tenant) {
    res.status(400).json({ error: "Tenant context is missing." });
    return;
  }

  const body = req.body as {
    name?: string;
    description?: string;
    priceCents?: number | string;
    currency?: string;
    status?: string;
    spaceId?: number | string;
  };

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : undefined;
  const priceCents = Number.parseInt(String(body.priceCents ?? ""), 10);
  const currency =
    typeof body.currency === "string" && body.currency.trim()
      ? body.currency.trim()
      : "USD";
  const status =
    typeof body.status === "string" && body.status.trim()
      ? body.status.trim()
      : "draft";
  const spaceId =
    body.spaceId === undefined
      ? NaN
      : Number.parseInt(String(body.spaceId), 10);

  if (!name || !Number.isFinite(priceCents) || priceCents < 0) {
    res.status(400).json({
      error: "name and priceCents are required to create a product.",
    });
    return;
  }

  const resolvedSpace =
    Number.isFinite(spaceId) && spaceId > 0
      ? { id: spaceId }
      : await getPrimarySpace(tenant.id);

  if (!resolvedSpace) {
    res.status(404).json({ error: "Space not found." });
    return;
  }

  const [product] = await db
    .insert(products)
    .values({
      tenantId: tenant.id,
      spaceId: resolvedSpace.id,
      name,
      description,
      priceCents,
      currency,
      status,
    })
    .returning();

  res.status(201).json(product);
};

export { listProducts, createProduct };
