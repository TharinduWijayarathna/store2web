import { Router } from "express";

import {
  deleteStore,
  getDashboard,
  listStores,
  updateStore,
} from "../controllers/superadmin.controller";
import { requireAuth } from "../middleware/auth";
import { requireSuperadmin } from "../middleware/requireSuperadmin";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(requireAuth, requireSuperadmin);

router.get("/dashboard", asyncHandler(getDashboard));
router.get("/stores", asyncHandler(listStores));
router.patch("/stores/:storeId", asyncHandler(updateStore));
router.delete("/stores/:storeId", asyncHandler(deleteStore));

export default router;
