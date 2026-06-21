import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";

import { app } from "../app";
import { db } from "../db";
import { users } from "../db/schema";
import { bootstrapSuperadmin } from "../db/seed";
import { resetDatabase } from "./setup";

const registerUser = (agent: request.SuperAgentTest, suffix: string) =>
  agent.post("/api/auth/register").send({
    name: `User ${suffix}`,
    email: `user-${suffix}@test.com`,
    password: "password123",
  });

describe("Store2Web API", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterEach(async () => {
    await resetDatabase();
  });

  it("returns health, openapi docs, and 404 for unknown routes", async () => {
    const health = await request(app).get("/api/health");
    expect(health.status).toBe(200);
    expect(health.body.status).toBe("ok");

    const docs = await request(app).get("/api/docs.json");
    expect(docs.status).toBe(200);
    expect(docs.body.openapi).toBe("3.0.3");

    const missing = await request(app).get("/api/does-not-exist");
    expect(missing.status).toBe(404);
    expect(missing.body.error).toBe("Not Found");
  });

  it("registers, logs in, returns me, and logs out", async () => {
    const agent = request.agent(app);

    const register = await registerUser(agent, "1");
    expect(register.status).toBe(201);
    expect(register.body.user.email).toBe("user-1@test.com");

    const me = await agent.get("/api/auth/me");
    expect(me.status).toBe(200);
    expect(me.body.stores).toEqual([]);

    await agent.post("/api/auth/logout");
    const unauthorized = await agent.get("/api/auth/me");
    expect(unauthorized.status).toBe(401);

    const login = await agent.post("/api/auth/login").send({
      email: "user-1@test.com",
      password: "password123",
    });
    expect(login.status).toBe(200);
  });

  it("rejects duplicate registration and invalid login", async () => {
    const agent = request.agent(app);
    await registerUser(agent, "dup");

    const duplicate = await request(app).post("/api/auth/register").send({
      name: "Another",
      email: "user-dup@test.com",
      password: "password123",
    });
    expect(duplicate.status).toBe(409);

    const badLogin = await request(app).post("/api/auth/login").send({
      email: "user-dup@test.com",
      password: "wrong-password",
    });
    expect(badLogin.status).toBe(401);
  });

  it("rejects disabled users and invalid sessions", async () => {
    const agent = request.agent(app);
    await registerUser(agent, "disabled");

    await db
      .update(users)
      .set({ disabledAt: new Date() })
      .where(eq(users.email, "user-disabled@test.com"));

    const login = await request(app).post("/api/auth/login").send({
      email: "user-disabled@test.com",
      password: "password123",
    });
    expect(login.status).toBe(403);

    await registerUser(request.agent(app), "disabled2");
    const activeAgent = request.agent(app);
    await activeAgent.post("/api/auth/login").send({
      email: "user-disabled2@test.com",
      password: "password123",
    });
    await db
      .update(users)
      .set({ disabledAt: new Date() })
      .where(eq(users.email, "user-disabled2@test.com"));
    const disabledSession = await activeAgent.get("/api/auth/me");
    expect(disabledSession.status).toBe(403);

    const invalidSession = await request(app)
      .get("/api/auth/me")
      .set("Cookie", "s2w_token=invalid.token.value");
    expect(invalidSession.status).toBe(401);
  });

  it("manages stores, products, categories, and pages for members", async () => {
    const agent = request.agent(app);
    await registerUser(agent, "owner");

    const created = await agent.post("/api/stores").send({
      name: "Bloom Shop",
      slug: "bloom-shop",
      description: "Handmade goods",
    });
    expect(created.status).toBe(201);
    const storeId = created.body.store.id as number;

    const duplicateSlug = await agent.post("/api/stores").send({
      name: "Other",
      slug: "bloom-shop",
    });
    expect(duplicateSlug.status).toBe(409);

    const list = await agent.get("/api/stores");
    expect(list.body.stores).toHaveLength(1);

    const detail = await agent.get(`/api/stores/${storeId}`);
    expect(detail.status).toBe(200);

    const updated = await agent.patch(`/api/stores/${storeId}`).send({
      status: "published",
      logoUrl: "https://example.com/logo.png",
      contactEmail: "shop@example.com",
      phone: "555-0100",
      website: "https://bloom.example.com",
      address: "123 Main St",
    });
    expect(updated.body.store.status).toBe("published");

    const category = await agent.post(`/api/stores/${storeId}/categories`).send({
      name: "Gifts",
    });
    expect(category.status).toBe(201);
    const categoryId = category.body.category.id as number;

    const product = await agent.post(`/api/stores/${storeId}/products`).send({
      name: "Candle",
      priceCents: 2500,
      description: "Scented candle",
      status: "published",
      categoryIds: [categoryId],
      metadata: { scent: "lavender" },
    });
    expect(product.status).toBe(201);
    const productId = product.body.product.id as number;

    const products = await agent.get(`/api/stores/${storeId}/products`);
    expect(products.body.products).toHaveLength(1);

    const patchedProduct = await agent
      .patch(`/api/stores/${storeId}/products/${productId}`)
      .send({ name: "Large Candle", categoryIds: [categoryId] });
    expect(patchedProduct.body.product.name).toBe("Large Candle");

    const page = await agent.post(`/api/stores/${storeId}/pages`).send({
      title: "About Us",
      body: "We make candles.",
      type: "about",
      published: true,
    });
    expect(page.status).toBe(201);
    const pageId = page.body.page.id as number;

    const pages = await agent.get(`/api/stores/${storeId}/pages`);
    expect(pages.body.pages).toHaveLength(1);

    const patchedPage = await agent
      .patch(`/api/stores/${storeId}/pages/${pageId}`)
      .send({ title: "Our Story", published: false });
    expect(patchedPage.body.page.title).toBe("Our Story");

    const categories = await agent.get(`/api/stores/${storeId}/categories`);
    expect(categories.body.categories).toHaveLength(1);
  });

  it("blocks non-members and invalid store ids", async () => {
    const owner = request.agent(app);
    await registerUser(owner, "owner2");
    const store = await owner.post("/api/stores").send({ name: "Private Store" });
    const storeId = store.body.store.id as number;

    const stranger = request.agent(app);
    await registerUser(stranger, "stranger");

    const denied = await stranger.get(`/api/stores/${storeId}`);
    expect(denied.status).toBe(404);

    const badId = await owner.get("/api/stores/not-a-number/products");
    expect(badId.status).toBe(400);
  });

  it("serves public storefront data for published stores only", async () => {
    const agent = request.agent(app);
    await registerUser(agent, "public");
    const store = await agent.post("/api/stores").send({
      name: "Public Shop",
      slug: "public-shop",
    });
    const storeId = store.body.store.id as number;

    await agent.patch(`/api/stores/${storeId}`).send({ status: "published" });
    await agent.post(`/api/stores/${storeId}/products`).send({
      name: "Soap",
      priceCents: 900,
      status: "published",
    });
    await agent.post(`/api/stores/${storeId}/pages`).send({
      title: "Contact",
      body: "Email us",
      published: true,
    });

    const profile = await request(app).get("/api/public/stores/public-shop");
    expect(profile.status).toBe(200);

    const products = await request(app).get(
      "/api/public/stores/public-shop/products",
    );
    expect(products.body.products).toHaveLength(1);

    const productSlug = products.body.products[0].slug as string;
    const product = await request(app).get(
      `/api/public/stores/public-shop/products/${productSlug}`,
    );
    expect(product.status).toBe(200);

    const categories = await request(app).get(
      "/api/public/stores/public-shop/categories",
    );
    expect(categories.status).toBe(200);

    const pages = await request(app).get("/api/public/stores/public-shop/pages");
    expect(pages.body.pages).toHaveLength(1);

    const pageSlug = pages.body.pages[0].slug as string;
    const page = await request(app).get(
      `/api/public/stores/public-shop/pages/${pageSlug}`,
    );
    expect(page.status).toBe(200);

    const draftStore = await request(app).get("/api/public/stores/missing-shop");
    expect(draftStore.status).toBe(404);

    await agent.post(`/api/stores/${storeId}/products`).send({
      name: "Draft Item",
      priceCents: 500,
      status: "draft",
    });
    const draftProduct = await request(app).get(
      `/api/public/stores/public-shop/products/draft-item`,
    );
    expect(draftProduct.status).toBe(404);

    await agent.post(`/api/stores/${storeId}/pages`).send({
      title: "Draft Page",
      body: "hidden",
      published: false,
    });
    const draftPage = await request(app).get(
      "/api/public/stores/public-shop/pages/draft-page",
    );
    expect(draftPage.status).toBe(404);
  });

  it("hides draft and suspended stores from the public API", async () => {
    const agent = request.agent(app);
    await registerUser(agent, "draft");
    const draft = await agent.post("/api/stores").send({
      name: "Draft Shop",
      slug: "draft-shop",
    });
    expect(
      (await request(app).get("/api/public/stores/draft-shop")).status,
    ).toBe(404);
    expect(
      (await request(app).get("/api/public/stores/draft-shop/products")).status,
    ).toBe(404);
    expect(
      (await request(app).get("/api/public/stores/draft-shop/categories")).status,
    ).toBe(404);
    expect(
      (await request(app).get("/api/public/stores/draft-shop/pages")).status,
    ).toBe(404);

    const storeId = draft.body.store.id as number;
    await agent.patch(`/api/stores/${storeId}`).send({ status: "published" });
    await agent.patch(`/api/stores/${storeId}`).send({ status: "suspended" });

    expect(
      (await request(app).get("/api/public/stores/draft-shop")).status,
    ).toBe(404);
  });

  it("returns 404 for unknown public store resources", async () => {
    expect(
      (await request(app).get("/api/public/stores/unknown-shop/products")).status,
    ).toBe(404);
    expect(
      (await request(app).get("/api/public/stores/unknown-shop/products/item")).status,
    ).toBe(404);
    expect(
      (await request(app).get("/api/public/stores/unknown-shop/categories")).status,
    ).toBe(404);
    expect(
      (await request(app).get("/api/public/stores/unknown-shop/pages")).status,
    ).toBe(404);
    expect(
      (await request(app).get("/api/public/stores/unknown-shop/pages/about")).status,
    ).toBe(404);
  });

  it("supports superadmin dashboard, search, suspend, and delete", async () => {
    const owner = request.agent(app);
    await registerUser(owner, "super-owner");
    await owner.post("/api/stores").send({ name: "Managed Shop", slug: "managed" });

    await registerUser(request.agent(app), "admin");
    await db
      .update(users)
      .set({ platformRole: "superadmin" })
      .where(eq(users.email, "user-admin@test.com"));

    const admin = request.agent(app);
    await admin.post("/api/auth/login").send({
      email: "user-admin@test.com",
      password: "password123",
    });

    const dashboard = await admin.get("/api/superadmin/dashboard");
    expect(dashboard.body.stores.total).toBeGreaterThan(0);

    const stores = await admin.get("/api/superadmin/stores?q=Managed");
    expect(stores.body.stores[0].slug).toBe("managed");

    const storeId = stores.body.stores[0].id as number;
    const suspended = await admin
      .patch(`/api/superadmin/stores/${storeId}`)
      .send({ status: "suspended" });
    expect(suspended.body.store.status).toBe("suspended");

    const deleted = await admin.delete(`/api/superadmin/stores/${storeId}`);
    expect(deleted.status).toBe(200);

    const missingUpdate = await admin
      .patch("/api/superadmin/stores/99999")
      .send({ status: "suspended" });
    expect(missingUpdate.status).toBe(404);

    const missingDelete = await admin.delete("/api/superadmin/stores/99999");
    expect(missingDelete.status).toBe(404);
  });

  it("blocks superadmin routes for regular users", async () => {
    const agent = request.agent(app);
    await registerUser(agent, "regular");
    const denied = await agent.get("/api/superadmin/dashboard");
    expect(denied.status).toBe(403);
  });

  it("promotes bootstrap superadmin email on seed", async () => {
    const agent = request.agent(app);
    await registerUser(agent, "bootstrap");
    await db
      .update(users)
      .set({ email: "super@test.com" })
      .where(eq(users.email, "user-bootstrap@test.com"));

    await bootstrapSuperadmin();

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, "super@test.com"))
      .limit(1);
    expect(user.platformRole).toBe("superadmin");
  });

  it("returns not found for missing update targets", async () => {
    const agent = request.agent(app);
    await registerUser(agent, "missing");
    const store = await agent.post("/api/stores").send({ name: "Temp" });
    const storeId = store.body.store.id as number;

    const missingProduct = await agent
      .patch(`/api/stores/${storeId}/products/9999`)
      .send({ name: "Nope" });
    expect(missingProduct.status).toBe(404);

    const missingPage = await agent
      .patch(`/api/stores/${storeId}/pages/9999`)
      .send({ title: "Nope" });
    expect(missingPage.status).toBe(404);
  });

  it("validates auth and store payloads", async () => {
    const badRegister = await request(app).post("/api/auth/register").send({
      name: "",
      email: "not-an-email",
      password: "short",
    });
    expect(badRegister.status).toBe(400);

    const agent = request.agent(app);
    await registerUser(agent, "validate");
    const badStore = await agent.post("/api/stores").send({ name: "" });
    expect(badStore.status).toBe(400);
  });

  it("rejects login for unknown email", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "missing-user@test.com",
      password: "password123",
    });
    expect(response.status).toBe(401);
  });

  it("blocks access to soft-deleted stores", async () => {
    const owner = request.agent(app);
    await registerUser(owner, "deleted-store");
    const created = await owner.post("/api/stores").send({
      name: "Deleted Shop",
      slug: "deleted-shop",
    });
    const storeId = created.body.store.id as number;

    await registerUser(request.agent(app), "admin-delete");
    await db
      .update(users)
      .set({ platformRole: "superadmin" })
      .where(eq(users.email, "user-admin-delete@test.com"));

    const admin = request.agent(app);
    await admin.post("/api/auth/login").send({
      email: "user-admin-delete@test.com",
      password: "password123",
    });
    await admin.delete(`/api/superadmin/stores/${storeId}`);

    const denied = await owner.get(`/api/stores/${storeId}`);
    expect(denied.status).toBe(404);
  });

  it("lists superadmin stores without search query", async () => {
    await registerUser(request.agent(app), "admin-list");
    await db
      .update(users)
      .set({ platformRole: "superadmin" })
      .where(eq(users.email, "user-admin-list@test.com"));

    const admin = request.agent(app);
    await admin.post("/api/auth/login").send({
      email: "user-admin-list@test.com",
      password: "password123",
    });

    const response = await admin.get("/api/superadmin/stores");
    expect(response.status).toBe(200);
  });
});
