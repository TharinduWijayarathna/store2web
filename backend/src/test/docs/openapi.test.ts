import { describe, expect, it } from "vitest";

import { openApiSpec } from "../../docs/openapi";

describe("openApiSpec", () => {
  it("exports a valid openapi document", () => {
    expect(openApiSpec.openapi).toBe("3.0.3");
    expect(openApiSpec.info.title).toBe("Store2Web API");
    expect(openApiSpec.paths["/health"]).toBeDefined();
  });
});
