import { defineConfig } from '@playwright/test';
import os from 'node:os';
import path from 'node:path';

export default defineConfig({
  testDir: './tests',
  outputDir: path.join(os.tmpdir(), 'playwright-results'),
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'pnpm dlx serve . -p 5173',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
