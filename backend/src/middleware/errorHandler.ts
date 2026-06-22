import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../utils/errors";

type HttpError = Error & {
  status?: number;
  statusCode?: number;
};

const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: err.issues[0]?.message || "Validation failed.",
    });
    return;
  }

  console.error(err);

  const status =
    err instanceof AppError
      ? err.statusCode
      : err.statusCode || err.status || 500;
  const message =
    status >= 500 ? "Internal Server Error" : err.message || "Request failed";

  res.status(status).json({ error: message });
};

export { errorHandler };
