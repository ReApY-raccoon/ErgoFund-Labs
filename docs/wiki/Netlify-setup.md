# Netlify setup (team dashboard)

Deploy the **SvelteKit frontend** from this monorepo using your Netlify team:

**Team projects:** [app.netlify.com/teams/aahilmak318/projects](https://app.netlify.com/teams/aahilmak318/projects)

## 1. New site from Git

1. Open **Add new site → Import an existing project**.
2. Connect **GitHub** and choose **`Aahilmak786/ErgoFund-Labs`**.
3. Netlify should detect settings from **`netlify.toml`** at the **repository root** (do not set “base directory” to `apps/frontend` unless you move the config).

## 2. Build settings (from `netlify.toml`)

| Setting | Value |
| --- | --- |
| **Build command** | *(from file)* `npm --prefix packages/sdk ci && npm --prefix packages/sdk run build && npm --prefix apps/frontend ci && npm --prefix apps/frontend run build` |
| **Publish directory** | `apps/frontend/build` |
| **Node** | 20 (`NODE_VERSION` in `[build.environment]`) |

`NETLIFY=true` is set in `netlify.toml` so the build uses `@sveltejs/adapter-netlify`.

## 3. Environment variables (production)

| Variable | Purpose |
| --- | --- |
| **`PUBLIC_API_URL`** | Full URL of your deployed API (e.g. `https://your-api.onrender.com`). The browser calls this for `/api/...` when set. |

Optional: `PUBLIC_ERGO_EXPLORER_URL`, token IDs—see repo `.env.example`.

## 4. Backend CORS

Set on the API host (Render/Railway/Docker):

- **`CORS_ORIGIN`** = your Netlify site URL, e.g. `https://<site>.netlify.app`  
  (or `*` only for quick demos).

## 5. Verify

1. Open the Netlify **deploy log**—build should finish without errors.
2. Open the site URL—home page loads.
3. With API running and `PUBLIC_API_URL` set, open **Campaigns**; data should load from the API.

## 6. GitHub Actions (optional)

The repo can include **`.github/workflows/netlify-deploy.yml`**. Add repository secrets:

- **`NETLIFY_AUTH_TOKEN`** — from Netlify User settings → Applications → Personal access tokens.
- **`NETLIFY_SITE_ID`** — Site settings → Site details → Site ID.

If secrets are missing, the workflow is skipped so forks do not fail.

## Troubleshooting

- **Empty API data:** Check `PUBLIC_API_URL` (no trailing slash required) and CORS on the backend.
- **Build fails on SDK:** Ensure the build command installs/builds `packages/sdk` before `apps/frontend` (already in `netlify.toml`).

See also [[Working-output-and-smoke-tests]] and [[Deployment]].
