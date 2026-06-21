import { beforeEach, describe, expect, it } from "vitest";

import { registerUser } from "./auth.service";
import { updatePage } from "./page.service";
import { updateStore } from "./store.service";
import { resetDatabase } from "../test/setup";

describe("partial service updates", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  it("updates optional store and page fields", async () => {
    const user = await registerUser({
      name: "Partial User",
      email: "partial@test.com",
      password: "password123",
    });
    const store = await import("./store.service").then((m) =>
      m.createStore(user.id, { name: "Partial Store", slug: "partial-store" }),
    );

    await updateStore(store.id, { description: "Updated only" });

    const page = await import("./page.service").then((m) =>
      m.createPage(store.id, { title: "About", published: false }),
    );

    await updatePage(store.id, page.id, {
      body: "Body only",
      published: true,
      sortOrder: 2,
    });
  });
});
