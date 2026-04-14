# Technologies Used

## Programming Languages

- **TypeScript**: primary language for frontend, backend, and SDK modules
- **JavaScript (ESM)**: runtime/module configuration where needed
- **ErgoScript**: smart contract logic for Ergo blockchain interactions
- **SQL**: persistence and analytics-related data operations (PostgreSQL)

## Frontend Stack (`apps/frontend`)

- **SvelteKit**: application framework and routing (`src/routes`)
- **Vite**: dev server and build tooling
- **Svelte 5 runes**: reactive state and derived values
- **Chart.js**: chart rendering in dashboard components
- **Custom CSS variables**: theme tokens (`--bg`, `--surface`, `--text`, etc.)

## Backend Stack (`apps/backend`)

- **Node.js**: runtime environment
- **Express**: HTTP server and API routing
- **TypeScript**: typed controllers, services, repositories
- **Zod**: input validation schemas
- **pg**: PostgreSQL client for data access
- **helmet / cors / express-rate-limit**: API security middleware

## Blockchain and Smart Contract Tooling

- **Ergo blockchain**: target decentralized network
- **ErgoScript contracts** (`contracts/`)
- **Fleet SDK**: Ergo transaction and wallet integration primitives
- **Wallet integration modules** in `packages/sdk`

## Monorepo and Package Structure

- **npm workspaces/prefix workflow** for multi-package commands
- `apps/` for deployable applications
- `packages/` for shared SDK logic
- `contracts/` for blockchain contract assets
- `infra/` for deployment and containerization assets

## DevOps and Deployment

- **Docker / Docker Compose** for local stack orchestration
- **Netlify / Vercel** for SSR frontend hosting
- **Render / Railway / Fly.io** options for backend deployment
- Environment-driven adapter selection in SvelteKit (`NETLIFY`, `VERCEL`)

## Quality and Developer Tooling

- **TypeScript compiler checks** (`tsc --noEmit`)
- **svelte-check** for frontend diagnostics
- **tsx** for backend TypeScript watch/dev execution
- Project docs/wiki pipeline for operational clarity and onboarding
