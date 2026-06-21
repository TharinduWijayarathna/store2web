# Multi-tenancy

## Tenant definition

A **tenant** is one business store on Store2Web. It owns:

- Store profile (name, slug, branding)
- Users with admin access (many-to-many via membership)
- Products, categories, media
- Content/detail pages
- Storefront theme settings (future)

The **platform** itself is not a tenant; it is the registration and onboarding surface.

**Superadmins** operate above tenants: they can list and manage all stores via platform routes without store membership. See [Superadmin](./superadmin.md).

## Isolation strategy (recommended)

**Shared database, shared schema, row-level tenant scoping.**

Every tenant-owned table includes a `tenant_id` (or `store_id`) foreign key. All queries filter by that key. Application-layer enforcement in services is mandatory; optional Postgres RLS can be added later for defense in depth.

Alternative (not chosen): database-per-tenant — higher ops cost, unnecessary at current scale.

## Identifying the tenant

### Store admin API

- Authenticated user session includes `userId`.
- Store context from URL (`/api/stores/:storeId/...`) or header.
- Service verifies user is a member of that store before any mutation.

### Superadmin API

- Same auth session; middleware checks `users.platform_role = superadmin`.
- Routes under `/api/superadmin/*` — no tenant membership required.
- Cross-tenant reads/writes only through these routes; mutating actions must write to `admin_audit_logs`.

### Public storefront

Resolve tenant by:

1. **Subdomain** — `{slug}.store2web.com` (preferred long term)
2. **Path prefix** — `store2web.com/s/{slug}` (simpler for local dev)
3. **Custom domain** — future; maps via `store_domains` table

Local dev may use path-based routing until subdomain routing is configured.

## Slugs

- Unique globally across all stores
- URL-safe: lowercase, alphanumeric + hyphens
- Immutable or redirect old slug on change (TBD)

## User ↔ store relationship

One user may own or administer **multiple stores** (e.g. agency use case).

```
users ──< store_memberships >── stores (tenants)
```

Roles (initial):

| Role | Capabilities |
|------|--------------|
| `owner` | Full admin, billing (future), delete store |
| `admin` | Manage catalog and pages |
| `viewer` | Read-only (optional, later) |

## Subscription linkage (future)

Each store links to a `subscription` record. Feature flags and limits derive from plan — see [Subscriptions](./subscriptions.md). Core tables should not hard-code plan logic; use a capability/limit service.

## Security checklist

- [ ] Never accept `tenantId` from client without membership check
- [ ] Superadmin access only via `platform_role`, never via store membership alone
- [ ] Public endpoints only expose published, non-sensitive fields
- [ ] Suspended stores must not serve public storefront content
- [ ] Media URLs scoped per tenant bucket prefix or signed URLs
- [ ] Rate limiting per IP on public storefront (later)
