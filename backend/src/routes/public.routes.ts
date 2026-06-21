import { Router } from "express";

import {
  getPublicCategories,
  getPublicPage,
  getPublicPages,
  getPublicProduct,
  getPublicProducts,
  getPublicStore,
} from "../controllers/public.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/stores/:slug", asyncHandler(getPublicStore));
router.get("/stores/:slug/products", asyncHandler(getPublicProducts));
router.get(
  "/stores/:slug/products/:productSlug",
  asyncHandler(getPublicProduct),
);
router.get("/stores/:slug/categories", asyncHandler(getPublicCategories));
router.get("/stores/:slug/pages", asyncHandler(getPublicPages));
router.get("/stores/:slug/pages/:pageSlug", asyncHandler(getPublicPage));

export default router;
