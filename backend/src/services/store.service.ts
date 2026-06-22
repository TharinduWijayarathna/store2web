import { and, asc, eq, isNull } from "drizzle-orm";

import { db } from "../db";
import { storeMemberships, stores } from "../db/schema";
import { slugify } from "../utils/slug";
import { AppError } from "../utils/errors";

const listStoresForUser = async (userId: number) => {
  const rows = await db
    .select({
      id: stores.id,
      name: stores.name,
      slug: stores.slug,
      description: stores.description,
      logoUrl: stores.logoUrl,
      status: stores.status,
      role: storeMemberships.role,
      createdAt: stores.createdAt,
    })
    .from(storeMemberships)
    .innerJoin(stores, eq(storeMemberships.storeId, stores.id))
    .where(
      and(eq(storeMemberships.userId, userId), isNull(stores.deletedAt)),
    )
    .orderBy(asc(stores.name));

  return rows;
};

const getStoreMembership = async (storeId: number, userId: number) => {
  const [row] = await db
    .select({
      store: stores,
      membership: storeMemberships,
    })
    .from(storeMemberships)
    .innerJoin(stores, eq(storeMemberships.storeId, stores.id))
    .where(
      and(
        eq(storeMemberships.storeId, storeId),
        eq(storeMemberships.userId, userId),
        isNull(stores.deletedAt),
      ),
    )
    .limit(1);

  return row ?? null;
};

const getStoreBySlug = async (slug: string) => {
  const [store] = await db
    .select()
    .from(stores)
    .where(and(eq(stores.slug, slug), isNull(stores.deletedAt)))
    .limit(1);

  return store ?? null;
};

const createStore = async (
  userId: number,
  input: { name: string; slug?: string; description?: string },
) => {
  const name = input.name.trim();
  const slug = slugify(input.slug?.trim() || name);

  if (!name || !slug) {
    throw new AppError("Store name is required.", 400);
  }

  const [existing] = await db
    .select({ id: stores.id })
    .from(stores)
    .where(eq(stores.slug, slug))
    .limit(1);

  if (existing) {
    throw new AppError("Store slug already exists.", 409);
  }

  const [store] = await db
    .insert(stores)
    .values({
      name,
      slug,
      description: input.description?.trim() || null,
      status: "draft",
    })
    .returning();

  await db.insert(storeMemberships).values({
    storeId: store.id,
    userId,
    role: "owner",
  });

  return store;
};

const updateStore = async (
  storeId: number,
  input: {
    name?: string;
    description?: string | null;
    logoUrl?: string | null;
    status?: string;
    contactEmail?: string | null;
    phone?: string | null;
    website?: string | null;
    address?: string | null;
  },
) => {
  const updates: Record<string, unknown> = { updatedAt: new Date() };

  if (input.name !== undefined) updates.name = input.name.trim();
  if (input.description !== undefined) updates.description = input.description;
  if (input.logoUrl !== undefined) updates.logoUrl = input.logoUrl;
  if (input.status !== undefined) updates.status = input.status;
  if (input.contactEmail !== undefined)
    updates.contactEmail = input.contactEmail;
  if (input.phone !== undefined) updates.phone = input.phone;
  if (input.website !== undefined) updates.website = input.website;
  if (input.address !== undefined) updates.address = input.address;

  const [store] = await db
    .update(stores)
    .set(updates)
    .where(and(eq(stores.id, storeId), isNull(stores.deletedAt)))
    .returning();

  if (!store) {
    throw new AppError("Store not found.", 404);
  }

  return store;
};

export {
  listStoresForUser,
  getStoreMembership,
  getStoreBySlug,
  createStore,
  updateStore,
};
