# Store2Web

## Requirements
- Node.js 18+ (recommended: latest LTS)
- npm 9+

## Backend (Express + Drizzle)
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API health check: `http://localhost:3000/api/health`

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
