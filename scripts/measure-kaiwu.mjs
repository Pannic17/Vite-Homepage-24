import {mkdir,readFile,writeFile,symlink,stat} from 'node:fs/promises';
import {resolve,join,basename} from 'node:path';
import {execFileSync} from 'node:child_process';
import {gzipSync} from 'node:zlib';
import {build,preview} from 'vite';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';

const output=resolve('docs/Phase2/p2-3/2026-09-21');
const scratch=resolve('.kaiwu-measure.local');
await mkdir(output,{recursive:true});await mkdir(scratch,{recursive:true});
const report={date:new Date().toISOString(),baseline:'653fee2b77c258433b0dfb929ed98327ef8c773a',viewerBaseline:'3c9db7f',runs:[],note:'Local headless Chromium, fresh context per run, no network throttling. Timing is diagnostic, not real-device performance. gzip is calculated, not guaranteed host compression.'};
const oldRoot=join(scratch,'before');await mkdir(oldRoot,{recursive:true});
execFileSync('git',['archive','--format=tar','--output='+join(scratch,'before.tar'),report.baseline]);
execFileSync('tar',['-xf',join(scratch,'before.tar'),'-C',oldRoot]);
if(!await stat(join(oldRoot,'node_modules')).catch(()=>null))await symlink(resolve('node_modules'),join(oldRoot,'node_modules'),'junction');
const previousRoot=join(scratch,'previous');await mkdir(previousRoot,{recursive:true});
execFileSync('git',['archive','--format=tar','--output='+join(scratch,'previous.tar'),report.viewerBaseline]);
execFileSync('tar',['-xf',join(scratch,'previous.tar'),'-C',previousRoot]);
if(!await stat(join(previousRoot,'node_modules')).catch(()=>null))await symlink(resolve('node_modules'),join(previousRoot,'node_modules'),'junction');
const browser=await chromium.launch();report.browser=browser.version();
try{
  for(const [version,root] of [['before',oldRoot],['previous',previousRoot],['after',resolve('.')]]){
    const dist=join(scratch,version+'-dist');
    await build({root,configFile:join(root,'vite.config.js'),build:{outDir:dist,emptyOutDir:true}});
    const server=await preview({root,configFile:join(root,'vite.config.js'),build:{outDir:dist},preview:{host:'127.0.0.1',port:4187,strictPort:true}});
    try{
      const cases=version==='previous'?[{path:'projects/kaiwu/viewer',name:'kaiwu-viewer',motion:'no-preference'}]:[{path:'',name:'home-static',motion:'reduce'},{path:'',name:'home-animated',motion:'no-preference'}];
      if(version==='after')cases.push({path:'projects/kaiwu',name:'kaiwu-config',motion:'reduce'},{path:'projects/kaiwu/viewer',name:'kaiwu-viewer',motion:'no-preference'});
      for(const entry of cases)for(let run=0;run<3;run++){
        const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:entry.motion,locale:'en-US'});
        const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
        await page.addInitScript(()=>{window.sampleFrames=0;const request=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=callback=>request(time=>{window.sampleFrames++;callback(time);});});
        await page.goto('http://127.0.0.1:4187/Vite-Homepage-24/'+entry.path);
        if(entry.name==='home-animated')await page.waitForFunction(()=>document.querySelector('#three-canvas')?.dataset.state==='ready');
        if(entry.name==='kaiwu-viewer')await page.waitForFunction(()=>document.querySelector('.kaiwu-stage')?.dataset.state==='ready');
        const readyMs=await page.evaluate(()=>performance.now());
        await page.waitForLoadState('networkidle');
        const first=await page.evaluate(()=>window.sampleFrames);await page.waitForTimeout(500);
        const frames=await page.evaluate(()=>window.sampleFrames)-first;
        const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({url:r.name,bytes:r.encodedBodySize,transfer:r.transferSize,duration:r.duration})));
        const js=resources.filter(r=>new URL(r.url).pathname.endsWith('.js'));
        let gzip=0;for(const resource of js)gzip+=gzipSync(await readFile(join(dist,'assets',basename(new URL(resource.url).pathname)))).length;
        if(entry.name==='home-static'||entry.name==='home-animated'||entry.name==='kaiwu-config')assert(!resources.some(r=>/\/kaiwu\/(model|hdr)\//.test(r.url)));
        if(entry.name==='kaiwu-config')assert(!js.some(r=>/\/scene-/.test(r.url)));
        if(version==='after'&&entry.name==='kaiwu-viewer')assert.equal(frames,0,'Paused viewer must not keep rendering');
        assert.deepEqual(errors,[]);
        report.runs.push({version,case:entry.name,run:run+1,readyMs,idleFramesIn500ms:frames,jsBytes:js.reduce((sum,r)=>sum+r.bytes,0),jsGzip:gzip,totalResourceBytes:resources.reduce((sum,r)=>sum+r.bytes,0),resources,errors});
        if(run===0)await page.screenshot({path:join(output,version+'-'+entry.name+'.png'),fullPage:true});
        await context.close();
      }
    }finally{await new Promise(done=>server.httpServer.close(done));}
  }
  const median=values=>values.sort((a,b)=>a-b)[Math.floor(values.length/2)];
  report.summary=[...new Set(report.runs.map(r=>r.version+'/'+r.case))].map(key=>{
    const rows=report.runs.filter(r=>r.version+'/'+r.case===key);
    return {key,...Object.fromEntries(['readyMs','idleFramesIn500ms','jsBytes','jsGzip','totalResourceBytes'].map(field=>[field,median(rows.map(r=>r[field]))]))};
  });
  await writeFile(join(output,'performance.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report.summary,null,2));
}finally{await browser.close();}
