import { Router } from "express";

import { registerTenant } from "../controllers/auth.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/register", asyncHandler(registerTenant));

export default router;
