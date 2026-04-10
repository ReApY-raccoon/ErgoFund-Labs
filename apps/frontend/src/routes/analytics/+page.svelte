<script lang="ts">
  import { onMount } from 'svelte';
  import { apiGet } from '$lib/api';
  import ChartBar from '$lib/components/ChartBar.svelte';
  import TokenBar from '$lib/components/TokenBar.svelte';

  type Summary = {
    totalRaisedByToken: Record<string, string>;
    uniqueContributors: number;
  };

  let loading = $state(true);
  let error = $state<string | null>(null);
  let summary = $state<Summary | null>(null);

  const apiConfigured = $derived(Boolean(import.meta.env.PUBLIC_API_URL?.trim()));

  onMount(async () => {
    try {
      summary = await apiGet<Summary>('/api/analytics/summary');
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load';
    } finally {
      loading = false;
    }
  });

  const labels = $derived(summary ? Object.keys(summary.totalRaisedByToken) : []);
  const values = $derived(
    summary ? Object.values(summary.totalRaisedByToken).map((v) => Number(v)) : []
  );
</script>

<svelte:head>
  <title>Analytics — BenefactionPlatform-Ergo</title>
</svelte:head>

<div class="page-head">
  <h1>Analytics</h1>
  <p class="muted">Aggregated contributions indexed by the API (demo / development data).</p>
</div>

{#if !apiConfigured}
  <section class="card banner-setup" role="status">
    <h2>Connect the API on Netlify</h2>
    <p>
      Set <strong>PUBLIC_API_URL</strong> to your deployed backend (Render, Railway, etc.) in Netlify
      <strong>Site configuration → Environment variables</strong>. Without it, the browser calls this
      static host for <code>/api/…</code> and gets a 404.
    </p>
    <p class="muted small">
      Example: <code>PUBLIC_API_URL=https://your-api.onrender.com</code> — then set backend
      <code>CORS_ORIGIN</code> to your <code>*.netlify.app</code> URL.
    </p>
  </section>
{/if}

{#if loading}
  <div class="skeleton-grid" aria-busy="true" aria-label="Loading analytics">
    <div class="sk card"></div>
    <div class="sk card"></div>
    <div class="sk card wide"></div>
  </div>
{:else if error}
  <section class="card error-card" role="alert">
    <h2>Could not load analytics</h2>
    <p class="error-text">{error}</p>
  </section>
{:else if summary}
  <div class="analytics-grid">
    <section class="card stat">
      <h2>Overview</h2>
      <p class="stat-value">{summary.uniqueContributors}</p>
      <p class="muted">Unique contributors (indexed in DB)</p>
    </section>
    <section class="card">
      <h2>Token totals</h2>
      <div class="token-list">
        {#each Object.entries(summary.totalRaisedByToken) as [token, amount]}
          <TokenBar label={token} value={amount} />
        {/each}
      </div>
    </section>
    {#if labels.length}
      <section class="card chart-card">
        <h2>Distribution</h2>
        <ChartBar {labels} {values} />
      </section>
    {/if}
  </div>
{/if}

<style>
  .page-head {
    margin-bottom: 1.25rem;
  }
  .page-head h1 {
    margin-bottom: 0.35rem;
  }
  .banner-setup {
    border-left: 4px solid var(--brand);
    margin-bottom: 1.25rem;
  }
  .banner-setup h2 {
    margin-top: 0;
    font-size: 1.05rem;
  }
  .banner-setup code {
    font-size: 0.85rem;
    word-break: break-all;
  }
  .small {
    font-size: 0.88rem;
  }
  .analytics-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
  }
  @media (min-width: 720px) {
    .analytics-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .chart-card {
      grid-column: 1 / -1;
    }
  }
  .stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--brand);
    margin: 0.25rem 0;
  }
  .token-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .error-card {
    border-color: rgba(220, 80, 80, 0.45);
  }
  .error-text {
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 0.95rem;
  }
  .skeleton-grid {
    display: grid;
    gap: 1rem;
  }
  .sk {
    min-height: 100px;
    background: linear-gradient(
      90deg,
      var(--surface) 0%,
      var(--border) 50%,
      var(--surface) 100%
    );
    background-size: 200% 100%;
    animation: pulse 1.2s ease-in-out infinite;
  }
  .sk.wide {
    min-height: 180px;
    grid-column: 1 / -1;
  }
  @keyframes pulse {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
