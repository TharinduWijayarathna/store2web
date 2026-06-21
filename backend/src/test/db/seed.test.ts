import { describe, expect, it } from "vitest";

import { bootstrapSuperadmin } from "../../db/seed";

describe("bootstrapSuperadmin", () => {
  it("runs without error when SUPERADMIN_EMAIL is unset", async () => {
    const previous = process.env.SUPERADMIN_EMAIL;
    process.env.SUPERADMIN_EMAIL = "";
    await expect(bootstrapSuperadmin()).resolves.toBeUndefined();
    process.env.SUPERADMIN_EMAIL = previous;
  });
});
