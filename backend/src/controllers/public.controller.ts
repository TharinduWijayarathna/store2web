import { Request, Response } from "express";

import { getPageBySlug, listPublishedPages } from "../services/page.service";
import {
  getProductBySlug,
  listPublishedProducts,
} from "../services/product.service";
import { getStoreBySlug } from "../services/store.service";
import { listCategories } from "../services/category.service";
import { AppError } from "../utils/errors";

const getPublicStore = async (req: Request, res: Response) => {
  const store = await getStoreBySlug(String(req.params.slug));

  if (!store || store.status === "suspended") {
    throw new AppError("Store not found.", 404);
  }

  if (store.status !== "published") {
    throw new AppError("Store is not published.", 404);
  }

  res.status(200).json({
    store: {
      name: store.name,
      slug: store.slug,
      description: store.description,
      logoUrl: store.logoUrl,
    },
  });
};

const getPublicProducts = async (req: Request, res: Response) => {
  const store = await getStoreBySlug(String(req.params.slug));

  if (!store || store.status !== "published") {
    throw new AppError("Store not found.", 404);
  }

  const products = await listPublishedProducts(store.id);
  res.status(200).json({ products });
};

const getPublicProduct = async (req: Request, res: Response) => {
  const store = await getStoreBySlug(String(req.params.slug));

  if (!store || store.status !== "published") {
    throw new AppError("Store not found.", 404);
  }

  const product = await getProductBySlug(store.id, String(req.params.productSlug));

  if (!product || product.status !== "published") {
    throw new AppError("Product not found.", 404);
  }

  res.status(200).json({ product });
};

const getPublicCategories = async (req: Request, res: Response) => {
  const store = await getStoreBySlug(String(req.params.slug));

  if (!store || store.status !== "published") {
    throw new AppError("Store not found.", 404);
  }

  const categories = await listCategories(store.id);
  res.status(200).json({ categories });
};

const getPublicPages = async (req: Request, res: Response) => {
  const store = await getStoreBySlug(String(req.params.slug));

  if (!store || store.status !== "published") {
    throw new AppError("Store not found.", 404);
  }

  const pages = await listPublishedPages(store.id);
  res.status(200).json({ pages });
};

const getPublicPage = async (req: Request, res: Response) => {
  const store = await getStoreBySlug(String(req.params.slug));

  if (!store || store.status !== "published") {
    throw new AppError("Store not found.", 404);
  }

  const page = await getPageBySlug(store.id, String(req.params.pageSlug));

  if (!page || page.published !== "true") {
    throw new AppError("Page not found.", 404);
  }

  res.status(200).json({ page });
};

export {
  getPublicStore,
  getPublicProducts,
  getPublicProduct,
  getPublicCategories,
  getPublicPages,
  getPublicPage,
};
