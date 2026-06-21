import { TENANT_HEADER_NAME } from "../config/env";

const tenantHeaderName = TENANT_HEADER_NAME || "x-tenant-slug";

const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Store2Web API",
    version: "1.0.0",
    description:
      "Tenant-based API for onboarding stores, managing spaces, products, business profiles, and subscriptions.",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local development",
    },
  ],
  tags: [
    { name: "Health" },
    { name: "Auth" },
    { name: "Tenant" },
    { name: "Spaces" },
    { name: "Business" },
    { name: "Products" },
    { name: "Subscriptions" },
  ],
  components: {
    parameters: {
      TenantHeader: {
        name: tenantHeaderName,
        in: "header",
        required: true,
        schema: { type: "string" },
        description:
          "Tenant slug used to scope requests. Configure with TENANT_HEADER_NAME or subdomain routing.",
      },
    },
    schemas: {
      Error: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
      Health: {
        type: "object",
        properties: {
          status: { type: "string" },
          uptime: { type: "number" },
          timestamp: { type: "string", format: "date-time" },
        },
      },
      Tenant: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          slug: { type: "string" },
        },
        required: ["id", "name", "slug"],
      },
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          tenantId: { type: "integer" },
          name: { type: "string" },
          email: { type: "string" },
          role: { type: "string" },
        },
        required: ["id", "tenantId", "name", "email", "role"],
      },
      Space: {
        type: "object",
        properties: {
          id: { type: "integer" },
          tenantId: { type: "integer" },
          name: { type: "string" },
          slug: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
        },
        required: ["id", "tenantId", "name", "slug", "createdAt"],
      },
      BusinessProfile: {
        type: "object",
        properties: {
          id: { type: "integer" },
          tenantId: { type: "integer" },
          spaceId: { type: "integer" },
          displayName: { type: "string" },
          description: { type: "string", nullable: true },
          contactEmail: { type: "string", nullable: true },
          phone: { type: "string", nullable: true },
          website: { type: "string", nullable: true },
          address: { type: "string", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "id",
          "tenantId",
          "spaceId",
          "displayName",
          "createdAt",
          "updatedAt",
        ],
      },
      Product: {
        type: "object",
        properties: {
          id: { type: "integer" },
          tenantId: { type: "integer" },
          spaceId: { type: "integer" },
          name: { type: "string" },
          description: { type: "string", nullable: true },
          priceCents: { type: "integer" },
          currency: { type: "string" },
          status: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "id",
          "tenantId",
          "spaceId",
          "name",
          "priceCents",
          "currency",
          "status",
          "createdAt",
          "updatedAt",
        ],
      },
      Subscription: {
        type: "object",
        properties: {
          id: { type: "integer" },
          tenantId: { type: "integer" },
          plan: { type: "string" },
          status: { type: "string" },
          startedAt: { type: "string", format: "date-time" },
          currentPeriodEnd: { type: "string", format: "date-time", nullable: true },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: [
          "id",
          "tenantId",
          "plan",
          "status",
          "startedAt",
          "updatedAt",
        ],
      },
      RegisterPayload: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          tenantName: { type: "string" },
          tenantSlug: { type: "string" },
          spaceName: { type: "string" },
          plan: { type: "string" },
          businessName: { type: "string" },
        },
        required: ["name", "email", "tenantName", "tenantSlug"],
      },
      RegisterResponse: {
        type: "object",
        properties: {
          tenant: { $ref: "#/components/schemas/Tenant" },
          owner: { $ref: "#/components/schemas/User" },
          space: { $ref: "#/components/schemas/Space" },
          subscription: { $ref: "#/components/schemas/Subscription" },
          businessProfile: { $ref: "#/components/schemas/BusinessProfile" },
        },
        required: [
          "tenant",
          "owner",
          "space",
          "subscription",
          "businessProfile",
        ],
      },
      TenantOverview: {
        type: "object",
        properties: {
          tenant: { $ref: "#/components/schemas/Tenant" },
          spaces: {
            type: "array",
            items: { $ref: "#/components/schemas/Space" },
          },
          businessProfile: {
            oneOf: [
              { $ref: "#/components/schemas/BusinessProfile" },
              { type: "null" },
            ],
          },
          subscription: {
            oneOf: [
              { $ref: "#/components/schemas/Subscription" },
              { type: "null" },
            ],
          },
        },
        required: ["tenant", "spaces"],
      },
      SpacesResponse: {
        type: "object",
        properties: {
          spaces: {
            type: "array",
            items: { $ref: "#/components/schemas/Space" },
          },
        },
      },
      ProductsResponse: {
        type: "object",
        properties: {
          products: {
            type: "array",
            items: { $ref: "#/components/schemas/Product" },
          },
        },
      },
      CreateSpacePayload: {
        type: "object",
        properties: {
          name: { type: "string" },
          slug: { type: "string" },
        },
        required: ["name", "slug"],
      },
      CreateProductPayload: {
        type: "object",
        properties: {
          name: { type: "string" },
          priceCents: { type: "integer" },
          currency: { type: "string" },
          status: { type: "string" },
          description: { type: "string" },
          spaceId: { type: "integer" },
        },
        required: ["name", "priceCents"],
      },
      BusinessProfilePayload: {
        type: "object",
        properties: {
          displayName: { type: "string" },
          description: { type: "string" },
          contactEmail: { type: "string" },
          phone: { type: "string" },
          website: { type: "string" },
          address: { type: "string" },
          spaceId: { type: "integer" },
        },
      },
      SubscriptionPayload: {
        type: "object",
        properties: {
          plan: { type: "string" },
          status: { type: "string" },
          currentPeriodEnd: { type: "string", format: "date-time" },
        },
      },
    },
  },
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: {
          "200": {
            description: "Service is healthy",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Health" },
              },
            },
          },
        },
      },
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a tenant and create the initial space",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterPayload" },
            },
          },
        },
        responses: {
          "201": {
            description: "Tenant registered",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RegisterResponse" },
              },
            },
          },
          "400": {
            description: "Invalid payload",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "409": {
            description: "Tenant slug or email already exists",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/tenant": {
      get: {
        tags: ["Tenant"],
        summary: "Get tenant overview",
        parameters: [{ $ref: "#/components/parameters/TenantHeader" }],
        responses: {
          "200": {
            description: "Tenant overview",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/TenantOverview" },
              },
            },
          },
          "400": {
            description: "Missing tenant",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "404": {
            description: "Tenant not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/tenant/spaces": {
      get: {
        tags: ["Spaces"],
        summary: "List spaces",
        parameters: [{ $ref: "#/components/parameters/TenantHeader" }],
        responses: {
          "200": {
            description: "List of spaces",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SpacesResponse" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Spaces"],
        summary: "Create a space",
        parameters: [{ $ref: "#/components/parameters/TenantHeader" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateSpacePayload" },
            },
          },
        },
        responses: {
          "201": {
            description: "Space created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Space" },
              },
            },
          },
          "400": {
            description: "Invalid payload",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/tenant/products": {
      get: {
        tags: ["Products"],
        summary: "List products",
        parameters: [
          { $ref: "#/components/parameters/TenantHeader" },
          {
            name: "spaceId",
            in: "query",
            required: false,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "List of products",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductsResponse" },
              },
            },
          },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Create a product",
        parameters: [{ $ref: "#/components/parameters/TenantHeader" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateProductPayload" },
            },
          },
        },
        responses: {
          "201": {
            description: "Product created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          "400": {
            description: "Invalid payload",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/tenant/business": {
      get: {
        tags: ["Business"],
        summary: "Get business profile",
        parameters: [
          { $ref: "#/components/parameters/TenantHeader" },
          {
            name: "spaceId",
            in: "query",
            required: false,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Business profile",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/BusinessProfile" },
              },
            },
          },
          "404": {
            description: "Business profile not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Business"],
        summary: "Create or update business profile",
        parameters: [{ $ref: "#/components/parameters/TenantHeader" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/BusinessProfilePayload" },
            },
          },
        },
        responses: {
          "200": {
            description: "Business profile updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/BusinessProfile" },
              },
            },
          },
          "201": {
            description: "Business profile created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/BusinessProfile" },
              },
            },
          },
          "400": {
            description: "Invalid payload",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/tenant/subscription": {
      get: {
        tags: ["Subscriptions"],
        summary: "Get subscription",
        parameters: [{ $ref: "#/components/parameters/TenantHeader" }],
        responses: {
          "200": {
            description: "Subscription details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Subscription" },
              },
            },
          },
          "404": {
            description: "Subscription not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Subscriptions"],
        summary: "Update subscription",
        parameters: [{ $ref: "#/components/parameters/TenantHeader" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SubscriptionPayload" },
            },
          },
        },
        responses: {
          "200": {
            description: "Subscription updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Subscription" },
              },
            },
          },
          "400": {
            description: "Invalid payload",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
  },
};

export { openApiSpec };
