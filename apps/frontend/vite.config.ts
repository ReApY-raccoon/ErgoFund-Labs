import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Match backend `PORT` in monorepo root `.env` (Vite cwd is `apps/frontend`). */
function backendPortFromRootEnv(): string {
  const envPath = path.resolve(__dirname, '../../.env');
  try {
    const raw = fs.readFileSync(envPath, 'utf8');
    const line = raw.split(/\r?\n/).find((l) => /^\s*PORT\s*=/.test(l));
    if (line) {
      const v = line.replace(/^\s*PORT\s*=\s*/, '').trim();
      if (v) return v;
    }
  } catch {
    /* no root .env */
  }
  return '8080';
}

const apiTarget = `http://127.0.0.1:${backendPortFromRootEnv()}`;

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173,
    proxy: {
      '/api': apiTarget,
      '/health': apiTarget
    }
  }
});
