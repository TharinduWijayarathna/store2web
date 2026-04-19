import { Request, Response } from "express";

const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
};

export { notFound };
