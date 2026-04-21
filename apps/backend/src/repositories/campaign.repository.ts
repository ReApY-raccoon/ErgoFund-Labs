import type pg from 'pg';

export interface CampaignRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  owner_address: string;
  goal_amount: string;
  goal_token: string;
  deadline: Date | null;
  created_at: Date;
}

export interface CreateCampaignInput {
  slug: string;
  title: string;
  description: string | null;
  owner_address: string;
  goal_amount: string;
  goal_token: string;
  deadline: Date | null;
}

export class CampaignRepository {
  constructor(private readonly pool: pg.Pool) {}

  async findAll(): Promise<CampaignRow[]> {
    const { rows } = await this.pool.query<CampaignRow>(
      `SELECT id, slug, title, description, owner_address, goal_amount::text, goal_token, deadline, created_at
       FROM campaigns ORDER BY created_at DESC`
    );
    return rows;
  }

  async findBySlug(slug: string): Promise<CampaignRow | null> {
    const { rows } = await this.pool.query<CampaignRow>(
      `SELECT id, slug, title, description, owner_address, goal_amount::text, goal_token, deadline, created_at
       FROM campaigns WHERE slug = $1`,
      [slug]
    );
    return rows[0] ?? null;
  }

  async findById(id: string): Promise<CampaignRow | null> {
    const { rows } = await this.pool.query<CampaignRow>(
      `SELECT id, slug, title, description, owner_address, goal_amount::text, goal_token, deadline, created_at
       FROM campaigns WHERE id = $1`,
      [id]
    );
    return rows[0] ?? null;
  }

  async create(input: CreateCampaignInput): Promise<CampaignRow> {
    const { rows } = await this.pool.query<CampaignRow>(
      `INSERT INTO campaigns (slug, title, description, owner_address, goal_amount, goal_token, deadline)
       VALUES ($1, $2, $3, $4, $5::bigint, $6, $7)
       RETURNING id, slug, title, description, owner_address, goal_amount::text, goal_token, deadline, created_at`,
      [
        input.slug,
        input.title,
        input.description,
        input.owner_address,
        input.goal_amount,
        input.goal_token,
        input.deadline
      ]
    );
    return rows[0] as CampaignRow;
  }
}
