# Project status

Living checklist for Store2Web. Update this file whenever work starts, completes, or scope changes.

**Last updated:** 2026-06-22

## Legend

| Status | Meaning |
|--------|---------|
| Done | Implemented and usable in dev |
| In progress | Actively being worked on |
| Planned | Agreed scope, not started |
| Waiting | Blocked on decision or dependency |
| Deferred | Explicitly out of current phase |
| Partial | Documented but only partly implemented |

---

## Documentation vs code

See **[implementation-audit.md](./implementation-audit.md)** for the full cross-check.

**Verdict:** Core MVP (auth, stores, catalog APIs, public read API, superadmin phase 1, basic UI) is largely in place. Full doc scope is **not** 100% implemented — subscriptions, media/S3 uploads, full superadmin, storefront detail pages, and several CRUD gaps remain by design or omission.

---

## Foundation

| Item | Status | Notes |
|------|--------|-------|
| Monorepo layout (backend + frontend) | Done | Express + Vite |
| Docker Compose dev stack | Done | Postgres, MinIO, hot reload |
| Backend health endpoint | Done | `GET /api/health` |
| Drizzle ORM + Postgres connection | Done | |
| MinIO bucket bootstrap | Done | `store2web` bucket via compose |
| CI workflow | Done | Build, lint, backend tests + coverage |
| Project documentation (`docs/`) | Done | |
| Implementation audit doc | Done | [implementation-audit.md](./implementation-audit.md) |
| Cursor rules (docs + testing) | Done | `.cursor/rules/project-docs.mdc`, `testing.mdc` |
| Schema migration to stores model | Done | `0001_platform_stores_schema` |

---

## Auth & platform users

| Item | Status | Notes |
|------|--------|-------|
| Password hashing & user registration API | Done | `POST /api/auth/register` |
| Login / logout / JWT cookie session | Done | httpOnly cookie `s2w_token` |
| `GET /api/me` current user | Done | Includes user's stores |
| Platform register UI | Done | `/register` |
| Platform login UI | Done | `/login` |
| Platform home / dashboard / create store UI | Done | `/`, `/dashboard`, `/stores/new` |
| Pricing page | Planned | Deferred with subscriptions |
| Zod input validation (auth) | Done | |

---

## Multi-tenancy & stores

| Item | Status | Notes |
|------|--------|-------|
| `stores` table + migrations | Done | slug, name, status, soft delete |
| `store_memberships` table | Done | user ↔ store roles |
| Create / list / get / update store API | Done | Member-only |
| Tenant scoping (`requireStoreMember`) | Done | |
| Store admin UI (products, publish) | Partial | `/stores/:storeId` — no categories/pages UI |
| Subdomain / custom domain routing | Deferred | Path `/s/:slug` for dev |

---

## Superadmin (platform operator)

| Item | Status | Notes |
|------|--------|-------|
| Superadmin documentation | Done | [superadmin.md](./superadmin.md) |
| Platform role + audit log schema | Done | |
| Bootstrap via `SUPERADMIN_EMAIL` | Done | |
| Dashboard + stores list + suspend + soft delete API | Done | |
| Superadmin UI | Partial | `/superadmin` — no store detail/users/audit |
| Users API, audit log API, promote UI | Planned | See [superadmin.md](./superadmin.md) |
| Impersonation, 2FA | Deferred | |

---

## Catalog & content

| Item | Status | Notes |
|------|--------|-------|
| Products API (list/create/update) | Partial | No delete |
| Categories API (list/create) | Partial | No update/delete |
| Pages API (list/create/update) | Partial | No delete |
| Product ↔ category linking | Done | API |
| Product images / S3 upload | Planned | |
| `media_assets` / `product_images` tables | Planned | Not in schema |
| Admin catalog/pages UI | Partial | Products only in store admin |

---

## Storefront (public)

| Item | Status | Notes |
|------|--------|-------|
| Public read API (store, products, categories, pages) | Done | Published only; not paginated |
| Store home UI `/s/:slug` | Done | Product grid |
| Product detail UI | Planned | API exists |
| Content page UI | Planned | API exists |
| Per-store theming UI | Planned | |

---

## Subscriptions & commerce

| Item | Status | Notes |
|------|--------|-------|
| Plans / Stripe / checkout | Waiting or Deferred | Per [subscriptions.md](./subscriptions.md) |

---

## Testing & quality

| Item | Status | Notes |
|------|--------|-------|
| Backend test suite (Vitest + Supertest) | Done | 49 tests |
| Backend coverage CI gates | Done | Target 100%; CI mins: lines 99%, branches 88%, funcs 100%, stmts 97% |
| Frontend tests | Planned | Rule in place; not started |
| API validation (Zod) | Partial | Auth, stores, products, pages, superadmin |
| Structured API errors | Done | `AppError` + Zod |

---

## Suggested next steps

1. Close doc/implementation gaps (product detail UI, categories/pages admin, superadmin users)
2. Raise branch coverage toward 100%
3. Add frontend tests per `.cursor/rules/testing.mdc`
4. S3 image uploads
5. Subscriptions (after business decisions)

---

## Decision log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-22 | Shared DB, row-level tenant isolation | Simple ops for SMB scale |
| 2026-06-22 | JWT in httpOnly cookie | Works with credentialed fetch |
| 2026-06-22 | Stores/memberships model | Align code with docs |
| 2026-06-22 | Mandatory tests + coverage rule | `.cursor/rules/testing.mdc` |
| 2026-06-22 | `schema.ts` excluded from coverage | Drizzle declarative DSL |
