import { and, asc, eq } from "drizzle-orm";

import { db } from "../db";
import { categories, productCategories, products } from "../db/schema";
import { slugify } from "../utils/slug";
import { AppError } from "../utils/errors";

const listProducts = async (storeId: number) => {
  return db
    .select()
    .from(products)
    .where(eq(products.storeId, storeId))
    .orderBy(asc(products.name));
};

const getProductBySlug = async (storeId: number, slug: string) => {
  const [product] = await db
    .select()
    .from(products)
    .where(and(eq(products.storeId, storeId), eq(products.slug, slug)))
    .limit(1);

  return product ?? null;
};

const createProduct = async (
  storeId: number,
  input: {
    name: string;
    slug?: string;
    description?: string;
    priceCents: number;
    currency?: string;
    status?: string;
    metadata?: Record<string, unknown>;
    categoryIds?: number[];
  },
) => {
  const name = input.name.trim();
  const slug = slugify(input.slug?.trim() || name);

  if (!name || !slug) {
    throw new AppError("Product name is required.", 400);
  }

  const [product] = await db
    .insert(products)
    .values({
      storeId,
      name,
      slug,
      description: input.description?.trim() || null,
      priceCents: input.priceCents,
      currency: input.currency || "USD",
      status: input.status || "draft",
      metadata: input.metadata || {},
    })
    .returning();

  if (input.categoryIds?.length) {
    await db.insert(productCategories).values(
      input.categoryIds.map((categoryId) => ({
        productId: product.id,
        categoryId,
      })),
    );
  }

  return product;
};

const updateProduct = async (
  storeId: number,
  productId: number,
  input: {
    name?: string;
    description?: string | null;
    priceCents?: number;
    currency?: string;
    status?: string;
    metadata?: Record<string, unknown>;
    categoryIds?: number[];
  },
) => {
  const updates: Record<string, unknown> = { updatedAt: new Date() };

  if (input.name !== undefined) {
    updates.name = input.name.trim();
    updates.slug = slugify(input.name);
  }
  if (input.description !== undefined) updates.description = input.description;
  if (input.priceCents !== undefined) updates.priceCents = input.priceCents;
  if (input.currency !== undefined) updates.currency = input.currency;
  if (input.status !== undefined) updates.status = input.status;
  if (input.metadata !== undefined) updates.metadata = input.metadata;

  const [product] = await db
    .update(products)
    .set(updates)
    .where(and(eq(products.id, productId), eq(products.storeId, storeId)))
    .returning();

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  if (input.categoryIds !== undefined) {
    await db
      .delete(productCategories)
      .where(eq(productCategories.productId, productId));

    if (input.categoryIds.length) {
      await db.insert(productCategories).values(
        input.categoryIds.map((categoryId) => ({
          productId,
          categoryId,
        })),
      );
    }
  }

  return product;
};

const listPublishedProducts = async (storeId: number) => {
  return db
    .select()
    .from(products)
    .where(and(eq(products.storeId, storeId), eq(products.status, "published")))
    .orderBy(asc(products.name));
};

export {
  listProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  listPublishedProducts,
};
