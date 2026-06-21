# Project status

Living checklist for Store2Web. Update this file whenever work starts, completes, or scope changes.

**Last updated:** 2026-06-22 (superadmin docs added)

## Legend

| Status | Meaning |
|--------|---------|
| Done | Implemented and usable in dev |
| In progress | Actively being worked on |
| Planned | Agreed scope, not started |
| Waiting | Blocked on decision or dependency |
| Deferred | Explicitly out of current phase |

---

## Foundation

| Item | Status | Notes |
|------|--------|-------|
| Monorepo layout (backend + frontend) | Done | Express + Vite |
| Docker Compose dev stack | Done | Postgres, MinIO, hot reload |
| Backend health endpoint | Done | `GET /api/health` |
| Drizzle ORM + Postgres connection | Done | |
| MinIO bucket bootstrap | Done | `store2web` bucket via compose |
| CI workflow | Done | `.github/workflows/ci.yml` |
| Project documentation (`docs/`) | Done | Initial architecture & plans |
| Cursor rule for docs + status tracking | Done | `.cursor/rules/project-docs.mdc` |

---

## Auth & platform users

| Item | Status | Notes |
|------|--------|-------|
| Password hashing & user registration API | Planned | Extend `users` table |
| Login / logout / session or JWT | Planned | Mechanism TBD |
| `GET /api/me` current user | Planned | |
| Platform register UI | Planned | Replace Vite starter |
| Platform login UI | Planned | |

---

## Multi-tenancy & stores

| Item | Status | Notes |
|------|--------|-------|
| `stores` table + migrations | Planned | slug, name, status |
| `store_memberships` table | Planned | user ↔ store roles |
| Create store API | Planned | `POST /api/stores` |
| List / update store API | Planned | Member-only |
| Tenant scoping middleware/service helper | Planned | Enforce on all store routes |
| Store creation UI (platform) | Planned | After auth |
| Owner dashboard (list stores) | Planned | |

---

## Superadmin (platform operator)

| Item | Status | Notes |
|------|--------|-------|
| Superadmin documentation | Done | [superadmin.md](./superadmin.md) |
| `users.platform_role` + `disabled_at` fields | Planned | `user` \| `superadmin` |
| `admin_audit_logs` table | Planned | All mutating superadmin actions |
| Superadmin auth middleware | Planned | `/api/superadmin/*` guard |
| Bootstrap first superadmin (seed/env) | Planned | No public self-promotion |
| Superadmin stores list + detail API | Planned | Search, filter, paginate |
| Suspend / unsuspend store | Planned | Hides public storefront |
| Superadmin users list + detail API | Planned | |
| Disable user account | Planned | Blocks platform login |
| Promote/demote superadmin role | Planned | Superadmin-only |
| Audit log API + UI | Planned | |
| Superadmin dashboard metrics | Planned | Store/user counts |
| Superadmin console UI | Planned | Distinct from store admin |
| Store delete (soft) | Planned | |
| Impersonation | Deferred | High audit bar |
| Superadmin 2FA | Deferred | Before production |

---

## Catalog

| Item | Status | Notes |
|------|--------|-------|
| Categories CRUD | Planned | Tree optional |
| Products CRUD | Planned | jsonb metadata for flexible attrs |
| Product ↔ category linking | Planned | |
| Product images (S3 upload) | Planned | Presigned URLs |
| Admin catalog UI | Planned | |

---

## Content pages

| Item | Status | Notes |
|------|--------|-------|
| Pages table + CRUD API | Planned | About, Contact, custom |
| Admin page editor UI | Planned | Markdown or rich text TBD |
| Publish / draft workflow | Planned | |

---

## Storefront (public)

| Item | Status | Notes |
|------|--------|-------|
| Public store API (read-only) | Planned | Published content only |
| Store home page UI | Planned | Path-based slug first |
| Product listing & detail UI | Planned | |
| Content/detail page rendering | Planned | |
| Subdomain tenant routing | Deferred | Use `/s/:slug` in dev first |
| Custom domains | Deferred | |

---

## Subscriptions & billing

| Item | Status | Notes |
|------|--------|-------|
| Plan definitions | Waiting | Business decision pending — see [subscriptions.md](./subscriptions.md) |
| Stripe integration | Deferred | After plans decided |
| Feature/limit enforcement | Deferred | |
| Platform pricing page | Deferred | Placeholder only until plans exist |

---

## Commerce (cart & checkout)

| Item | Status | Notes |
|------|--------|-------|
| Shopping cart | Deferred | Not in initial scope |
| Checkout & payments | Deferred | Not in initial scope |
| Orders & fulfillment | Deferred | |

---

## Infrastructure & quality

| Item | Status | Notes |
|------|--------|-------|
| API input validation (Zod) | Planned | |
| Structured API error types | Planned | Error handler exists |
| Backend tests | Planned | None yet |
| Frontend tests | Planned | None yet |
| Rate limiting (public API) | Deferred | |
| Postgres RLS (optional) | Deferred | App-layer first |

---

## Suggested implementation order

1. Auth (register, login, me)
2. Stores + memberships + tenant guard
3. Products, categories, media upload
4. Content pages
5. Public storefront read APIs + UI
6. Superadmin phase 1 (role, middleware, stores list, suspend)
7. Superadmin phase 2 (users, audit log, dashboard UI)
8. Subscriptions (after business decisions)
9. Cart/checkout (if prioritized)

---

## Decision log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-22 | Shared DB, row-level tenant isolation | Simple ops for SMB scale |
| 2026-06-22 | Subscriptions deferred | Plans not finalized |
| 2026-06-22 | Flexible product `metadata` jsonb | Catalogs vary per business |
| 2026-06-22 | Path-based storefront routing for dev | Subdomains later |
| 2026-06-22 | Superadmin as platform_role on users | Separate from store_memberships; cross-tenant via `/api/superadmin` |
| 2026-06-22 | Superadmin phased after core tenant flows | Auth + stores first; platform ops in phase 6–7 |
