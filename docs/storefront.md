# Storefront

Each tenant gets a **public storefront** — the customer-facing site for browsing products and reading detail pages.

## Goals

- Fast, readable product listing and detail views
- Support varying catalog structures per business
- Published-only content; draft items never leak
- Mobile-friendly default theme

## URL resolution

See [Multi-tenancy](./multi-tenancy.md). Initial local dev approach:

- Path-based: `/s/:storeSlug/products`, `/s/:storeSlug/pages/:pageSlug`
- Production target: subdomain per store

## Storefront pages (planned)

| Page | Description |
|------|-------------|
| Home | Featured products, store intro |
| Category listing | Products filtered by category |
| Product detail | Images, description, price, metadata-driven attributes |
| Content page | About, Contact, policies, custom pages |
| (Future) Cart / checkout | Not in initial scope |

## Theming (planned)

Phase 1: single shared theme with per-store logo, name, and primary color.

Phase 2: theme presets gated by subscription tier.

Store settings (draft):

```json
{
  "primaryColor": "#2563eb",
  "logoUrl": "...",
  "heroText": "..."
}
```

## Public API endpoints (planned)

Read-only, no auth, tenant resolved from slug/host:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/public/stores/:slug` | Store public profile |
| GET | `/api/public/stores/:slug/products` | Published products (paginated) |
| GET | `/api/public/stores/:slug/products/:productSlug` | Product detail |
| GET | `/api/public/stores/:slug/categories` | Category tree |
| GET | `/api/public/stores/:slug/pages` | Published pages list |
| GET | `/api/public/stores/:slug/pages/:pageSlug` | Page content |

Responses must omit internal IDs where unnecessary and never expose draft/archived records.

## SEO (later)

- Per-product meta title/description
- Open Graph images
- Sitemap generation per store
