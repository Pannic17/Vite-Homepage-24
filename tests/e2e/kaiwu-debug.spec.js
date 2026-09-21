import {test,expect} from '@playwright/test';

test('debug menus update a paused scene and share playback state',async({page})=>{
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('projects/kaiwu/viewer?debug=1');
  await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
  const debug=page.locator('.kaiwu-debug');
  for(const name of ['Rendering','Environment & lighting','Camera','Orbit controls','Model','Materials','Helpers']){
    await expect(debug.getByRole('button',{name:new RegExp(name+'$')})).toBeVisible();
  }
  const before=await page.locator('canvas').screenshot();
  await debug.getByRole('button',{name:/Model$/}).click();
  const model=debug.locator('.lil-gui').filter({has:page.locator('.title', {hasText:/^Model$/})});
  await model.locator('.controller').filter({has:page.locator('.name',{hasText:/^visible$/})}).locator('input').uncheck();
  await expect(async()=>expect((await page.locator('canvas').screenshot()).equals(before)).toBe(false)).toPass();
  await model.locator('.controller').filter({has:page.locator('.name',{hasText:/^Play$/})}).locator('input').check();
  await expect(page.getByRole('button',{name:'Pause',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Pause',exact:true}).click();
  await expect(model.locator('.controller').filter({has:page.locator('.name',{hasText:/^Play$/})}).locator('input')).not.toBeChecked();
  expect(await debug.evaluate(el=>el.getBoundingClientRect().bottom<=el.parentElement.getBoundingClientRect().bottom)).toBe(true);
  await page.goto('projects/kaiwu/viewer');
  await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
  await expect(debug).toHaveCount(0);
  expect(errors).toEqual([]);
});
