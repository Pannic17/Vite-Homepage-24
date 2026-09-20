import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: !!process.env.CI,
  updateSnapshots: 'none',
  timeout: 30_000,
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4175/Vite-Homepage-24/',
    locale: 'en-US',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { browserName: 'chromium', channel:process.env.PLAYWRIGHT_CHANNEL || undefined, viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-chromium', use: { browserName: 'chromium', channel:process.env.PLAYWRIGHT_CHANNEL || undefined, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 } },
    { name: 'desktop-firefox', testMatch:'cross-browser.spec.js', use:{browserName:'firefox',viewport:{width:1440,height:900}} },
    { name: 'desktop-webkit', testMatch:'cross-browser.spec.js', use:{browserName:'webkit',viewport:{width:1440,height:900}} },
    { name: 'mobile-webkit', testMatch:'cross-browser.spec.js', use:{browserName:'webkit',viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1} },
  ],
  webServer: {
    command: 'node scripts/baseline-server.mjs',
    url: 'http://127.0.0.1:4175/Vite-Homepage-24/',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
