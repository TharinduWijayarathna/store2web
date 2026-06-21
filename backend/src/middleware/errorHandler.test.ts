import type { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { ZodError } from "zod";

import { errorHandler } from "./errorHandler";
import { AppError } from "../utils/errors";

describe("errorHandler", () => {
  const createResponse = () => {
    const res = {
      statusCode: 200,
      body: undefined as unknown,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(payload: unknown) {
        this.body = payload;
        return this;
      },
    };
    return res;
  };

  it("handles Zod validation errors", () => {
    const res = createResponse();
    errorHandler(
      new ZodError([{ code: "custom", path: ["email"], message: "Invalid email" }]),
      {} as Request,
      res as unknown as Response,
      vi.fn(),
    );
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Invalid email" });
  });

  it("handles AppError", () => {
    const res = createResponse();
    errorHandler(
      new AppError("Forbidden", 403),
      {} as Request,
      res as unknown as Response,
      vi.fn(),
    );
    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({ error: "Forbidden" });
  });

  it("masks internal server errors", () => {
    const res = createResponse();
    errorHandler(
      new AppError("DB exploded", 500),
      {} as Request,
      res as unknown as Response,
      vi.fn(),
    );
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Internal Server Error" });
  });

  it("handles generic errors with status and statusCode fields", () => {
    const res = createResponse();
    const err = new Error("Fallback message") as Error & {
      status?: number;
      statusCode?: number;
    };
    err.status = 422;
    errorHandler(err, {} as Request, res as unknown as Response, vi.fn());
    expect(res.statusCode).toBe(422);
    expect(res.body).toEqual({ error: "Fallback message" });

    const res2 = createResponse();
    const empty = new Error("") as Error;
    errorHandler(empty, {} as Request, res2 as unknown as Response, vi.fn());
    expect(res2.statusCode).toBe(500);
    expect(res2.body).toEqual({ error: "Internal Server Error" });
  });

  it("handles generic errors with statusCode", () => {
    const res = createResponse();
    const err = new Error("Not found") as Error & { statusCode: number };
    err.statusCode = 404;
    errorHandler(err, {} as Request, res as unknown as Response, vi.fn());
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Not found" });
  });

  it("defaults to 500 for unknown errors", () => {
    const res = createResponse();
    errorHandler(
      new Error("unexpected"),
      {} as Request,
      res as unknown as Response,
      vi.fn(),
    );
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Internal Server Error" });
  });
});
