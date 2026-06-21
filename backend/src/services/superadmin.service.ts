import { and, count, desc, eq, ilike, isNull, or, sql } from "drizzle-orm";

import { db } from "../db";
import { adminAuditLogs, stores, users } from "../db/schema";
import { AppError } from "../utils/errors";

const writeAuditLog = async (input: {
  actorUserId: number;
  action: string;
  resourceType: string;
  resourceId: number;
  metadata?: Record<string, unknown>;
}) => {
  await db.insert(adminAuditLogs).values({
    actorUserId: input.actorUserId,
    action: input.action,
    resourceType: input.resourceType,
    resourceId: input.resourceId,
    metadata: input.metadata || {},
  });
};

const getDashboardStats = async () => {
  const [[storeStats], [userStats]] = await Promise.all([
    db
      .select({
        total: count(),
        published: sql<number>`count(*) filter (where ${stores.status} = 'published')`,
        suspended: sql<number>`count(*) filter (where ${stores.status} = 'suspended')`,
      })
      .from(stores)
      .where(isNull(stores.deletedAt)),
    db.select({ total: count() }).from(users),
  ]);

  return {
    stores: {
      total: Number(storeStats.total),
      published: Number(storeStats.published),
      suspended: Number(storeStats.suspended),
    },
    users: {
      total: Number(userStats.total),
    },
  };
};

const listAllStores = async (query?: string) => {
  const trimmed = query?.trim();

  const conditions = [isNull(stores.deletedAt)];

  if (trimmed) {
    conditions.push(
      or(
        ilike(stores.name, `%${trimmed}%`),
        ilike(stores.slug, `%${trimmed}%`),
      )!,
    );
  }

  return db
    .select({
      id: stores.id,
      name: stores.name,
      slug: stores.slug,
      status: stores.status,
      createdAt: stores.createdAt,
    })
    .from(stores)
    .where(and(...conditions))
    .orderBy(desc(stores.createdAt));
};

const updateStoreAsSuperadmin = async (
  actorUserId: number,
  storeId: number,
  input: { status?: string },
) => {
  const [store] = await db
    .select()
    .from(stores)
    .where(and(eq(stores.id, storeId), isNull(stores.deletedAt)))
    .limit(1);

  if (!store) {
    throw new AppError("Store not found.", 404);
  }

  const [updated] = await db
    .update(stores)
    .set({
      status: input.status ?? store.status,
      updatedAt: new Date(),
    })
    .where(eq(stores.id, storeId))
    .returning();

  await writeAuditLog({
    actorUserId,
    action: "store.updated",
    resourceType: "store",
    resourceId: storeId,
    metadata: { status: updated.status },
  });

  return updated;
};

const softDeleteStore = async (actorUserId: number, storeId: number) => {
  const [updated] = await db
    .update(stores)
    .set({ deletedAt: new Date(), updatedAt: new Date() })
    .where(and(eq(stores.id, storeId), isNull(stores.deletedAt)))
    .returning();

  if (!updated) {
    throw new AppError("Store not found.", 404);
  }

  await writeAuditLog({
    actorUserId,
    action: "store.deleted",
    resourceType: "store",
    resourceId: storeId,
  });

  return updated;
};

export {
  getDashboardStats,
  listAllStores,
  updateStoreAsSuperadmin,
  softDeleteStore,
  writeAuditLog,
};
