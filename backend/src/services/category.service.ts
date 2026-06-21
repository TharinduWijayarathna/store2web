import { and, asc, eq } from "drizzle-orm";

import { db } from "../db";
import { categories } from "../db/schema";
import { slugify } from "../utils/slug";
import { AppError } from "../utils/errors";

const listCategories = async (storeId: number) => {
  return db
    .select()
    .from(categories)
    .where(eq(categories.storeId, storeId))
    .orderBy(asc(categories.sortOrder), asc(categories.name));
};

const createCategory = async (
  storeId: number,
  input: {
    name: string;
    slug?: string;
    parentId?: number | null;
    sortOrder?: number;
  },
) => {
  const name = input.name.trim();
  const slug = slugify(input.slug?.trim() || name);

  if (!name || !slug) {
    throw new AppError("Category name is required.", 400);
  }

  const [category] = await db
    .insert(categories)
    .values({
      storeId,
      name,
      slug,
      parentId: input.parentId ?? null,
      sortOrder: input.sortOrder ?? 0,
    })
    .returning();

  return category;
};

export { listCategories, createCategory };
