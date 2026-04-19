# Store2Web

## Requirements
- Node.js 18+ (recommended: latest LTS)
- npm 9+

## Docker (recommended)
```bash
docker compose up --build
```

Services:
1. Backend API: `http://localhost:3000/api/health`
2. Frontend: `http://localhost:5173`
3. Postgres: `localhost:5432`
4. MinIO S3: `http://localhost:9000`
5. MinIO Console: `http://localhost:9001`

## Backend (Express + Drizzle)
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API health check: `http://localhost:3000/api/health`
Note: Ensure Postgres is running and `DATABASE_URL` in `.env` is correct.

### Production
```bash
cd backend
npm run build
npm start
```

### Migrations (optional)
```bash
cd backend
npm run db:generate
npm run db:migrate
```

## Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```

Vite dev server: `http://localhost:5173`
