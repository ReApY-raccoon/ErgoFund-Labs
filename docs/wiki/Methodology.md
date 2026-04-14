# Methodology

## Development Methodology

The project follows an iterative full-stack methodology:

1. define user-facing requirements (campaigns, referrals, analytics)
2. design API contracts and response shapes
3. implement backend logic (controller -> service -> repository)
4. integrate frontend routes/components against API contracts
5. validate with local smoke tests and deployment checks
6. refine based on runtime observations and contributor feedback

## System Workflow

### 1) User Interaction Layer

- user opens frontend routes in SvelteKit (`/campaigns`, `/campaign/[slug]`, `/analytics`, `/referrals`)
- frontend initializes wallet/theme state and loads page-specific data

### 2) API Communication Layer

- frontend calls backend endpoints via shared API helper pattern
- backend validates requests and delegates to service layer

### 3) Service and Data Layer

- services aggregate and transform data for route-specific responses
- repositories perform persistence and query operations
- typed response structures are returned to controllers

### 4) Blockchain-Aware Layer

- wallet and SDK modules encapsulate Ergo-facing operations
- contract-related assumptions are represented in service and SDK logic
- token operations and contribution flows align with Ergo/eUTXO constraints

## Data Flow (High Level)

1. wallet/user action starts from frontend component
2. frontend requests campaign/referral/analytics API
3. backend service computes or fetches domain data
4. JSON response returned to frontend
5. UI updates loading/error/success state and renders cards/charts/forms

## Algorithmic Patterns

- **Aggregation**: token totals, unique contributor counts, campaign rankings
- **Validation**: referral input and route parameter checks before service calls
- **Error handling**: centralized async handler + error middleware path
- **Mock-to-real progression**: analytics endpoint supports mock payload structure compatible with dashboard UI

## Deployment Method

- environment-based adapter selection for SSR frontend (`NETLIFY`, `VERCEL`)
- API deployment independent from frontend host for scalability
- environment variables used for CORS, API base URL, and database credentials

## Verification Method

- backend type checks and tests
- frontend `svelte-check` and build verification
- API smoke testing through script endpoints and health checks
- deployment smoke checks for SSR routing and API availability
