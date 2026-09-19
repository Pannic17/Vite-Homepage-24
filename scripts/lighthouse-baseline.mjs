import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { startBaselineServer } from './baseline-server.mjs';

const directory = resolve(process.argv.includes('--output') ? process.argv[process.argv.indexOf('--output') + 1] : 'baseline-latest.local');
await mkdir(join(directory, 'lighthouse'), { recursive: true });
// Explicit fresh profiles avoid chrome-launcher's synchronous Windows cleanup
// race. These disposable profiles are ignored by Git and never use user data.
const profiles = resolve('.lighthouse-profiles.local');
await mkdir(profiles, { recursive: true });
const summary = { capturedAt: new Date().toISOString(), conditions: 'Production localhost preview; headless Chromium; Lighthouse default simulated mobile network and CPU throttling; new Chrome profile each run; three cold-cache runs. Lab estimates, not real-user measurements or physical-phone results.', runs: [] };
const { server, url } = await startBaselineServer();
try {
  for (let run = 1; run <= 3; run++) {
    const userDataDir = await mkdtemp(join(profiles, 'run-'));
    const chrome = await launch({ userDataDir, chromePath: process.env.CHROME_PATH || chromium.executablePath(), chromeFlags: ['--headless', '--no-first-run'] });
    try {
      let timeout;
      const result = await Promise.race([
        lighthouse(url, { port: chrome.port, output: ['json', 'html'], onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], logLevel: 'error', maxWaitForLoad: 30_000 }),
        new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error(`Lighthouse run ${run} exceeded 120 seconds`)), 120_000); }),
      ]).finally(() => clearTimeout(timeout));
      await writeFile(join(directory, 'lighthouse', `mobile-${run}.json`), result.report[0]);
      await writeFile(join(directory, 'lighthouse', `mobile-${run}.html`), result.report[1]);
      const lhr = result.lhr;
      if (lhr.runtimeError) throw new Error(`Lighthouse failed: ${lhr.runtimeError.message}`);
      summary.runs.push({ run, lighthouseVersion: lhr.lighthouseVersion, userAgent: lhr.userAgent, settings: lhr.configSettings, environment: lhr.environment, runtimeError: lhr.runtimeError, warnings: lhr.runWarnings, categories: Object.fromEntries(Object.entries(lhr.categories).map(([name, value]) => [name, value.score])), metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'speed-index', 'interactive', 'total-byte-weight'].map(name => [name, { value: lhr.audits[name]?.numericValue, unit: lhr.audits[name]?.numericUnit }])) });
      console.log(`Lighthouse mobile run ${run}: ${JSON.stringify(summary.runs.at(-1).categories)}`);
      await writeFile(join(directory, 'lighthouse-summary.json'), JSON.stringify(summary, null, 2));
    } finally { await chrome.kill(); }
  }
  summary.medians = Object.fromEntries(['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'first-contentful-paint'].map(name => [name, summary.runs.map(run => run.metrics[name].value).filter(Number.isFinite).sort((a,b)=>a-b)[1]]));
  await writeFile(join(directory, 'lighthouse-summary.json'), JSON.stringify(summary, null, 2));
} finally { await new Promise(resolve => server.httpServer.close(resolve)); }
