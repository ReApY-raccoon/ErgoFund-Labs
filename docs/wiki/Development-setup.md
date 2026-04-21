# Development setup

## Prerequisites

- Node.js **20** (see `.nvmrc`)
- PostgreSQL **16** (local or Docker)

## 1. Environment

```bash
cp .env.example .env
```

Root `.env` should define `DATABASE_URL` (see repo `.env.example`). The backend also reads `apps/backend/.env` if you keep secrets there.

## 2. Database

```bash
psql -U bene -d bene -f apps/backend/db/init.sql
psql -U bene -d bene -f apps/backend/db/02-seed.sql
```

Or use Docker for Postgres only:

```bash
docker compose -f infra/docker-compose.yml up -d db
npm run db:seed
```

Or use `npm run docker:up` and rely on Compose init scripts (first boot only). After that, re-run `npm run db:seed` to reset or refresh seed data.

## 3. Run services

**Terminal A — backend**

```bash
npm run dev:backend
```

Or from the backend package only:

```bash
npm --prefix apps/backend install
npm --prefix apps/backend run dev
```

**Terminal B — frontend**

```bash
npm --prefix packages/sdk install && npm --prefix packages/sdk run build
npm --prefix apps/frontend install
npm --prefix apps/frontend run dev
```

The Vite dev server proxies `/api` and `/health` to `http://127.0.0.1` and the **`PORT`** value in the repo root `.env` (defaults to `8080` if unset).

## 4. Verify

- Open `http://localhost:5173`
- `curl http://localhost:8080/health` (or your `PORT`, e.g. `8081`)

## 5. API smoke script

With the backend running:

```bash
node scripts/test-api.mjs http://127.0.0.1:8080
```

Expected: JSON for `health`, `campaigns`, and `summary`, ending with `OK`.
