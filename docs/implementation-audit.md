# Implementation audit

Cross-check of documented scope vs code as of **2026-06-22**.  
Use with [project-status.md](./project-status.md) for tracking.

**Summary:** Core platform flows (auth, stores, basic catalog, public API, superadmin phase 1) are implemented. Many doc pages still describe **planned** UI/API items that are not built yet. **No automated tests exist** (0% coverage).

---

## Platform site ([platform-site.md](./platform-site.md))

| Documented | Status | Notes |
|------------|--------|-------|
| Home page | Done | `/` — Store2Web marketing |
| Register | Done | `/register` + `POST /api/auth/register` |
| Login | Done | `/login` + `POST /api/auth/login` |
| Logout | Done | `POST /api/auth/logout` |
| Dashboard (list stores) | Done | `/dashboard` + `GET /api/stores` |
| Create store | Done | `/stores/new` + `POST /api/stores` |
| Pricing page | Planned | Deferred with subscriptions |
| `GET /api/me` | Done | Returns user + stores |
| `GET/PATCH /api/stores/:id` | Done | Member-only |
| JWT httpOnly cookie auth | Done | Was TBD in doc — now implemented |
| Responsive mobile layout | Partial | Basic Tailwind; not fully audited |
| Store admin at `/admin` | Partial | Implemented as `/stores/:storeId` instead |

---

## Multi-tenancy ([multi-tenancy.md](./multi-tenancy.md))

| Documented | Status | Notes |
|------------|--------|-------|
| Row-level `store_id` scoping | Done | Services + `requireStoreMember` |
| `store_memberships` roles | Done | `owner` default; `admin`/`viewer` not enforced yet |
| Path-based storefront `/s/:slug` | Done | |
| Subdomain routing | Deferred | Not implemented |
| Custom domains | Deferred | Not implemented |
| Superadmin cross-tenant API | Done | `/api/superadmin/*` |
| Postgres RLS | Deferred | App-layer only |

---

## Data model ([data-model.md](./data-model.md))

| Table / field | Status | Notes |
|---------------|--------|-------|
| `users` (+ password, platform_role, disabled_at) | Done | |
| `stores` | Done | Includes contact fields, soft delete |
| `store_memberships` | Done | |
| `categories` | Done | No update/delete API |
| `products` | Done | No delete API; no list-by-id |
| `product_categories` | Done | Via create/update product |
| `pages` | Done | No delete API |
| `admin_audit_logs` | Done | Write on superadmin mutations |
| `sessions` / refresh tokens | Not used | JWT cookie instead (doc drift) |
| `product_images` | Planned | Not in schema |
| `media_assets` | Planned | Not in schema |
| `plans` / `subscriptions` | Deferred | |

---

## Catalog & content

| Documented | Status | Notes |
|------------|--------|-------|
| Products list/create/update API | Done | Store-scoped |
| Products delete | Planned | |
| Categories list/create API | Done | |
| Categories update/delete | Planned | |
| Pages list/create/update API | Done | |
| Pages delete | Planned | |
| Product images / S3 upload | Planned | MinIO wired in compose only |
| Category admin UI | Planned | |
| Page editor UI | Planned | |
| Store admin product UI | Partial | Add + list only |

---

## Storefront ([storefront.md](./storefront.md))

| Documented | Status | Notes |
|------------|--------|-------|
| `GET /api/public/stores/:slug` | Done | |
| `GET .../products` | Done | Published only; **not paginated** |
| `GET .../products/:productSlug` | Done | API only |
| `GET .../categories` | Done | |
| `GET .../pages` | Done | |
| `GET .../pages/:pageSlug` | Done | API only |
| Store home UI `/s/:slug` | Done | Product grid |
| Product detail UI | Planned | API exists; no frontend route |
| Category listing UI | Planned | |
| Content/detail page UI | Planned | |
| Per-store theming (logo, primary color) | Planned | `logoUrl` on store; no theme UI |
| Pagination on public products | Planned | |

---

## Superadmin ([superadmin.md](./superadmin.md))

| Documented | Status | Notes |
|------------|--------|-------|
| Phase 1: role, middleware, seed | Done | `SUPERADMIN_EMAIL` bootstrap |
| `GET /api/superadmin/dashboard` | Done | Basic counts only |
| `GET /api/superadmin/stores` | Partial | List + `?q=` search; **no pagination** |
| `GET /api/superadmin/stores/:id` | Planned | Store detail endpoint missing |
| `PATCH .../stores/:id` (status) | Done | Suspend/publish/draft |
| `DELETE .../stores/:id` | Done | Soft delete |
| Superadmin UI `/superadmin` | Partial | Dashboard + suspend; no store detail/users |
| Users list/detail API | Planned | |
| Disable user | Planned | Field exists; no API |
| Promote/demote superadmin | Planned | |
| Audit log list API + UI | Planned | Writes only |
| Impersonation, 2FA, settings | Deferred | |

---

## Subscriptions, commerce, infra

| Area | Status |
|------|--------|
| Subscriptions / Stripe / pricing | Deferred or waiting (per docs) |
| Cart / checkout / orders | Deferred |
| Rate limiting | Deferred |
| Backend tests | **None** |
| Frontend tests | **None** |
| Zod validation | Partial (auth, stores, products, pages, superadmin patch) |

---

## Doc drift to fix

These doc files still say "planned" or outdated facts where code has moved on:

- [data-model.md](./data-model.md) — "Current schema" section is stale
- [platform-site.md](./platform-site.md) — auth marked TBD; several APIs now exist
- [storefront.md](./storefront.md) — public APIs partially implemented (note pagination gap)
- [project-status.md](./project-status.md) — some rows marked Done should be Partial

---

## Verdict

**Documented MVP (auth → stores → catalog → public storefront → superadmin phase 1): largely implemented at API level**, with UI and CRUD gaps. **Full documentation set is not 100% implemented** — subscriptions, media, full superadmin, storefront detail pages, and several CRUD operations remain open by design or omission.

**Testing:** Not started. New rule requires 100% coverage before considering work complete.
