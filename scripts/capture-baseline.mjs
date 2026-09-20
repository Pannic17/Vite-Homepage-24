import { chromium } from '@playwright/test';
import { mkdir, writeFile, readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve, relative } from 'node:path';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import { startBaselineServer } from './baseline-server.mjs';

const directory = resolve(process.argv.includes('--output') ? process.argv[process.argv.indexOf('--output') + 1] : 'baseline-latest.local');
await mkdir(join(directory, 'screenshots'), { recursive: true });
const save = (name, value) => writeFile(join(directory, name), JSON.stringify(value, null, 2));
const walk = async directory => (await Promise.all((await readdir(directory, { withFileTypes: true })).map(async entry => entry.isDirectory() ? walk(join(directory, entry.name)) : join(directory, entry.name)))).flat();
const sourceFiles = [...await walk('src'), 'index.html', 'vite.config.js'];
const sourceHash = createHash('sha256');
for (const file of sourceFiles.sort()) sourceHash.update(file.replaceAll('\\', '/')).update(await readFile(file));
const result = {
  capturedAt: new Date().toISOString(),
  head: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  checkpoint: execFileSync('git', ['rev-parse', 'codex/phase-0-checkpoint'], { encoding: 'utf8' }).trim(),
  sourceSha256: sourceHash.digest('hex'),
  environment: { node: process.version, platform: os.platform(), release: os.release(), cpu: os.cpus()[0]?.model, logicalCpus: os.cpus().length, memoryBytes: os.totalmem(), playwright: JSON.parse(await readFile('node_modules/@playwright/test/package.json')).version },
  conditions: 'Production Vite preview; localhost; no network/CPU throttling; fresh browser context per route; deviceScaleFactor=1; headless Chromium. Mobile viewport/touch emulation is not a physical phone. Screenshots are observations, not approved golden images; 3D/random effects remain live.',
  pages: [],
};
let browser;
const { server, url } = await startBaselineServer();
try {
  browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
  result.environment.browser = browser.version();
  result.build = await Promise.all((await walk('.baseline-dist')).map(async path => {
    const data = await readFile(path);
    return { path: relative('.baseline-dist', path).replaceAll('\\', '/'), bytes: data.length, gzipBytes: /\.(js|css|html)$/.test(path) ? gzipSync(data).length : undefined };
  }));
  const profiles = [
    { name: 'desktop', viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false },
    { name: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  ];
  for (const profile of profiles) for (const locale of ['en-US', 'zh-CN']) for (const route of ['', 'works', 'projects', 'test', 'works/gcs', 'about']) {
    const { name, ...options } = profile;
    const context = await browser.newContext({ ...options, locale, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const entry = { profile: name, viewport: profile.viewport, locale, route: '/' + route, errors: [], console: [], failedRequests: [], httpErrors: [] };
    page.on('pageerror', error => entry.errors.push(error.message));
    page.on('console', message => { if (['error', 'warning'].includes(message.type()) && entry.console.length < 40) entry.console.push({ type: message.type(), text: message.text() }); });
    page.on('requestfailed', request => entry.failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
    page.on('response', response => { if (response.status() >= 400) entry.httpErrors.push({ url: response.url(), status: response.status() }); });
    await page.goto(url + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(route === '' ? 1000 : 200);
    await page.evaluate(() => document.fonts.ready);
    entry.dom = await page.evaluate(() => ({
      title: document.title, htmlLang: document.documentElement.lang,
      width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      bodyText: document.body.innerText,
      headings: [...document.querySelectorAll('h1,h2,h3')].map(e => ({ tag: e.tagName, text: e.textContent.trim(), fontSize: getComputedStyle(e).fontSize })),
      images: [...document.images].map(e => ({ src: e.currentSrc, loaded: e.complete && e.naturalWidth > 0, alt: e.getAttribute('alt') })),
      links: [...document.querySelectorAll('a[href]')].map(e => ({ text: e.textContent.trim() || e.querySelector('img')?.alt, href: e.href })),
      canvasCount: document.querySelectorAll('canvas').length,
      clippedText: [...document.querySelectorAll('.s-title,.s-intro,.ph-title')].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => ({ text: e.textContent.trim(), clientWidth: e.clientWidth, scrollWidth: e.scrollWidth, overflow: getComputedStyle(e).overflow })),
      outsideViewport: [...document.querySelectorAll('h1,h2,h3,p,button,.section,.ph-title')].filter(e => { const r=e.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1; }).map(e => ({ tag: e.tagName, class: e.className, text: e.textContent.trim().slice(0,100) })),
      resourceBytes: performance.getEntriesByType('resource').reduce((total, e) => total + e.transferSize, 0),
    }));
    const filename = `${name}-${locale}-${route.replaceAll('/', '-') || 'home'}.png`;
    await page.screenshot({ path: join(directory, 'screenshots', filename), fullPage: true });
    entry.screenshot = 'screenshots/' + filename;
    result.pages.push(entry);
    await context.close();
    console.log(`Captured ${name} ${locale} /${route}`);
  }
  await save('pages.json', result);

  // Isolated instrumentation run. Counters measure API activity, not GPU bytes.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await context.addInitScript(() => {
    const stats = { contextsCreated: 0, drawCalls: 0, pendingRaf: new Set() };
    window.__baseline = stats;
    const originalContext = HTMLCanvasElement.prototype.getContext;
    const seen = new WeakSet();
    HTMLCanvasElement.prototype.getContext = function (...args) {
      const context = originalContext.apply(this, args);
      if (context && /webgl/.test(args[0]) && !seen.has(context)) { seen.add(context); stats.contextsCreated++; }
      return context;
    };
    for (const type of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
      if (!type) continue;
      for (const method of ['drawArrays', 'drawElements']) {
        const original = type.prototype[method];
        type.prototype[method] = function (...args) { stats.drawCalls++; return original.apply(this, args); };
      }
    }
    const request = window.requestAnimationFrame.bind(window);
    const cancel = window.cancelAnimationFrame.bind(window);
    window.requestAnimationFrame = callback => {
      const id = request(time => { stats.pendingRaf.delete(id); callback(time); });
      stats.pendingRaf.add(id);
      return id;
    };
    window.cancelAnimationFrame = id => { stats.pendingRaf.delete(id); cancel(id); };
  });
  const page = await context.newPage();
  const lifecycle = { conditions: '1440x900 headless desktop, no throttling. Instrumented WebGL context creation/draw methods and RAF. CDP forces garbage collection before heap samples; GPU memory not measured.', errors: [], warnings: [], samples: [] };
  page.on('pageerror', e => { if (lifecycle.errors.length < 50) lifecycle.errors.push(e.message); });
  page.on('console', e => { if (['warning', 'error'].includes(e.type()) && lifecycle.warnings.length < 50) lifecycle.warnings.push(e.text()); });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  lifecycle.gpu = await page.evaluate(() => {
    const gl = document.querySelector('canvas')?.getContext('webgl2');
    const ext = gl?.getExtension('WEBGL_debug_renderer_info');
    return ext ? { vendor: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL), renderer: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) } : null;
  });
  lifecycle.frameSample = await page.evaluate(() => new Promise(resolve => {
    const start = performance.now(); let previous = start; let previousDraws = window.__baseline.drawCalls;
    const intervals = []; let renderedFrames = 0;
    function sample(time) {
      intervals.push(time - previous); previous = time;
      if (window.__baseline.drawCalls > previousDraws) renderedFrames++;
      previousDraws = window.__baseline.drawCalls;
      if (time - start < 5000) requestAnimationFrame(sample);
      else resolve({ durationMs: time - start, rafFrames: intervals.length, rafFps: intervals.length * 1000 / (time - start), framesWithDrawCalls: renderedFrames, observedRenderFps: renderedFrames * 1000 / (time - start), p95IntervalMs: intervals.sort((a,b)=>a-b)[Math.floor(intervals.length*0.95)] });
    }
    requestAnimationFrame(sample);
  }));
  const cdp = await context.newCDPSession(page);
  await cdp.send('Performance.enable');
  async function sample(cycle, location) {
    await cdp.send('HeapProfiler.collectGarbage');
    const metrics = Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map(m => [m.name, m.value]));
    const dom = await page.evaluate(() => ({ contextsCreated: window.__baseline.contextsCreated, pendingRaf: window.__baseline.pendingRaf.size, canvases: document.querySelectorAll('canvas').length, guiPanels: document.querySelectorAll('.lil-gui').length, onresize: typeof window.onresize, ondblclick: typeof document.ondblclick }));
    lifecycle.samples.push({ cycle, location, ...dom, JSHeapUsedSize: metrics.JSHeapUsedSize, Nodes: metrics.Nodes, JSEventListeners: metrics.JSEventListeners });
  }
  await sample(0, 'home');
  for (let cycle = 1; cycle <= 20; cycle++) {
    await page.getByRole('link', { name: 'WORKS', exact: true }).click();
    await page.waitForTimeout(100);
    if ([1,5,10,20].includes(cycle)) await sample(cycle, 'works');
    await page.getByRole('link', { name: 'HOME', exact: true }).click();
    await page.waitForTimeout(350);
    if ([1,5,10,20].includes(cycle)) await sample(cycle, 'home');
  }
  await save('lifecycle.json', lifecycle);
  await context.close();

  const urls = [...new Set(result.pages.flatMap(p => p.dom.links.map(link => link.href)).filter(href => /^https?:/.test(href) && !href.startsWith('http://127.0.0.1')))];
  const links = [];
  for (const link of urls) {
    try {
      const response = await fetch(link, { signal: AbortSignal.timeout(12000), redirect: 'follow' });
      links.push({ url: link, status: response.status, finalUrl: response.url, checkedAt: new Date().toISOString(), note: 'HTTP reachability only; no login or interactive validation' });
      await response.body?.cancel();
    } catch (error) { links.push({ url: link, error: error.message, checkedAt: new Date().toISOString(), note: 'Network failure is not proof the destination is unavailable to users' }); }
  }
  await save('external-links.json', links);
  await save('assets.json', await Promise.all((await walk('public')).map(async path => ({ path: path.replaceAll('\\', '/'), bytes: (await stat(path)).size }))));
  console.log(`Baseline evidence: ${directory}`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.httpServer.close(resolve));
}
