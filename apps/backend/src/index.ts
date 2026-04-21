import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { loadEnv } from './config/env.js';
import { createApp } from './app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Monorepo root `.env` (npm run dev:backend uses cwd apps/backend; dotenv would miss it otherwise).
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const env = loadEnv(process.env);
const { app } = createApp(env);

app.listen(env.PORT, () => {
  console.log(`backend listening on :${env.PORT}`);
});
