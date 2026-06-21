import { describe, expect, it, vi } from "vitest";

import { bootstrapSuperadmin } from "./seed";

describe("bootstrapSuperadmin with email", () => {
  it("promotes the configured email when set", async () => {
    process.env.SUPERADMIN_EMAIL = "promote@test.com";
    await expect(bootstrapSuperadmin()).resolves.toBeUndefined();
    process.env.SUPERADMIN_EMAIL = "super@test.com";
  });
});
