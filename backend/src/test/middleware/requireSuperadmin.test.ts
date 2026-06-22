import type { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";

import { requireSuperadmin } from "../../middleware/requireSuperadmin";
import { AppError } from "../../utils/errors";

describe("requireSuperadmin", () => {
  it("passes for superadmin users", () => {
    const next = vi.fn();
    requireSuperadmin(
      { user: { id: 1, name: "Admin", email: "a@t.com", platformRole: "superadmin" } } as Request,
      {} as Response,
      next,
    );
    expect(next).toHaveBeenCalledWith();
  });

  it("rejects unauthenticated requests", () => {
    const next = vi.fn();
    requireSuperadmin({} as Request, {} as Response, next);
    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect((next.mock.calls[0][0] as AppError).statusCode).toBe(401);
  });

  it("rejects non-superadmin users", () => {
    const next = vi.fn();
    requireSuperadmin(
      { user: { id: 1, name: "User", email: "u@t.com", platformRole: "user" } } as Request,
      {} as Response,
      next,
    );
    expect((next.mock.calls[0][0] as AppError).statusCode).toBe(403);
  });
});
