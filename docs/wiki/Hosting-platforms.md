# Hosting platforms

This repo stays on **SvelteKit + Node + PostgreSQL + Ergo tooling**. Below maps common hosts to how **ErgoFund-Labs** uses them (not a stack change).

## 1. Frontend / static and SSR

### Vercel

- **Best for:** Fast global edge, serverless/SSR frameworks.
- **This project:** SvelteKit with `VERCEL=1` → `@sveltejs/adapter-vercel`. See root `vercel.json` and [[Deployment]].
- **Features you use:** GitHub auto-deploy, preview URLs, env vars for `PUBLIC_API_URL`.

### Netlify

- **Best for:** Static sites, SSR with functions, simple CI/CD.
- **This project:** `NETLIFY=true` → `@sveltejs/adapter-netlify`. See root `netlify.toml` and [[Netlify-setup]].
- **Features you use:** Git connect, build logs, HTTPS, branch previews.

## 2. Full-stack / API + database

### Render

- **Best for:** Node APIs, PostgreSQL, Docker, cron.
- **This project:** Backend in `apps/backend`, `render.yaml`, health at `GET /health`.

### Railway

- **Best for:** Quick Node + Postgres wiring.
- **This project:** `apps/backend/railway.toml`, service root `apps/backend`, `DATABASE_URL`.

## 3. Cloud / containers

### Fly.io

- **Best for:** Multi-region containers.
- **This project:** Example `infra/fly.backend.toml` + `infra/docker/Dockerfile.backend` (monorepo root as Docker context).

### DigitalOcean App Platform

- **Best for:** Managed builds from Git or Docker.
- **This project:** Same pattern as Render—deploy `apps/backend` as a Web Service or use the backend Dockerfile from repo root.

## 4. Backend-as-a-service

### Firebase

- **Best for:** Auth, Firestore, static hosting, analytics.
- **This project:** The main app is **SvelteKit SSR + REST API + Postgres**; Firebase is optional for **analytics** or extra static pages, not a replacement for the core API.

## Summary table

| Platform | Role in ErgoFund-Labs |
| --- | --- |
| Vercel | Frontend (adapter-vercel) |
| Netlify | Frontend (adapter-netlify) |
| Render | API + Postgres |
| Railway | API + Postgres |
| Fly.io | API (Docker) |
| DigitalOcean | API (Docker or Node build) |
| Firebase | Optional (hosting/analytics only) |

Return to [[Home]].
