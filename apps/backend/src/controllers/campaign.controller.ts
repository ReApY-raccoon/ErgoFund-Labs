import type { Request, Response } from 'express';
import { z } from 'zod';
import type { CampaignService } from '../services/campaign.service.js';
import { asyncHandler } from '../utils/async-handler.js';

const createCampaignSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().max(2000).optional().or(z.literal('')),
  ownerAddress: z.string().trim().min(10).max(200),
  goalAmount: z.string().regex(/^\d+$/, 'Goal amount must be a positive integer'),
  goalToken: z.string().trim().min(2).max(64),
  deadline: z.string().datetime().optional().or(z.literal(''))
});

export function createCampaignController(service: CampaignService) {
  return {
    list: asyncHandler(async (_req: Request, res: Response) => {
      const data = await service.list();
      res.json({ campaigns: data });
    }),
    get: asyncHandler(async (req: Request, res: Response) => {
      const raw = req.params['slug'];
      const slug = Array.isArray(raw) ? raw[0] : raw;
      if (!slug) {
        res.status(400).json({ error: 'Missing slug' });
        return;
      }
      const data = await service.getBySlug(slug);
      if (!data) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json({ campaign: data });
    }),
    create: asyncHandler(async (req: Request, res: Response) => {
      const parsed = createCampaignSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: 'Validation', details: parsed.error.flatten() });
        return;
      }
      const payload = parsed.data;
      const data = await service.create({
        title: payload.title,
        description: payload.description ? payload.description : null,
        ownerAddress: payload.ownerAddress,
        goalAmount: payload.goalAmount,
        goalToken: payload.goalToken,
        deadline: payload.deadline ? payload.deadline : null
      });
      res.status(201).json({ campaign: data });
    })
  };
}
