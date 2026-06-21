import { describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";

describe("asyncHandler", () => {
  it("forwards rejected promises to next", async () => {
    const error = new Error("boom");
    const handler = asyncHandler(async () => {
      throw error;
    });
    const next = vi.fn();

    await handler({} as Request, {} as Response, next as NextFunction);
    expect(next).toHaveBeenCalledWith(error);
  });

  it("calls handler without throwing on success", async () => {
    const handler = asyncHandler(async (_req, res) => {
      res.status(200).end();
    });
    const res = { status: vi.fn().mockReturnThis(), end: vi.fn() };

    await handler({} as Request, res as unknown as Response, vi.fn());
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
