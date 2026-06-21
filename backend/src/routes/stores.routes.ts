import { Router } from "express";

import {
  createCategoryHandler,
  listCategoriesHandler,
} from "../controllers/category.controller";
import {
  createPageHandler,
  listPagesHandler,
  updatePageHandler,
} from "../controllers/page.controller";
import {
  createProductHandler,
  listProductsHandler,
  updateProductHandler,
} from "../controllers/product.controller";
import {
  createStoreHandler,
  getStore,
  listStores,
  updateStoreHandler,
} from "../controllers/store.controller";
import { requireAuth } from "../middleware/auth";
import { requireStoreMember } from "../middleware/requireStoreMember";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(listStores));
router.post("/", asyncHandler(createStoreHandler));

router.use("/:storeId", requireStoreMember);

router.get("/:storeId", asyncHandler(getStore));
router.patch("/:storeId", asyncHandler(updateStoreHandler));

router.get("/:storeId/products", asyncHandler(listProductsHandler));
router.post("/:storeId/products", asyncHandler(createProductHandler));
router.patch(
  "/:storeId/products/:productId",
  asyncHandler(updateProductHandler),
);

router.get("/:storeId/categories", asyncHandler(listCategoriesHandler));
router.post("/:storeId/categories", asyncHandler(createCategoryHandler));

router.get("/:storeId/pages", asyncHandler(listPagesHandler));
router.post("/:storeId/pages", asyncHandler(createPageHandler));
router.patch("/:storeId/pages/:pageId", asyncHandler(updatePageHandler));

export default router;
