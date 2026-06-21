import { describe, expect, it } from "vitest";

import { slugify } from "./slug";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Bloom & Co Shop")).toBe("bloom-co-shop");
  });

  it("trims and strips invalid characters", () => {
    expect(slugify("  Hello---World!!  ")).toBe("hello-world");
  });

  it("limits length to 120 characters", () => {
    expect(slugify("a".repeat(200)).length).toBeLessThanOrEqual(120);
  });
});
