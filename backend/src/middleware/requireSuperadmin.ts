import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/errors";

const requireSuperadmin = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    next(new AppError("Authentication required.", 401));
    return;
  }

  if (req.user.platformRole !== "superadmin") {
    next(new AppError("Superadmin access required.", 403));
    return;
  }

  next();
};

export { requireSuperadmin };
