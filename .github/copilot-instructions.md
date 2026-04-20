# Project Guidelines

## Architecture
- Use a service-layer design: controllers/routes stay thin, services own business logic, repositories/DAOs handle data access.
- Keep cross-layer boundaries explicit (no DB logic in controllers, no HTTP details in services).

## Database & Migrations
- Review existing migrations before creating new ones to avoid conflicts and ordering issues.
- Prefer additive, backward-compatible migrations; document breaking changes in docs.

## Environment
- Use the Docker environment (docker-compose) for dev, build, and test workflows whenever possible.

## Type Safety
- Keep TypeScript strict: avoid `any`, define clear types/interfaces, and validate external inputs.
- Maintain typed contracts end-to-end (API, services, and React components).

## Code Style (TS/Node/React)
- Keep functions small, focused, and easy to understand; avoid deep nesting and unnecessary abstraction.
- Node: prefer async/await with explicit error handling; don’t swallow errors.
- React: functional components + hooks; keep components single-purpose and extract shared logic into hooks/services.

## Documentation
- Document changes by adding/updating sectioned markdown files under the root `docs/` folder.
- Organize docs by topic (e.g., architecture, API, database, migrations, frontend, backend).
