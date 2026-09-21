import {test, expect} from '@playwright/test';

test('original portfolio corners, title hover and keyboard focus remain visible', async ({page}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Hover is a mouse enhancement; touch navigation is covered separately.');
  for (const route of ['works','projects']) {
    await page.goto(route);
    await page.locator('img').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    const card = page.locator('.project-card').first();
    const title = card.locator('.s-title');
    await card.scrollIntoViewIfNeeded();
    await page.mouse.move(0,0);
    const cornerWidth = () => card.evaluate(el => parseFloat(getComputedStyle(el,'::after').width));
    await expect.poll(cornerWidth).toBeLessThan(20);
    const normalShadow = await title.evaluate(el => getComputedStyle(el).textShadow);
    await title.hover();
    const width = (await card.boundingBox()).width;
    await expect.poll(cornerWidth).toBeGreaterThan(width - 3);
    expect(await title.evaluate(el => getComputedStyle(el).textShadow)).not.toBe(normalShadow);
    await page.screenshot({path:testInfo.outputPath(route + '-hover.png')});
    const link = page.locator('.project-card .s-title a').first();
    // Some project collections intentionally have no destination links.
    if (await link.count()) {
      // Keep the document open so we can inspect the state after a real mouse click.
      await link.evaluate(el => el.addEventListener('click', event => event.preventDefault(), {once:true,capture:true}));
      await link.click();
      await link.focus();
      await page.mouse.move(0,0);
      const focused = page.locator('.project-card:focus-within');
      await expect(focused).toHaveCount(1);
      await expect.poll(() => focused.evaluate(el => parseFloat(getComputedStyle(el,'::after').width))).toBeLessThan(20);
      expect(await focused.evaluate(el => getComputedStyle(el).outlineStyle)).toBe('none');
      expect(await link.evaluate(el => getComputedStyle(el).outlineStyle)).toBe('none');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');
      await expect(link).toBeFocused();
      expect(await link.evaluate(el => getComputedStyle(el).outlineStyle)).toBe('none');
      await expect.poll(() => focused.evaluate(el => parseFloat(getComputedStyle(el,'::after').width))).toBeLessThan(20);
    }
    if (route === 'projects') {
      const feature = page.locator('.kaiwu');
      await feature.hover();
      await expect.poll(() => feature.evaluate(el => parseFloat(getComputedStyle(el,'::after').width))).toBeGreaterThan((await feature.boundingBox()).width - 3);
      await expect(page.locator('.k-detail')).toHaveAttribute('href','/Vite-Homepage-24/projects/kaiwu');
    }
    await page.mouse.move(0,0);
    await page.evaluate(() => {document.activeElement?.blur();window.scrollTo(0,0);});
    await expect.poll(() => page.locator('.corner-frame').first().evaluate(el => parseFloat(getComputedStyle(el,'::after').width))).toBeLessThan(20);
    await page.screenshot({path:testInfo.outputPath(route + '-restored.png')});
  }
});
