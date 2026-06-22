import { and, asc, eq } from "drizzle-orm";

import { db } from "../db";
import { pages } from "../db/schema";
import { slugify } from "../utils/slug";
import { AppError } from "../utils/errors";

const listPages = async (storeId: number) => {
  return db
    .select()
    .from(pages)
    .where(eq(pages.storeId, storeId))
    .orderBy(asc(pages.sortOrder), asc(pages.title));
};

const getPageBySlug = async (storeId: number, slug: string) => {
  const [page] = await db
    .select()
    .from(pages)
    .where(and(eq(pages.storeId, storeId), eq(pages.slug, slug)))
    .limit(1);

  return page ?? null;
};

const createPage = async (
  storeId: number,
  input: {
    title: string;
    slug?: string;
    body?: string;
    type?: string;
    published?: boolean;
    sortOrder?: number;
  },
) => {
  const title = input.title.trim();
  const slug = slugify(input.slug?.trim() || title);

  if (!title || !slug) {
    throw new AppError("Page title is required.", 400);
  }

  const [page] = await db
    .insert(pages)
    .values({
      storeId,
      title,
      slug,
      body: input.body?.trim() || null,
      type: input.type || "custom",
      published: input.published ? "true" : "false",
      sortOrder: input.sortOrder ?? 0,
    })
    .returning();

  return page;
};

const updatePage = async (
  storeId: number,
  pageId: number,
  input: {
    title?: string;
    body?: string | null;
    type?: string;
    published?: boolean;
    sortOrder?: number;
  },
) => {
  const updates: Record<string, unknown> = { updatedAt: new Date() };

  if (input.title !== undefined) {
    updates.title = input.title.trim();
    updates.slug = slugify(input.title);
  }
  if (input.body !== undefined) updates.body = input.body;
  if (input.type !== undefined) updates.type = input.type;
  if (input.published !== undefined)
    updates.published = input.published ? "true" : "false";
  if (input.sortOrder !== undefined) updates.sortOrder = input.sortOrder;

  const [page] = await db
    .update(pages)
    .set(updates)
    .where(and(eq(pages.id, pageId), eq(pages.storeId, storeId)))
    .returning();

  if (!page) {
    throw new AppError("Page not found.", 404);
  }

  return page;
};

const listPublishedPages = async (storeId: number) => {
  return db
    .select()
    .from(pages)
    .where(and(eq(pages.storeId, storeId), eq(pages.published, "true")))
    .orderBy(asc(pages.sortOrder), asc(pages.title));
};

export {
  listPages,
  getPageBySlug,
  createPage,
  updatePage,
  listPublishedPages,
};
