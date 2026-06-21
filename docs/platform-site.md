# Platform site (Store2Web)

The public **Store2Web** website is where businesses discover the product, register, log in, and create their first store.

## Pages (planned)

| Page | Purpose |
|------|---------|
| Home | Value proposition, features, CTA to register |
| Pricing | Plan comparison (placeholder until subscriptions defined) |
| Register | Create platform account |
| Login | Authenticate store owners |
| Dashboard | List user's stores; create new store |
| Create store | Name, slug, basic settings |

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

- Frontend currently uses the default Vite template — replace with Store2Web branding.
- Responsive layout for small business owners on mobile.
- Clear separation from tenant storefront styling (platform vs store brand).

## API endpoints (planned)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/me` | Current user + stores |
| POST | `/api/stores` | Create store |
| GET | `/api/stores` | List user's stores |
| GET | `/api/stores/:id` | Store details (member only) |
| PATCH | `/api/stores/:id` | Update store settings |

Auth mechanism (session cookie vs JWT) — **TBD** during auth implementation.
