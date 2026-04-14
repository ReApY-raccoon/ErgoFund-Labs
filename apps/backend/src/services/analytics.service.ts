import type { ContributionRepository } from '../repositories/contribution.repository.js';

type ContributionPoint = { date: string; amount: number };
type CampaignMetric = { name: string; raised: number; goal: number };

export class AnalyticsService {
  constructor(private readonly contributions: ContributionRepository) {}

  async summary() {
    const byToken = await this.contributions.totalAcrossAll();
    const unique = await this.contributions.countUniqueContributorsGlobal();
    return {
      totalRaisedByToken: Object.fromEntries(byToken.map((x) => [x.token_id, x.total])),
      uniqueContributors: unique
    };
  }

  async dashboard() {
    const today = new Date();
    const contributionsOverTime: ContributionPoint[] = Array.from({ length: 30 }, (_unused, idx) => {
      const current = new Date(today);
      current.setDate(today.getDate() - (29 - idx));

      return {
        date: current.toISOString().slice(0, 10),
        amount: 120 + idx * 8 + ((idx % 6) * 11 + (idx % 3) * 7)
      };
    });

    const topCampaigns: CampaignMetric[] = [
      { name: 'Solar Village Project', raised: 31200, goal: 40000 },
      { name: 'Open Source Education Fund', raised: 27850, goal: 32000 },
      { name: 'Community Water Initiative', raised: 24190, goal: 30000 },
      { name: 'Rural Healthcare Equipment', raised: 19820, goal: 25000 },
      { name: 'Tech Scholarships 2026', raised: 17400, goal: 22000 }
    ];

    return {
      totalCampaigns: 42,
      totalRaisedErg: 125480.75,
      activeContributors: 1892,
      successRate: 78.4,
      contributionsOverTime,
      topCampaigns,
      tokenDistribution: {
        ERG: 72,
        SigUSD: 14,
        APT: 8,
        PFT: 6
      } as Record<string, number>
    };
  }
}
