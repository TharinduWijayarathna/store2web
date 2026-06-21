# Subscriptions & plans

> **Status: not decided.** Payments and plan enforcement are future work. This document captures intent and placeholders so the data model stays compatible.

## Intent

Store2Web will monetize via **subscription plans**. Different tiers unlock different capabilities or limits (exact rules TBD).

## Example dimensions to gate (candidates)

| Dimension | Free (example) | Pro (example) |
|-----------|----------------|---------------|
| Number of products | 10 | Unlimited |
| Storage for images | 100 MB | 5 GB |
| Custom domain | No | Yes |
| Remove Store2Web branding | No | Yes |
| Staff accounts | 1 | 5 |
| Theme presets | Basic | All |

These are **illustrative only** — product owner has not finalized tiers.

## Implementation approach (when ready)

1. Define `plans` table with `limits` and `features` JSON.
2. Link each `store` to one active `subscription`.
3. Enforce limits in service layer (e.g. before creating product, check count vs plan).
4. Integrate Stripe (or similar) for billing webhooks.
5. Add platform Pricing page wired to checkout.

## What to build now

- Add nullable `plan_id` or default free plan on store creation — optional, can wait until plans exist.
- Avoid hard-coding limits in UI; centralize in a `PlanService` when implemented.
- Do **not** block current development on subscription decisions.

## Open questions

- [ ] Plan names, prices, and billing interval
- [ ] Free tier vs trial-only
- [ ] Per-store vs per-account billing
- [ ] Payment provider (Stripe assumed)
- [ ] Grace period on failed payment

Update this doc and [Project status](./project-status.md) when decisions are made.
