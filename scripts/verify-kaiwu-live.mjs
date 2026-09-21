import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';

const base=process.argv[2]||'https://pannic17.github.io/Vite-Homepage/';
const output=resolve('docs/Phase2/p2-4/2026-09-22');
await mkdir(output,{recursive:true});
const report={checkedAt:new Date().toISOString(),base,routes:[]};
const browser=await chromium.launch();
try{
  const context=await browser.newContext({viewport:{width:1440,height:900},locale:'en-US',reducedMotion:'reduce'});
  for(const route of ['', 'about/','works/','projects/','works/gcs/','projects/kaiwu/','projects/kaiwu/viewer/']){
    const page=await context.newPage();const failures=[];
    page.on('pageerror',error=>failures.push(error.message));
    page.on('response',response=>{if(response.status()>=400)failures.push(response.status()+' '+response.url());});
    const response=await page.goto(new URL(route,base).href,{waitUntil:'networkidle',timeout:60000});
    assert.equal(response.status(),200);
    await page.locator('h1').waitFor();
    const retired=await page.locator('a[href]').evaluateAll(links=>links.filter(link=>/(^|\.)kaiwuart\.cn$/.test(new URL(link.href).hostname)).map(link=>link.href));
    assert.deepEqual(retired,[]);
    if(route==='projects/')assert(new URL(await page.locator('.k-detail').getAttribute('href'),base).pathname.endsWith('/projects/kaiwu'));
    if(route==='projects/kaiwu/viewer/'){
      await page.waitForFunction(()=>document.querySelector('.kaiwu-stage')?.dataset.state==='ready',{},{timeout:60000});
      await page.reload({waitUntil:'networkidle'});
      await page.waitForFunction(()=>document.querySelector('.kaiwu-stage')?.dataset.state==='ready',{},{timeout:60000});
      await page.screenshot({path:join(output,'live-viewer.png'),fullPage:true});
      await page.getByRole('button',{name:'中文',exact:true}).click();
      await page.getByRole('link',{name:'返回项目',exact:true}).click();
      assert.equal(await page.locator('canvas').count(),0);
    }
    assert.deepEqual(failures,[]);
    report.routes.push({route:route||'/',status:response.status(),failures,retiredLinks:retired});
    await page.close();
  }
  const config=await context.request.get(new URL('kaiwu/default.json',base).href);
  assert.equal(config.status(),200);assert.equal((await config.json()).modelPath,'./model/owl_gltf/1.gltf');
  report.defaultConfigStatus=config.status();
  await writeFile(join(output,'live-check.json'),JSON.stringify(report,null,2));
  console.log('Live Pages checks passed: '+report.routes.length+' routes');
}finally{await browser.close();}
