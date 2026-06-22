import { Request, Response } from "express";
import { z } from "zod";

import { createCategory, listCategories } from "../services/category.service";

const createCategorySchema = z.object({
  name: z.string().trim().min(1).max(255),
  slug: z.string().trim().max(120).optional(),
  parentId: z.number().int().positive().nullable().optional(),
  sortOrder: z.number().int().optional(),
});

const listCategoriesHandler = async (req: Request, res: Response) => {
  const categories = await listCategories(req.store!.id);
  res.status(200).json({ categories });
};

const createCategoryHandler = async (req: Request, res: Response) => {
  const body = createCategorySchema.parse(req.body);
  const category = await createCategory(req.store!.id, body);
  res.status(201).json({ category });
};

export { listCategoriesHandler, createCategoryHandler };
