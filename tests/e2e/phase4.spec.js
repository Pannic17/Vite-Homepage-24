import {test, expect} from '@playwright/test';

test('direct content routes never request the home scene or model', async ({page}) => {
  const requests = [];
  page.on('request', request => requests.push(request.url()));
  for (const route of ['about','works','projects','works/gcs']) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
  }
  expect(requests.filter(url => /\/assets\/home-[\w-]+\.js|cat\.gltf/.test(url))).toEqual([]);
});

test('reduced motion paints usable content without WebGL; opt-in and off are persistent', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.addInitScript(() => {
    if (!localStorage.getItem('home-scene-quality')) localStorage.setItem('home-scene-quality','__proto__');
  });
  const modelRequests = [];
  page.on('request', request => {if (request.url().endsWith('cat.gltf')) modelRequests.push(request.url());});
  await page.goto('./');
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','static');
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(modelRequests).toHaveLength(0);
  await page.getByRole('button',{name:'Enable animation',exact:true}).click();
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','ready');
  await page.getByRole('button',{name:'Disable animation',exact:true}).click();
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.reload();
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','static');
  expect(modelRequests).toHaveLength(1);
});

test('pending scene module cannot mount after navigating away', async ({page}) => {
  let release;
  const gate = new Promise(resolve => {release = resolve;});
  let waiting = false;
  await page.route(/\/assets\/home-[\w-]+\.js/, async route => {
    waiting = true;
    await gate;
    await route.continue().catch(() => {});
  });
  await page.goto('./');
  await expect.poll(() => waiting).toBe(true);
  await page.getByRole('link',{name:'WORKS',exact:true}).click();
  release();
  await page.waitForTimeout(250);
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('background stops frames and foreground resumes; DPR obeys quality cap', async ({page}) => {
  await page.addInitScript(() => {
    let hidden = false;
    Object.defineProperty(document,'hidden',{get:() => hidden});
    window.setHidden = value => {hidden=value; document.dispatchEvent(new Event('visibilitychange'));};
    const request = requestAnimationFrame;
    window.frameCount = 0;
    window.requestAnimationFrame = callback => request(time => {window.frameCount++; callback(time);});
  });
  await page.goto('./');
  await page.getByLabel('Animation',{exact:true}).selectOption('low');
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','ready');
  const ratio = await page.locator('canvas').evaluate(el => el.width / el.clientWidth);
  expect(ratio).toBeLessThanOrEqual(.75);
  await page.evaluate(() => window.setHidden(true));
  const stopped = await page.evaluate(() => window.frameCount);
  await page.waitForTimeout(250);
  expect(await page.evaluate(() => window.frameCount)).toBe(stopped);
  await page.evaluate(() => window.setHidden(false));
  await expect.poll(() => page.evaluate(() => window.frameCount)).toBeGreaterThan(stopped);
});

test('responsive covers use WebP and defer offscreen images with original fallback', async ({page}) => {
  await page.goto('works');
  const images = page.locator('.s-cover');
  await expect(images.first()).toHaveAttribute('loading','eager');
  await expect(images.last()).toHaveAttribute('loading','lazy');
  await expect.poll(() => images.first().evaluate(el => el.currentSrc)).toContain('.webp');
  await images.last().scrollIntoViewIfNeeded();
  await expect.poll(() => images.last().evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  await page.locator('picture source').evaluateAll(sources => sources.forEach(source => source.remove()));
  await expect.poll(() => images.last().evaluate(el => el.currentSrc)).toContain('ABP-Cover.png');
  await expect.poll(() => images.last().evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
});

test('picture sources do not occupy grid cells or change the original composition', async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('works');
  const cover = await page.locator('.s-cover').first().boundingBox();
  const copy = await page.locator('.card-content').first().boundingBox();
  expect(cover.x).toBeLessThan(copy.x);
  expect(Math.abs(cover.y - copy.y)).toBeLessThan(1);
  expect(cover.width).toBeCloseTo(360,0);
  await page.goto('projects');
  const posters = await page.locator('.posters img').all();
  for (let i=1;i<posters.length;i++) {
    const previous = await posters[i-1].boundingBox();
    const current = await posters[i].boundingBox();
    expect(Math.abs(current.x - previous.x - previous.width)).toBeLessThan(1);
    expect(Math.abs(current.y - previous.y)).toBeLessThan(1);
  }
});

test('sustained slow rendering degrades to static without breaking navigation', async ({page}) => {
  await page.addInitScript(() => {
    localStorage.setItem('home-scene-quality','low');
    const request = requestAnimationFrame;
    // Simulate 10x-longer frame intervals without depending on the test GPU.
    window.requestAnimationFrame = callback => request(time => callback(time * 10));
  });
  await page.goto('./');
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','ready');
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-quality','static', {timeout:10000});
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByRole('link',{name:'WORKS',exact:true}).click();
  await expect(page).toHaveURL(/\/works$/);
});

test('save-data defaults to static and live motion preference changes release the scene', async ({page}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'connection', {value:{saveData:true},configurable:true});
  });
  await page.goto('./');
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','static');
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.evaluate(() => {Object.defineProperty(navigator,'connection',{value:{saveData:false},configurable:true});});
  await page.getByLabel('Animation',{exact:true}).selectOption('low');
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','ready');
  await page.getByLabel('Animation',{exact:true}).selectOption('auto');
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','ready');
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','static');
  await expect(page.locator('canvas')).toHaveCount(0);
});
