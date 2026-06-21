import { Request, Response } from "express";
import { z } from "zod";

import {
  createProduct,
  listProducts,
  updateProduct,
} from "../services/product.service";

const createProductSchema = z.object({
  name: z.string().trim().min(1).max(255),
  slug: z.string().trim().max(120).optional(),
  description: z.string().trim().max(10000).optional(),
  priceCents: z.number().int().min(0),
  currency: z.string().trim().max(8).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  categoryIds: z.array(z.number().int().positive()).optional(),
});

const updateProductSchema = createProductSchema.partial();

const listProductsHandler = async (req: Request, res: Response) => {
  const products = await listProducts(req.store!.id);
  res.status(200).json({ products });
};

const createProductHandler = async (req: Request, res: Response) => {
  const body = createProductSchema.parse(req.body);
  const product = await createProduct(req.store!.id, body);
  res.status(201).json({ product });
};

const updateProductHandler = async (req: Request, res: Response) => {
  const productId = Number.parseInt(String(req.params.productId), 10);
  const body = updateProductSchema.parse(req.body);
  const product = await updateProduct(req.store!.id, productId, body);
  res.status(200).json({ product });
};

export { listProductsHandler, createProductHandler, updateProductHandler };
