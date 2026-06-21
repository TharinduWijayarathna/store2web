import { describe, expect, it } from "vitest";

import { signToken, verifyToken } from "./jwt";

describe("jwt utils", () => {
  it("signs and verifies tokens", () => {
    const token = signToken({
      userId: 1,
      email: "user@test.com",
      platformRole: "user",
    });

    const payload = verifyToken(token);
    expect(payload.userId).toBe(1);
    expect(payload.email).toBe("user@test.com");
    expect(payload.platformRole).toBe("user");
  });

  it("throws for invalid tokens", () => {
    expect(() => verifyToken("not-a-token")).toThrow();
  });
});
