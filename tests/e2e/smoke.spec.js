import { test, expect } from '@playwright/test';

test('home renders and its local images and model are served', async ({ page, request }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'PANNIC', exact: true })).toBeVisible();
  await expect(page.locator('#three-canvas canvas')).toHaveCount(1);
  await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  const model = await request.get('cat.gltf');
  expect(model.ok()).toBe(true);
  expect((await model.json()).asset.version).toBe('2.0');
  expect(errors).toEqual([]);
});

for (const [button, route, heading] of [['ABOUT', 'about', 'ABOUT'], ['WORKS', 'works', 'WORKS'], ['PROJECTS', 'projects', 'PROJECTS']]) {
  test(`home navigation reaches ${route}`, async ({ page }) => {
    await page.goto('./');
    await page.getByRole('link', { name: button, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/${route}$`));
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'HOME', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'PANNIC', exact: true })).toBeVisible();
  });
}

test('language switches the home identity and navigation in both directions', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: '中文', exact: true }).click();
  await expect(page.getByText('潘江昀', { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: '作品', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'ENGLISH', exact: true }).click();
  await expect(page.getByText('Jiangyun Pan', { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: 'WORKS', exact: true })).toBeVisible();
});

test('works and projects images load in the production subpath', async ({ page }) => {
  for (const route of ['works', 'projects']) {
    await page.goto(route);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    }
    await expect.poll(() => page.locator('img').evaluateAll(images => images.length > 0 && images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  }
});
