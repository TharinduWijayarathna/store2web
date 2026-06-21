import { Router } from "express";

import {
  getBusinessProfile,
  upsertBusinessProfile,
} from "../controllers/business.controller";
import { listProducts, createProduct } from "../controllers/product.controller";
import {
  getSubscription,
  updateSubscription,
} from "../controllers/subscription.controller";
import {
  createSpace,
  getTenantOverview,
  listSpaces,
} from "../controllers/tenant.controller";
import { tenantContext } from "../middleware/tenantContext";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(tenantContext);

router.get("/", asyncHandler(getTenantOverview));
router.get("/spaces", asyncHandler(listSpaces));
router.post("/spaces", asyncHandler(createSpace));
router.get("/products", asyncHandler(listProducts));
router.post("/products", asyncHandler(createProduct));
router.get("/business", asyncHandler(getBusinessProfile));
router.patch("/business", asyncHandler(upsertBusinessProfile));
router.get("/subscription", asyncHandler(getSubscription));
router.patch("/subscription", asyncHandler(updateSubscription));

export default router;
