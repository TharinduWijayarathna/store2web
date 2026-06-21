import { describe, expect, it, vi } from "vitest";

const listen = vi.fn((_port: number, cb?: () => void) => {
  cb?.();
  return { close: vi.fn() };
});

vi.mock("./app", () => ({
  app: { listen },
}));

vi.mock("./db/seed", () => ({
  bootstrapSuperadmin: vi.fn().mockResolvedValue(undefined),
}));

describe("server entry", () => {
  it("bootstraps superadmin and starts listening", async () => {
    const { bootstrapSuperadmin } = await import("./db/seed");
    await import("./server");
    expect(bootstrapSuperadmin).toHaveBeenCalled();
    expect(listen).toHaveBeenCalled();
  });
});
