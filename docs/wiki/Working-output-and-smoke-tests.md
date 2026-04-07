# Working output and smoke tests

Expected **working output** when the stack runs correctly (local or deployed).

## 1. Docker Compose (full stack)

From repo root:

```bash
docker compose -f infra/docker-compose.yml up --build
```

**Expected:**

- Postgres healthy, then backend log: `backend listening on :8080`.
- Frontend container serves on port **3000**.

**Health check:**

```bash
curl -s http://localhost:8080/health
```

**Example output:**

```json
{"status":"ok","service":"benefaction-backend"}
```

## 2. Local dev (backend + Vite)

**Terminal A — API**

```bash
npm --prefix apps/backend install
# DATABASE_URL=postgresql://... (see Development-setup)
npm --prefix apps/backend run dev
```

**Terminal B — UI**

```bash
npm --prefix packages/sdk ci && npm --prefix packages/sdk run build
npm --prefix apps/frontend install
npm --prefix apps/frontend run dev
```

Open `http://localhost:5173`. Vite proxies `/api` and `/health` to `127.0.0.1:8080`.

## 3. API smoke script

With backend on `8080` and DB migrated + seeded:

```bash
node scripts/test-api.mjs http://127.0.0.1:8080
```

**Example console output:**

```
health: { status: 'ok', service: 'benefaction-backend' }
campaigns: { campaigns: [ ... ] }
summary: { totalRaisedByToken: { ... }, uniqueContributors: N }
OK
```

## 4. Sample JSON (aligned with `docs/API.md`)

See [[Example-API-output]] for full payloads for:

- `GET /api/campaigns`
- `GET /api/campaigns/:slug`
- `GET /api/analytics/summary`
- `POST /api/referrals/validate`

## 5. Frontend “working” checks

| Check | Pass criteria |
| --- | --- |
| Home | Hero and links render |
| Campaigns | List loads from API (or error if API down) |
| Campaign detail | `/campaign/[slug]` shows goal and raised-by-token |
| Analytics | Summary charts/data from API |
| Referrals | Form posts; self-referral returns policy error |
| Wallet | Nautilus / Ergo Wallet connect (browser extension required) |

## 6. Netlify production

After deploy (see [[Netlify-setup]]):

- Site URL loads the SvelteKit app.
- With `PUBLIC_API_URL` set to a public API, campaigns load without CORS errors.

Return to [[Home]].
