# Overview

## What is Store2Web?

Store2Web is a SaaS platform for small and mid-scale businesses to launch an e-commerce presence quickly. A business owner registers on the public **Store2Web** site, creates a **store**, adds products and content pages, and gets a **public storefront** customers can browse and (eventually) purchase from.

Each business is a **tenant**. Product catalogs, categories, branding, and detail pages can differ completely from one tenant to another.

## Primary user types

| User | Description |
|------|-------------|
| **Platform visitor** | Browses Store2Web marketing pages; may register |
| **Store owner / admin** | Registers, manages store settings, products, categories, and pages |
| **Superadmin** | Store2Web operator; manages all tenants, users, and platform health — see [Superadmin](./superadmin.md) |
| **Store customer** | Visits a tenant storefront; browses products and detail pages (checkout later) |

## Core user journeys

### 1. Register and create a store

1. Visitor lands on Store2Web (platform site).
2. Registers an account (email/password or future OAuth).
3. Creates a store (name, slug/subdomain, basic settings).
4. Lands in store admin to add products and pages.

### 2. Manage a store

1. Owner logs into admin for their store(s).
2. Creates/edits products, categories, images, and static/detail pages (About, Contact, policies, etc.).
3. Publishes or unpublishes the storefront.

### 3. Browse a storefront

1. Customer visits `{store-slug}.store2web.com` or a custom domain (future).
2. Browses categories and products.
3. Opens product detail and content pages.

### 4. Operate the platform (superadmin)

1. Superadmin logs in with a platform-level role (not tenant membership).
2. Reviews dashboard metrics and recent signups.
3. Manages stores (view, suspend, delete) and users (disable, role changes).
4. Actions are recorded in an audit log.

> Checkout, cart, and payments are out of scope for the initial build unless explicitly prioritized.

## Design principles

1. **Tenant-first** — Every store-owned resource is scoped to a tenant; no cross-tenant data leaks.
2. **Flexible catalogs** — Categories, attributes, and page types vary per business; avoid one-size-fits-all product shapes where possible.
3. **Incremental delivery** — Ship registration → store CRUD → catalog → public storefront before subscriptions and payments.
4. **Subscription-ready** — Model tenants and features so plans can gate limits later without rewriting core tables.

## Out of scope (for now)

- Payment processing and checkout
- Subscription billing and plan enforcement
- Custom domains and SSL automation
- Inventory, shipping, and tax engines
- Mobile native apps

See [Subscriptions](./subscriptions.md) for planned (undecided) plan structure.
