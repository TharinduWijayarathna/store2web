import { describe, expect, it, vi } from "vitest";

vi.mock("drizzle-orm/node-postgres/migrator", () => ({
  migrate: vi.fn().mockRejectedValueOnce(new Error("migrate failed")),
}));

vi.mock("./index", () => ({
  db: {},
  pool: { end: vi.fn().mockResolvedValue(undefined) },
}));

describe("migrate failure", () => {
  it("sets exit code when migration fails", async () => {
    vi.resetModules();
    await import("./migrate");
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(process.exitCode).toBe(1);
    process.exitCode = 0;
  });
});
