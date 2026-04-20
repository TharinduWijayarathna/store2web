import { Router } from "express";

import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import tenantRoutes from "./tenant.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/tenant", tenantRoutes);

export default router;
