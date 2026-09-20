import {chromium, expect} from '@playwright/test';
import {mkdir, writeFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {startBaselineServer} from './baseline-server.mjs';

const output = resolve(process.argv[2] || 'phase2-latest.local');
await mkdir(output, {recursive:true});
const {server, url} = await startBaselineServer();
let browser;
const results = {capturedAt:new Date().toISOString(), conditions:'Local production preview; live 3D; mobile viewport/touch emulation; no throttling.', captures:[], stress:[]};
try {
  browser = await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL || undefined});
  results.browser = browser.version();
  for (const width of [390,1440]) {
    const context = await browser.newContext({viewport:{width,height:width === 390 ? 844 : 900},isMobile:width === 390,hasTouch:width === 390,locale:'en-US'});
    const page = await context.newPage();
    await page.goto(url);
    await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','ready');
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    // One frame is observational evidence, not a golden image of random animation.
    await page.screenshot({path:join(output,'home-live-' + width + '.png'),fullPage:true});
    results.captures.push({width,state:await page.locator('#three-canvas').getAttribute('data-state')});
    await context.close();
  }
  const page = await browser.newPage({viewport:{width:320,height:568}});
  await page.goto(url + 'works');
  for (const percent of [100,200]) {
    await page.evaluate(percent => {
      document.documentElement.style.fontSize = percent + '%';
      document.querySelector('.s-title').textContent = 'VeryLongUnbrokenProjectTitle'.repeat(8);
      document.querySelector('.s-intro').textContent = 'https://example.com/' + 'long-path-segment'.repeat(20);
    }, percent);
    const widths = await page.evaluate(() => ({viewport:document.documentElement.clientWidth,content:document.documentElement.scrollWidth}));
    expect(widths.content).toBeLessThanOrEqual(widths.viewport + 1);
    results.stress.push({textPercent:percent,...widths});
  }
  await writeFile(join(output,'visual-checks.json'),JSON.stringify(results,null,2));
} finally {
  await browser?.close();
  await new Promise(resolve => server.httpServer.close(resolve));
}
