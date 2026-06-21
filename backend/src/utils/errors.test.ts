import { describe, expect, it } from "vitest";

import { AppError } from "./errors";

describe("AppError", () => {
  it("sets message and default status code", () => {
    const error = new AppError("Bad request");
    expect(error.message).toBe("Bad request");
    expect(error.statusCode).toBe(400);
    expect(error.name).toBe("AppError");
  });

  it("accepts custom status code", () => {
    const error = new AppError("Unauthorized", 401);
    expect(error.statusCode).toBe(401);
  });
});
