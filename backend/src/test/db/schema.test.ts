import { describe, expect, it } from "vitest";

import * as schema from "../../db/schema";

describe("schema", () => {
  it("exports all table definitions", () => {
    expect(schema.users).toBeDefined();
    expect(schema.stores).toBeDefined();
    expect(schema.storeMemberships).toBeDefined();
    expect(schema.categories).toBeDefined();
    expect(schema.products).toBeDefined();
    expect(schema.productCategories).toBeDefined();
    expect(schema.pages).toBeDefined();
    expect(schema.adminAuditLogs).toBeDefined();
  });
});
