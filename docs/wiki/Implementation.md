# Implementation

## Project Setup

From repository root:

```bash
cp .env.example .env
npm install
npm --prefix packages/sdk install
npm --prefix apps/backend install
npm --prefix apps/frontend install
npm --prefix packages/sdk run build
```

Run local development:

```bash
npm run dev:backend
npm run dev:frontend
```

## Folder Structure (Key Directories)

- `apps/frontend/`: SvelteKit UI application
- `apps/backend/`: Express API server
- `packages/sdk/`: shared wallet/blockchain integration utilities
- `contracts/`: ErgoScript contracts and related artifacts
- `infra/`: deployment and containerization assets
- `docs/wiki/`: technical and project wiki pages

## Backend Implementation Pattern

The backend uses a layered structure:

- **routes**: endpoint mapping (`src/routes/index.ts`)
- **controllers**: HTTP concerns and response emission
- **services**: business logic and aggregation
- **repositories**: persistence/query logic

Example route pattern:

- `GET /api/campaigns`
- `GET /api/campaigns/:slug`
- `GET /api/analytics/summary`
- `GET /api/analytics`
- `POST /api/referrals/validate`

## Frontend Implementation Pattern

Frontend routes are under `apps/frontend/src/routes` and follow SvelteKit conventions:

- page-level `onMount` data loading
- explicit `loading`, `error`, and success states
- reusable components in `src/lib/components`
- theme and wallet state in `src/lib/*` and `src/lib/stores/*`

## Key Implementation Details

- centralized API helper (`src/lib/api.ts`) for URL, fetch, and error normalization
- chart components for analytics (`ChartBar`) and token rows (`TokenBar`)
- CSS variable based design system in route-level layout styles
- responsive dashboard sections for stats, time-series, distribution, and top campaigns

## Representative Snippets (Conceptual)

### Controller-Service pattern

- controller method receives request
- calls service method
- returns `res.json(data)`
- errors flow through async/error middleware

### Frontend data pattern

- set `loading = true`
- fetch API data in `onMount`
- set `error` on failures
- render responsive cards/charts from typed payload

## Deployment-Oriented Implementation

- SvelteKit adapter selected by environment (`NETLIFY`/`VERCEL`/default node)
- SSR hosting config maintained via platform-specific files
- API host and frontend host connected through `PUBLIC_API_URL` and CORS configuration
