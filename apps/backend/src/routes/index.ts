import { Router } from 'express';
import type { RequestHandler } from 'express';

export interface AppControllers {
  health: { get: RequestHandler };
  campaigns: { list: RequestHandler; get: RequestHandler; create: RequestHandler };
  analytics: { summary: RequestHandler; get: RequestHandler };
  referrals: { validate: RequestHandler };
}

export function buildRouter(ctx: AppControllers): Router {
  const r = Router();
  r.get('/health', ctx.health.get);
  r.get('/api/campaigns', ctx.campaigns.list);
  r.post('/api/campaigns', ctx.campaigns.create);
  r.get('/api/campaigns/:slug', ctx.campaigns.get);
  r.get('/api/analytics', ctx.analytics.get);
  r.get('/api/analytics/summary', ctx.analytics.summary);
  r.post('/api/referrals/validate', ctx.referrals.validate);
  return r;
}
