import { describe, expect, it } from "vitest";

import { hashPassword, verifyPassword } from "./password";

describe("password utils", () => {
  it("hashes and verifies passwords", async () => {
    const hash = await hashPassword("secret-password");
    expect(hash).not.toBe("secret-password");
    await expect(verifyPassword("secret-password", hash)).resolves.toBe(true);
    await expect(verifyPassword("wrong", hash)).resolves.toBe(false);
  });
});
