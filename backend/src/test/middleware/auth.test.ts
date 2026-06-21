import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../../app";
import { signToken } from "../../utils/jwt";

describe("auth middleware edge cases", () => {
  it("rejects tokens for missing users", async () => {
    const token = signToken({
      userId: 999999,
      email: "ghost@test.com",
      platformRole: "user",
    });

    const response = await request(app)
      .get("/api/auth/me")
      .set("Cookie", `s2w_token=${token}`);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("User not found.");
  });

  it("requires authentication on protected routes", async () => {
    const response = await request(app).get("/api/stores");
    expect(response.status).toBe(401);
  });
});
