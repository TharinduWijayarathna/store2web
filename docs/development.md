# Development

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- Docker & Docker Compose (recommended)

## Quick start

```bash
docker compose up --build
```

| Service | URL |
|---------|-----|
| Backend API | http://localhost:3000/api/health |
| Frontend | http://localhost:5173 |
| Postgres | localhost:5432 |
| MinIO | http://localhost:9000 (console :9001) |

## Local without Docker

**Backend:**

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Ensure Postgres is running and `DATABASE_URL` in `backend/.env` is correct.

## Database migrations

```bash
cd backend
npm run db:generate   # after schema changes
npm run db:migrate    # apply migrations
npm run db:studio     # optional Drizzle Studio
```

## Code conventions

Aligned with `.github/copilot-instructions.md`:

- **TypeScript strict** — no `any`; validate external input
- **Layered backend** — routes → controllers → services → DB
- **React** — functional components, hooks for shared logic
- **Docker-first** — prefer compose for dev/test when possible

## Project tracking

- All planned work lives in [Project status](./project-status.md).
- Update status when starting or finishing a feature.
- Cursor agents are configured to read `docs/` and maintain the status file — see `.cursor/rules/project-docs.mdc`.

## CI

GitHub Actions workflow at `.github/workflows/ci.yml` — run backend/frontend checks on push/PR.

## Testing

```bash
# Backend (requires Postgres with `store2web` DB — use Docker Compose)
docker compose run --rm backend sh -c "npm ci && npm run test:coverage"

# Local (if DATABASE_URL points at running Postgres)
cd backend && npm run test:coverage
```

Coverage rules: see `.cursor/rules/testing.mdc`. CI enforces backend minimums; target is 100% on all metrics.

## Adding a feature (checklist)

1. Check [Project status](./project-status.md) for dependencies and mark item **In progress**.
2. Update [Data model](./data-model.md) or other docs if design changes.
3. Implement backend API + migrations first for data features.
4. Implement frontend surfaces.
5. Mark status **Done** and note any follow-ups.
