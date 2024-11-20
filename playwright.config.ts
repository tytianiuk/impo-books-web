import { defineConfig, devices } from '@playwright/test';

import env from '@/lib/env';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.pw.test.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: env.BASE_URL || 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
