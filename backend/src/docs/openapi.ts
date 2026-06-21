const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Store2Web API",
    version: "1.0.0",
    description:
      "Multi-tenant store platform API — auth, stores, catalog, public storefront, superadmin.",
  },
  servers: [{ url: "http://localhost:3000/api", description: "Local" }],
  tags: [
    { name: "Health" },
    { name: "Auth" },
    { name: "Stores" },
    { name: "Public" },
    { name: "Superadmin" },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: { "200": { description: "OK" } },
      },
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register platform user",
        responses: { "201": { description: "Created" } },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        responses: { "200": { description: "OK" } },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Current user and stores",
        responses: { "200": { description: "OK" } },
      },
    },
    "/stores": {
      get: {
        tags: ["Stores"],
        summary: "List user stores",
        responses: { "200": { description: "OK" } },
      },
      post: {
        tags: ["Stores"],
        summary: "Create store",
        responses: { "201": { description: "Created" } },
      },
    },
    "/public/stores/{slug}": {
      get: {
        tags: ["Public"],
        summary: "Public store profile",
        responses: { "200": { description: "OK" } },
      },
    },
    "/superadmin/dashboard": {
      get: {
        tags: ["Superadmin"],
        summary: "Platform stats",
        responses: { "200": { description: "OK" } },
      },
    },
  },
};

export { openApiSpec };
