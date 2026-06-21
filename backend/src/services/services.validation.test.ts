import { beforeEach, describe, expect, it } from "vitest";

import { createCategory } from "./category.service";
import { createProduct, updateProduct } from "./product.service";
import { createStore, updateStore } from "./store.service";
import { createPage } from "./page.service";
import { AppError } from "../utils/errors";
import { resetDatabase } from "../test/setup";

describe("service validation", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  it("rejects invalid store, category, product, and page input", async () => {
    await expect(createStore(1, { name: "   " })).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(createCategory(1, { name: "  " })).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(
      createProduct(1, { name: " ", priceCents: 100 }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(createPage(1, { title: "  " })).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(updateStore(9999, { name: "Missing" })).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(updateProduct(1, 9999, { name: "Missing" })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
