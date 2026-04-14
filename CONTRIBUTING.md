# Contributing to BenefactionPlatform-Ergo

Thanks for contributing to BenefactionPlatform-Ergo. This repository is a monorepo for the Bene fundraising platform on Ergo, including:

- `apps/frontend`: SvelteKit + TypeScript web app
- `apps/backend`: Node.js/Express + TypeScript API
- `packages/sdk`: shared SDK and wallet integration utilities
- `contracts`: ErgoScript smart contract sources

## 1. Getting Started

### Prerequisites

- Node.js 20+
- npm 9+
- Docker (optional, for local infrastructure)

### Clone and install

```bash
git clone https://github.com/Aahilmak786/ErgoFund-Labs.git
cd ErgoFund-Labs
cp .env.example .env

npm install
npm --prefix packages/sdk install
npm --prefix apps/backend install
npm --prefix apps/frontend install
```

### Initial build

```bash
npm --prefix packages/sdk run build
```

## 2. Branch Naming

Use short, purpose-driven branch names with a prefix:

- `feat/<short-description>` for new features
- `fix/<short-description>` for bug fixes
- `docs/<short-description>` for documentation updates
- `chore/<short-description>` for maintenance and tooling
- `refactor/<short-description>` for code restructuring without behavior change
- `test/<short-description>` for test additions/updates

Examples:

- `feat/analytics-dashboard-api`
- `fix/netlify-ssr-redirect`
- `docs/update-contributing-guide`

## 3. Commit Message Format

Follow Conventional Commits:

```text
type(scope): short summary
```

Common types used in this project:

- `feat`: new functionality
- `fix`: bug fixes
- `docs`: documentation-only changes
- `chore`: maintenance tasks (deps, tooling, config)
- `refactor`: code cleanup without feature/bug behavior changes
- `test`: tests or test tooling updates

Examples:

- `feat(frontend): add platform analytics dashboard cards`
- `fix(backend): add /api/analytics route for dashboard payload`
- `chore(deploy): align netlify base and functions paths`

Keep commits focused, descriptive, and small enough to review easily.

## 4. How to Run Locally

From the repository root:

### Run backend API

```bash
npm run dev:backend
```

Backend runs with TSX watch mode from `apps/backend`.

### Run frontend app

```bash
npm run dev:frontend
```

Frontend runs in SvelteKit/Vite dev mode from `apps/frontend` (default: `http://localhost:5173`).
In development, Vite proxies `/api` requests to backend on `http://127.0.0.1:8080`.

### Useful additional commands

```bash
npm run check              # frontend type/check pipeline
npm run build              # full monorepo build
npm --prefix apps/backend run lint
npm --prefix apps/backend run test
```

## 5. Pull Request Process

1. Create a branch from `main` using the naming conventions above.
2. Implement your change with focused commits following Conventional Commits.
3. Run relevant local checks before opening a PR:
   - frontend check/build for UI changes
   - backend lint/test for API changes
   - SDK build for `packages/sdk` changes
4. Open a PR with:
   - clear problem statement
   - summary of approach
   - test plan (commands and outcomes)
   - screenshots/video for UI changes
5. Ensure CI passes and address review feedback with additional commits.
6. Squash/merge strategy should match repository maintainer preference.

## 6. Code Style

### TypeScript and backend conventions

- Use strict, explicit typing for API contracts and service responses.
- Keep route handlers thin: route -> controller -> service -> repository.
- Prefer shared validation/error-handling patterns already present in `apps/backend/src`.
- Avoid introducing breaking API shape changes without discussing in PR.

### SvelteKit and frontend conventions

- Follow SvelteKit route structure under `apps/frontend/src/routes`.
- Reuse existing UI patterns (`.card`, `.btn`, CSS variables in `layout.css`).
- Keep page logic consistent with existing patterns (`onMount`, loading/error states).
- Place reusable UI in `apps/frontend/src/lib/components` and shared logic in `src/lib`.

### ErgoScript and blockchain-specific conventions

- Keep contract changes isolated and documented in PR descriptions.
- Explain any token economics, wallet behavior, or UTXO flow implications.
- If changing contract-adjacent behavior, update docs in `docs/` or wiki references.

### General

- Prefer small, reviewable PRs over large mixed changes.
- Do not commit secrets, private keys, or production credentials.
- Update documentation when behavior or operational setup changes.
