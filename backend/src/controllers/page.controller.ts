import { Request, Response } from "express";
import { z } from "zod";

import { createPage, listPages, updatePage } from "../services/page.service";

const createPageSchema = z.object({
  title: z.string().trim().min(1).max(255),
  slug: z.string().trim().max(120).optional(),
  body: z.string().trim().max(50000).optional(),
  type: z.enum(["about", "contact", "policy", "custom"]).optional(),
  published: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

const updatePageSchema = createPageSchema.partial();

const listPagesHandler = async (req: Request, res: Response) => {
  const pages = await listPages(req.store!.id);
  res.status(200).json({ pages });
};

const createPageHandler = async (req: Request, res: Response) => {
  const body = createPageSchema.parse(req.body);
  const page = await createPage(req.store!.id, body);
  res.status(201).json({ page });
};

const updatePageHandler = async (req: Request, res: Response) => {
  const pageId = Number.parseInt(String(req.params.pageId), 10);
  const body = updatePageSchema.parse(req.body);
  const page = await updatePage(req.store!.id, pageId, body);
  res.status(200).json({ page });
};

export { listPagesHandler, createPageHandler, updatePageHandler };
