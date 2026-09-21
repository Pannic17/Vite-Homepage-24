import {test,expect} from '@playwright/test';

test('Kaiwu page stays lightweight and its example survives refresh and navigation',async({page},testInfo)=>{
  const failures=[],requests=[];
  page.on('pageerror',error=>failures.push(error.message));
  page.on('response',response=>{requests.push(response.url());if(response.status()>=400)failures.push(response.url());});
  await page.goto('projects/kaiwu');
  await expect(page.getByRole('heading',{name:'Kaiwu 3D'})).toBeVisible();
  expect(requests.some(url=>/\.gltf|\.hdr|\/assets\/scene-/.test(url))).toBe(false);
  await page.getByRole('link',{name:'View example'}).click();
  await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
  await expect(page.locator('canvas')).toHaveCount(1);
  await page.getByRole('button',{name:'Play',exact:true}).click();
  await expect(page.getByRole('button',{name:'Pause',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Reset',exact:true}).click();
  await page.reload();
  await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:testInfo.outputPath('kaiwu-viewer.png'),fullPage:true});
  await page.getByRole('link',{name:'Model configuration',exact:true}).click();
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.screenshot({path:testInfo.outputPath('kaiwu-home.png'),fullPage:true});
  await page.getByRole('link',{name:'Back to Projects'}).click();
  await expect(page).toHaveURL(/\/projects$/);
  expect(failures).toEqual([]);
});

test('Kaiwu accepts local JSON and exposes invalid query failures',async({page})=>{
  await page.goto('projects/kaiwu');
  await page.locator('#kaiwu-local').setInputFiles({name:'example.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({modelPath:'/model/owl_gltf/1.gltf'}))});
  await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
  await page.reload();
  await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
  await page.goto('projects/kaiwu/viewer?type=unknown');
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
});

test('Kaiwu opens model URLs and resolves relative resources from a remote JSON URL',async({page,baseURL})=>{
  for(const [input,resource] of [['#kaiwu-model','kaiwu/model/owl_gltf/1.gltf'],['#kaiwu-remote','kaiwu/default.json']]){
    await page.goto('projects/kaiwu');
    await page.locator(input).fill(new URL(resource,baseURL).href);
    await page.locator(input).press('Enter');
    await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
  }
});
