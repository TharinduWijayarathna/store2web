# Store2Web API

Tenant-based API for onboarding stores, managing spaces, products, business
profiles, and subscriptions.

## Swagger UI

- UI: `http://localhost:3000/api/docs`
- JSON: `http://localhost:3000/api/docs.json`

## Base URL

`http://localhost:3000/api`

## Tenant isolation

All `/tenant/*` routes require a tenant identifier. By default, send the tenant
slug in the `x-tenant-slug` header (configurable with `TENANT_HEADER_NAME`).
If you use subdomains, set `TENANT_DOMAIN` (for example, `acme.example.com`).

## Environment variables

| Service | Variable | Purpose |
| --- | --- | --- |
| Backend | `CORS_ORIGIN` | Allowed frontend origins (comma-separated or `*`). |
| Backend | `TENANT_HEADER_NAME` | Header name for tenant slug (default: `x-tenant-slug`). |
| Backend | `TENANT_DOMAIN` | Subdomain suffix for tenant routing (optional). |
| Backend | `DEFAULT_TENANT_SLUG` | Fallback tenant slug (optional). |
| Frontend | `VITE_API_BASE_URL` | API base URL for browser calls. |
| Frontend | `VITE_TENANT_HEADER_NAME` | Tenant header name for browser calls. |
| Frontend | `VITE_TENANT_SLUG` | Tenant slug to send from the UI. |

## Endpoint summary

| Method | Path | Description | Tenant required |
| --- | --- | --- | --- |
| GET | `/health` | Health check | No |
| POST | `/auth/register` | Register tenant + owner + space | No |
| GET | `/tenant` | Tenant overview | Yes |
| GET | `/tenant/spaces` | List spaces | Yes |
| POST | `/tenant/spaces` | Create space | Yes |
| GET | `/tenant/products` | List products | Yes |
| POST | `/tenant/products` | Create product | Yes |
| GET | `/tenant/business` | Get business profile | Yes |
| PATCH | `/tenant/business` | Upsert business profile | Yes |
| GET | `/tenant/subscription` | Get subscription | Yes |
| PATCH | `/tenant/subscription` | Update subscription | Yes |

## Example flow

### 1. Register a tenant

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ava Owner",
    "email": "ava@shop.com",
    "tenantName": "Ava Grocery",
    "tenantSlug": "ava-grocery",
    "spaceName": "Main Store",
    "plan": "starter",
    "businessName": "Ava Grocery"
  }'
```

### 2. Get tenant overview

```bash
curl http://localhost:3000/api/tenant \
  -H "x-tenant-slug: ava-grocery"
```

### 3. Update business profile

```bash
curl -X PATCH http://localhost:3000/api/tenant/business \
  -H "Content-Type: application/json" \
  -H "x-tenant-slug: ava-grocery" \
  -d '{
    "displayName": "Ava Grocery",
    "contactEmail": "hello@avagrocery.com",
    "phone": "+1-555-0139",
    "address": "12 Market Street"
  }'
```

### 4. Create a product

```bash
curl -X POST http://localhost:3000/api/tenant/products \
  -H "Content-Type: application/json" \
  -H "x-tenant-slug: ava-grocery" \
  -d '{
    "name": "House Blend Coffee",
    "priceCents": 1299,
    "currency": "USD",
    "status": "active",
    "description": "Freshly roasted, 12oz bag"
  }'
```
