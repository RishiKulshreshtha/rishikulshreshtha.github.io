import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: { headless: true },
  webServer: [
    {
      command: 'npm run dev',
      url: 'http://localhost:5173',
      reuseExistingServer: true,
      timeout: 15000,
    },
    {
      // 11ty output is static, so the vite dev server can't serve it
      command: 'npx serve docs -l 4173',
      url: 'http://localhost:4173',
      reuseExistingServer: true,
      timeout: 15000,
    },
  ],
  projects: [
    { name: 'chromium', testIgnore: /blog\.spec\.js/, use: { browserName: 'chromium', baseURL: 'http://localhost:5173' } },
    { name: 'blog', testMatch: /blog\.spec\.js/, use: { browserName: 'chromium', baseURL: 'http://localhost:4173' } },
  ],
});
