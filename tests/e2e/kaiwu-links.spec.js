import {test,expect} from '@playwright/test';

test('Kaiwu links stay internal and the bilingual detail-to-viewer flow works',async({page},testInfo)=>{
  for(const language of ['ENGLISH','中文']){
    await page.goto('projects');await page.getByRole('button',{name:language,exact:true}).click();
    await expect(page.locator('.kaiwu-links a')).toHaveCount(1);
    await expect(page.locator('.kaiwu-links .k-label')).toHaveCount(4);
    await page.locator('.k-detail').click();
    await expect(page).toHaveURL(/\/projects\/kaiwu$/);
    await page.getByRole('link',{name:language==='中文'?'查看示例':'View example',exact:true}).click();
    await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
    await page.getByRole('link',{name:language==='中文'?'返回项目':'Back to Projects',exact:true}).click();
    if(language==='中文')await page.screenshot({path:testInfo.outputPath('projects-cn.png'),fullPage:true});
  }
  for(const route of ['', 'about','projects','projects/kaiwu']){
    await page.goto(route||'./');
    const links=await page.locator('a[href]').evaluateAll(items=>items.map(item=>item.href));
    expect(links.filter(href=>{const host=new URL(href).hostname;return host==='kaiwuart.cn'||host.endsWith('.kaiwuart.cn');})).toEqual([]);
    if(route===''||route==='about'){
      const brand=page.getByRole('link',{name:'KaiwuArt',exact:true});
      await expect(brand).not.toHaveAttribute('target','_blank');await brand.click();
      await expect(page).toHaveURL(/\/projects\/kaiwu$/);
    }
  }
});

test('invalid local JSON, missing session and blocked storage show actionable bilingual errors',async({page})=>{
  await page.goto('projects/kaiwu');
  await page.locator('#kaiwu-local').setInputFiles({name:'broken.json',mimeType:'application/json',buffer:Buffer.from('{')});
  await expect(page.getByRole('alert')).toContainText('not valid JSON');
  await page.getByRole('button',{name:'中文',exact:true}).click();
  await expect(page.getByRole('alert')).toContainText('不是有效的 JSON');
  await page.goto('projects/kaiwu/viewer?type=3');
  await expect(page.getByRole('alert')).toContainText('本地配置已丢失');
  await page.addInitScript(()=>Object.defineProperty(window,'sessionStorage',{get(){throw new Error('blocked');}}));
  await page.reload();await expect(page.getByRole('alert')).toContainText('浏览器存储不可用');
});

test('network failure can retry and stalled requests time out',async({page,baseURL})=>{
  const url=new URL('kaiwu/default.json',baseURL).href;
  await page.route(url,route=>route.abort('failed'));
  await page.goto('projects/kaiwu/viewer?type=2&url='+encodeURIComponent(url));
  await expect(page.getByRole('alert')).toContainText('could not be downloaded');
  await page.unroute(url);await page.getByRole('button',{name:'Retry',exact:true}).click();
  await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
  await page.clock.install();
  await page.route(url,()=>new Promise(()=>{}));
  await page.goto('projects/kaiwu/viewer?type=2&url='+encodeURIComponent(url)+'&retry=timeout');
  await page.clock.fastForward(31000);
  await expect(page.getByRole('alert')).toContainText('timed out');
});
