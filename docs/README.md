# Store2Web Documentation

Store2Web is a multi-tenant platform that lets small and mid-scale businesses register, create an online store, and publish a public storefront with product and detail pages. Subscription plans and payments will gate features later; the core focus now is tenant isolation, store management, and flexible per-business catalogs.

## Document index

| Document | Description |
|----------|-------------|
| [Overview](./overview.md) | Product vision, users, and high-level flows |
| [Architecture](./architecture.md) | System design, stack, and service boundaries |
| [Multi-tenancy](./multi-tenancy.md) | Tenant model, isolation, and routing |
| [Data model](./data-model.md) | Entities, relationships, and schema direction |
| [Platform site](./platform-site.md) | Store2Web public marketing and registration app |
| [Superadmin](./superadmin.md) | Platform operator console — tenants, users, moderation |
| [Storefront](./storefront.md) | Per-tenant customer-facing store sites |
| [Subscriptions](./subscriptions.md) | Plans and billing (future — not yet decided) |
| [Development](./development.md) | Local setup, conventions, and workflows |
| [Implementation audit](./implementation-audit.md) | Documented scope vs code reality |
| [Project status](./project-status.md) | Living checklist of done, in progress, and planned work |

## How to use these docs

- Start with **Overview** and **Architecture** for context.
- Use **Project status** before picking up work — it is the source of truth for what is implemented vs planned.
- When scope or design changes, update the relevant doc **and** `project-status.md` in the same change.
