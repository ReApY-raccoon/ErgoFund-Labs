# Project layout

```
ErgoFund-Labs/
├── apps/
│   ├── backend/          # Express API, PostgreSQL (campaigns, contributions, referrals)
│   └── frontend/         # SvelteKit UI (Vite, Fleet SDK wallet hooks)
├── packages/sdk/         # Shared TS: token registry, validation, wallet connectors
├── contracts/            # ErgoScript sources (compile → ErgoTree hex in env)
├── docs/
│   ├── API.md            # Canonical HTTP API (mirrored in wiki)
│   └── wiki/             # Source for GitHub Wiki sync
├── infra/
│   ├── docker-compose.yml
│   ├── docker/           # Dockerfiles (backend, frontend)
│   └── fly.backend.toml  # Example Fly.io API deploy
├── scripts/              # test-api.mjs, seeds, helpers
├── netlify.toml          # Netlify monorepo frontend build
├── vercel.json           # Vercel monorepo frontend build
└── render.yaml           # Render API blueprint
```

## Main flows

1. **UI** → `fetch(PUBLIC_API_URL + '/api/...')` or dev proxy to `:8080`.
2. **API** → PostgreSQL for listings and referral rules; on-chain txs built client-side with Fleet SDK when wired.
3. **Contracts** → compiled off-repo; hex in env per network.

Return to [[Home]].
