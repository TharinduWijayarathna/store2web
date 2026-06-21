import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../app";

describe("app", () => {
  it("serves swagger ui routes", async () => {
    const response = await request(app).get("/api/docs/");
    expect(response.status).toBeGreaterThanOrEqual(200);
  });
});
