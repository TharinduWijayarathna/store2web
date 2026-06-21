import { NextFunction, Request, Response } from "express";

import { COOKIE_NAME } from "../config/env";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/errors";
import { verifyToken } from "../utils/jwt";
import { findUserById } from "../services/auth.service";

const requireAuth = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies?.[COOKIE_NAME];

    if (!token || typeof token !== "string") {
      throw new AppError("Authentication required.", 401);
    }

    let payload;
    try {
      payload = verifyToken(token);
    } catch {
      throw new AppError("Invalid or expired session.", 401);
    }

    const user = await findUserById(payload.userId);

    if (!user) {
      throw new AppError("User not found.", 401);
    }

    if (user.disabledAt) {
      throw new AppError("Account is disabled.", 403);
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      platformRole: user.platformRole,
    };

    next();
  },
);

export { requireAuth };
