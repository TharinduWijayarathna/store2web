import type { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";

import { requireStoreMember } from "./requireStoreMember";
import { AppError } from "../utils/errors";

describe("requireStoreMember", () => {
  it("rejects missing auth and invalid store ids", async () => {
    const next = vi.fn();
    await requireStoreMember(
      {
        params: { storeId: "abc" },
        user: { id: 1, name: "U", email: "u@t.com", platformRole: "user" },
      } as unknown as Request,
      {} as Response,
      next,
    );
    expect((next.mock.calls[0][0] as AppError).statusCode).toBe(400);

    const missingUser = vi.fn();
    await requireStoreMember(
      { params: { storeId: "1" } } as unknown as Request,
      {} as Response,
      missingUser,
    );
    expect((missingUser.mock.calls[0][0] as AppError).statusCode).toBe(401);
  });
});
