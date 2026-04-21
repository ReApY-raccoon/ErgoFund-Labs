import type { CampaignRepository } from '../repositories/campaign.repository.js';
import type { ContributionRepository } from '../repositories/contribution.repository.js';

export interface CreateCampaignInput {
  title: string;
  description: string | null;
  ownerAddress: string;
  goalAmount: string;
  goalToken: string;
  deadline: string | null;
}

export class CampaignService {
  constructor(
    private readonly campaigns: CampaignRepository,
    private readonly contributions: ContributionRepository
  ) {}

  async list() {
    const rows = await this.campaigns.findAll();
    const out = [];
    for (const c of rows) {
      const byToken = await this.contributions.sumByCampaign(c.id);
      const unique = await this.contributions.countUniqueWallets(c.id);
      out.push({
        ...c,
        raisedByToken: Object.fromEntries(byToken.map((x) => [x.token_id, x.total])),
        uniqueContributors: unique
      });
    }
    return out;
  }

  async getBySlug(slug: string) {
    const c = await this.campaigns.findBySlug(slug);
    if (!c) return null;
    const byToken = await this.contributions.sumByCampaign(c.id);
    const unique = await this.contributions.countUniqueWallets(c.id);
    return {
      ...c,
      raisedByToken: Object.fromEntries(byToken.map((x) => [x.token_id, x.total])),
      uniqueContributors: unique
    };
  }

  async create(input: CreateCampaignInput) {
    const slug = this.toSlug(input.title);
    const deadline = input.deadline ? new Date(input.deadline) : null;
    if (deadline && Number.isNaN(deadline.getTime())) {
      throw new Error('Validation: invalid deadline');
    }
    const created = await this.campaigns.create({
      slug: await this.ensureUniqueSlug(slug),
      title: input.title,
      description: input.description,
      owner_address: input.ownerAddress,
      goal_amount: input.goalAmount,
      goal_token: input.goalToken,
      deadline
    });
    return { ...created, raisedByToken: {}, uniqueContributors: 0 };
  }

  private toSlug(raw: string): string {
    const slug = raw
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120);
    if (!slug) throw new Error('Validation: title must contain letters or numbers');
    return slug;
  }

  private async ensureUniqueSlug(baseSlug: string): Promise<string> {
    let candidate = baseSlug;
    let suffix = 1;
    while (await this.campaigns.findBySlug(candidate)) {
      candidate = `${baseSlug}-${suffix}`;
      suffix += 1;
    }
    return candidate;
  }
}
