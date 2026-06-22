import { NextFunction, Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/errors";
import { getStoreMembership } from "../services/store.service";

const requireStoreMember = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("Authentication required.", 401);
    }

    const storeId = Number.parseInt(String(req.params.storeId ?? ""), 10);

    if (!Number.isFinite(storeId) || storeId <= 0) {
      throw new AppError("Invalid store id.", 400);
    }

    const result = await getStoreMembership(storeId, req.user.id);

    if (!result) {
      throw new AppError("Store not found or access denied.", 404);
    }

    if (result.store.deletedAt) {
      throw new AppError("Store not found or access denied.", 404);
    }

    req.store = {
      id: result.store.id,
      name: result.store.name,
      slug: result.store.slug,
      status: result.store.status,
    };
    req.storeMembership = { role: result.membership.role };

    next();
  },
);

export { requireStoreMember };
