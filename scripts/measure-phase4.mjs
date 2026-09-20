import {readFile, readdir, mkdir, writeFile} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {gzipSync} from 'node:zlib';
import {chromium} from '@playwright/test';
import {startBaselineServer} from './baseline-server.mjs';

const output = resolve(process.argv[2] || 'phase4-latest.local');
await mkdir(output,{recursive:true});
const {server,url} = await startBaselineServer();
const browser = await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL || undefined});
const report = {capturedAt:new Date().toISOString(), browser:browser.version(), chunks:[], routes:[], model:{}};
try {
  for (const name of await readdir('.baseline-dist/assets')) {
    if (!name.endsWith('.js')) continue;
    const bytes = await readFile(join('.baseline-dist/assets',name));
    report.chunks.push({name,bytes:bytes.length,gzip:gzipSync(bytes).length});
  }
  for (const route of ['', 'about','works','projects','works/gcs']) {
    const context = await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce',locale:'en-US'});
    const page = await context.newPage();
    const requests = new Set();
    page.on('request', request => requests.add(request.url()));
    await page.goto(url + route);
    await page.locator('h1').waitFor();
    await page.waitForLoadState('networkidle');
    const js = report.chunks.filter(chunk => [...requests].some(url => url.endsWith('/' + chunk.name)));
    report.routes.push({route:route || '/', mode:'Static (no deferred 3D)', js:js.map(chunk=>chunk.name), gzip:js.reduce((sum,chunk)=>sum+chunk.gzip,0), requests:[...requests]});
    if (['','works','projects'].includes(route)) {
      await page.locator('img').evaluateAll(images => images.forEach(image => {image.loading='eager';}));
      await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
      await page.screenshot({path:join(output,(route || 'home') + '-1440.png'),fullPage:true});
      await page.setViewportSize({width:390,height:844});
      await page.screenshot({path:join(output,(route || 'home') + '-390.png'),fullPage:true});
    }
    await context.close();
  }
  const bytes = await readFile('public/cat.gltf');
  const gltf = JSON.parse(bytes);
  report.model = {bytes:bytes.length,gzip:gzipSync(bytes).length, meshes:gltf.meshes?.length, embeddedBuffers:gltf.buffers?.map(buffer=>({bytes:buffer.byteLength,base64:buffer.uri.startsWith('data:')})), policy:'Original preserved. HTTP gzip estimate only; actual hosting compression is not guaranteed. Draco/meshopt not adopted without decoder/device and visual validation.'};
  const images = JSON.parse(await readFile('src/content/imageVariants.json'));
  report.images = {count:Object.keys(images).length,originalBytes:Object.values(images).reduce((sum,image)=>sum+image.originalBytes,0),largestVariant:Math.max(...Object.values(images).flatMap(image=>image.variants.map(v=>v.bytes))),variants960Bytes:Object.values(images).reduce((sum,image)=>sum+image.variants.at(-1).bytes,0)};
  await writeFile(join(output,'performance.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({routes:report.routes.map(({route,gzip})=>({route,gzip})), model:report.model, images:report.images},null,2));
} finally {await browser.close(); await new Promise(resolve => server.httpServer.close(resolve));}
