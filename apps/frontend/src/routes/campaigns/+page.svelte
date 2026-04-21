<script lang="ts">
  import { onMount } from 'svelte';
  import { apiGet, apiPost } from '$lib/api';

  type Campaign = {
    slug: string;
    title: string;
    goal_token: string;
    goal_amount: string;
    raisedByToken: Record<string, string>;
    uniqueContributors: number;
  };

  let loading = $state(true);
  let error = $state<string | null>(null);
  let campaigns = $state<Campaign[]>([]);
  let creating = $state(false);
  let createError = $state<string | null>(null);
  let createSuccess = $state<string | null>(null);
  let form = $state({
    title: '',
    description: '',
    ownerAddress: '',
    goalAmount: '',
    goalToken: 'ERG',
    deadline: ''
  });

  async function loadCampaigns() {
    try {
      const data = await apiGet<{ campaigns: Campaign[] }>('/api/campaigns');
      campaigns = data.campaigns;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load';
    }
  }

  onMount(async () => {
    await loadCampaigns();
    loading = false;
  });

  async function submitCampaign(event: SubmitEvent) {
    event.preventDefault();
    creating = true;
    createError = null;
    createSuccess = null;
    try {
      const payload = {
        ...form,
        deadline: form.deadline ? new Date(form.deadline).toISOString() : ''
      };
      const result = await apiPost<{ campaign: Campaign }>('/api/campaigns', payload);
      createSuccess = `Created campaign "${result.campaign.title}".`;
      form = {
        title: '',
        description: '',
        ownerAddress: '',
        goalAmount: '',
        goalToken: 'ERG',
        deadline: ''
      };
      await loadCampaigns();
    } catch (e) {
      createError = e instanceof Error ? e.message : 'Failed to create campaign';
    } finally {
      creating = false;
    }
  }
</script>

<h1>Campaigns</h1>
<p class="muted">Data from the Node API (PostgreSQL-backed).</p>

<section class="card create-form">
  <h2>Add campaign</h2>
  <form onsubmit={submitCampaign}>
    <label>
      Title
      <input bind:value={form.title} name="title" required minlength="3" maxlength="120" />
    </label>
    <label>
      Description
      <textarea bind:value={form.description} name="description" rows="3" maxlength="2000"></textarea>
    </label>
    <label>
      Owner address
      <input bind:value={form.ownerAddress} name="ownerAddress" required minlength="10" />
    </label>
    <div class="two-col">
      <label>
        Goal amount
        <input bind:value={form.goalAmount} name="goalAmount" required inputmode="numeric" pattern="[0-9]+" />
      </label>
      <label>
        Goal token
        <input bind:value={form.goalToken} name="goalToken" required minlength="2" maxlength="64" />
      </label>
    </div>
    <label>
      Deadline (optional)
      <input bind:value={form.deadline} name="deadline" type="datetime-local" />
    </label>
    <button type="submit" disabled={creating}>{creating ? 'Creating…' : 'Create campaign'}</button>
    {#if createError}
      <p role="alert">{createError}</p>
    {/if}
    {#if createSuccess}
      <p role="status">{createSuccess}</p>
    {/if}
  </form>
</section>

{#if loading}
  <p role="status">Loading campaigns…</p>
{:else if error}
  <p role="alert">{error}</p>
{:else}
  <div class="grid">
    {#each campaigns as c}
      <article class="card">
        <h2><a href={`/campaign/${c.slug}`}>{c.title}</a></h2>
        <p class="muted">Goal: {c.goal_amount} {c.goal_token}</p>
        <p>Contributors: {c.uniqueContributors}</p>
      </article>
    {/each}
  </div>
{/if}

<style>
  .create-form {
    margin: 1rem 0 1.25rem;
  }
  form {
    display: grid;
    gap: 0.75rem;
  }
  label {
    display: grid;
    gap: 0.35rem;
    font-weight: 600;
  }
  input,
  textarea,
  button {
    font: inherit;
    color: inherit;
  }
  input,
  textarea {
    padding: 0.55rem 0.65rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: transparent;
  }
  button {
    width: fit-content;
    padding: 0.5rem 0.9rem;
    border-radius: 8px;
    border: 1px solid var(--border);
    cursor: pointer;
    background: var(--brand);
    color: #041018;
    font-weight: 700;
  }
  .two-col {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
</style>
