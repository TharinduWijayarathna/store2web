import { describe, expect, it, vi } from "vitest";

const migrate = vi.fn().mockResolvedValue(undefined);
const poolEnd = vi.fn().mockResolvedValue(undefined);

vi.mock("drizzle-orm/node-postgres/migrator", () => ({ migrate }));
vi.mock("../../db/index", () => ({
  db: {},
  pool: { end: poolEnd },
}));

describe("migrate entry", () => {
  it("runs migrations and closes the pool", async () => {
    await import("../../db/migrate");
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(migrate).toHaveBeenCalled();
    expect(poolEnd).toHaveBeenCalled();
  });
});
