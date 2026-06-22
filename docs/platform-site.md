# Platform site (Store2Web)

The public **Store2Web** website is where businesses discover the product, register, log in, and create their first store.

Auth uses **JWT in an httpOnly cookie** (`s2w_token`). All listed API routes below are implemented unless noted.

## Pages

| Page | Status | Route |
|------|--------|-------|
| Home | Done | `/` |
| Register | Done | `/register` |
| Login | Done | `/login` |
| Dashboard | Done | `/dashboard` |
| Create store | Done | `/stores/new` |
| Pricing | Planned | Deferred with subscriptions |

## Registration flow

1. User submits name, email, password.
2. API creates `users` row (hashed password).
3. User redirected to dashboard or guided store creation wizard.

## Store creation flow

1. User enters store name → auto-suggest slug.
2. Validate slug uniqueness.
3. Create `stores` row + `store_memberships` with role `owner`.
4. Redirect to store admin.

## UI notes

- Store2Web branded landing and auth flows are implemented.
- Responsive layout for small business owners on mobile.
- Clear separation from tenant storefront styling (platform vs store brand).

## API endpoints

| Method | Path | Status |
|--------|------|--------|
| POST | `/api/auth/register` | Done |
| POST | `/api/auth/login` | Done |
| POST | `/api/auth/logout` | Done |
| GET | `/api/me` | Done |
| POST | `/api/stores` | Done |
| GET | `/api/stores` | Done |
| GET | `/api/stores/:id` | Done |
| PATCH | `/api/stores/:id` | Done |
