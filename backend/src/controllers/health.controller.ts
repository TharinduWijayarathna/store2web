import { Request, Response } from "express";

const getHealth = (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};

export { getHealth };
