import { describe, expect, it, vi } from "vitest";

describe("env config", () => {
  it("applies defaults when variables are missing", async () => {
    vi.stubEnv("PORT", "");
    vi.stubEnv("DATABASE_URL", "");
    vi.stubEnv("JWT_SECRET", "");
    vi.resetModules();
    const env = await import("./env");
    expect(env.PORT).toBe(3000);
    expect(env.DATABASE_URL).toContain("postgresql://");
    expect(env.JWT_SECRET).toBeTruthy();
    vi.unstubAllEnvs();
  });
});
