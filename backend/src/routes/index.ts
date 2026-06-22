import { Router } from "express";

import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import publicRoutes from "./public.routes";
import storesRoutes from "./stores.routes";
import superadminRoutes from "./superadmin.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/stores", storesRoutes);
router.use("/public", publicRoutes);
router.use("/superadmin", superadminRoutes);

export default router;
