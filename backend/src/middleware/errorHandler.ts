import { NextFunction, Request, Response } from "express";

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
  console.error(err);

  const status = err.statusCode || err.status || 500;
  const message =
    status >= 500 ? "Internal Server Error" : err.message || "Request failed";

  res.status(status).json({ error: message });
};

export { errorHandler };
