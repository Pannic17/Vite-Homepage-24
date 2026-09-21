import {test,expect} from '@playwright/test';

async function instrument(page){
  await page.addInitScript(()=>{
    let hidden=false;Object.defineProperty(document,'hidden',{get:()=>hidden});
    window.setHidden=value=>{hidden=value;document.dispatchEvent(new Event('visibilitychange'));};
    window.originalBitmap=window.createImageBitmap;window.frames=0;window.pendingFrames=new Set();
    const request=window.requestAnimationFrame.bind(window),cancel=window.cancelAnimationFrame.bind(window);
    window.requestAnimationFrame=callback=>{const id=request(time=>{window.pendingFrames.delete(id);window.frames++;callback(time);});window.pendingFrames.add(id);return id;};
    window.cancelAnimationFrame=id=>{window.pendingFrames.delete(id);cancel(id);};
    const add=document.addEventListener.bind(document),remove=document.removeEventListener.bind(document);
    window.visibilityListeners=new Set();
    document.addEventListener=(type,listener,options)=>{if(type==='visibilitychange')window.visibilityListeners.add(listener);add(type,listener,options);};
    document.removeEventListener=(type,listener,options)=>{if(type==='visibilitychange')window.visibilityListeners.delete(listener);remove(type,listener,options);};
    const Observer=window.ResizeObserver;window.observers=new Set();
    window.ResizeObserver=class extends Observer{observe(...args){window.observers.add(this);return super.observe(...args);}disconnect(){window.observers.delete(this);super.disconnect();}};
    const get=HTMLCanvasElement.prototype.getContext;window.contexts=[];
    HTMLCanvasElement.prototype.getContext=function(type,...args){const value=get.call(this,type,...args);if(type.startsWith('webgl')&&value&&!window.contexts.includes(value))window.contexts.push(value);return value;};
  });
}

test('viewer renders on demand, suspends in background and releases resources over repeated visits',async({page})=>{
  // Three cold model loads each retain their 30s readiness bound, plus control
  // and teardown assertions. Software-rendered CI needs a composite budget.
  test.setTimeout(120000);
  await instrument(page);await page.goto('projects/kaiwu');
  const baseline=await page.evaluate(()=>({observers:window.observers.size,listeners:window.visibilityListeners.size}));
  for(let i=0;i<3;i++){
    await page.getByRole('link',{name:'View example',exact:true}).click();
    await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
    await expect.poll(()=>page.evaluate(()=>window.pendingFrames.size)).toBe(0);
    await page.getByRole('button',{name:'Play',exact:true}).click();
    const before=await page.evaluate(()=>window.frames);
    await expect.poll(()=>page.evaluate(()=>window.frames)).toBeGreaterThan(before);
    await page.evaluate(()=>window.setHidden(true));
    const stopped=await page.evaluate(()=>window.frames);await page.waitForTimeout(150);
    expect(await page.evaluate(()=>window.frames)).toBe(stopped);
    expect(await page.evaluate(()=>window.pendingFrames.size)).toBe(0);
    await page.evaluate(()=>window.setHidden(false));
    await expect.poll(()=>page.evaluate(()=>window.frames)).toBeGreaterThan(stopped);
    await page.getByRole('link',{name:'Model configuration',exact:true}).click();
    await expect(page.locator('canvas,.lil-gui')).toHaveCount(0);
    await expect.poll(()=>page.evaluate(()=>window.pendingFrames.size)).toBe(0);
    expect(await page.evaluate(()=>({observers:window.observers.size,listeners:window.visibilityListeners.size}))).toEqual(baseline);
    await expect.poll(()=>page.evaluate(()=>window.contexts.every(gl=>gl.isContextLost()))).toBe(true);
    expect(await page.evaluate(()=>window.createImageBitmap===window.originalBitmap)).toBe(true);
  }
  await page.getByRole('link',{name:'Home',exact:true}).click();
  await expect(page.locator('#three-canvas')).toHaveAttribute('data-state','ready',{timeout:30000});
  await expect(page.locator('canvas')).toHaveCount(1);
});

test('late model completion cannot resurrect a viewer after navigation',async({page})=>{
  await instrument(page);let release,waiting=false;
  const gate=new Promise(resolve=>{release=resolve;});
  await page.route('**/kaiwu/model/owl_gltf/1.bin',async route=>{waiting=true;await gate;await route.continue().catch(()=>{});});
  await page.goto('projects/kaiwu/viewer');await expect.poll(()=>waiting).toBe(true);
  await page.getByRole('link',{name:'Model configuration',exact:true}).click();release();
  await page.waitForLoadState('networkidle');await page.waitForTimeout(150);
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(await page.evaluate(()=>window.pendingFrames.size)).toBe(0);
  expect(await page.evaluate(()=>window.observers.size)).toBe(0);
  await page.getByRole('link',{name:'View example',exact:true}).click();
  await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
});

test('unavailable WebGL and context loss have recoverable readable fallbacks',async({page})=>{
  await page.addInitScript(()=>{
    const get=HTMLCanvasElement.prototype.getContext;
    window.blockWebGL=true;
    HTMLCanvasElement.prototype.getContext=function(type,...args){return type.includes('webgl')&&window.blockWebGL?null:get.call(this,type,...args);};
  });
  await page.goto('projects/kaiwu/viewer');
  await expect(page.getByRole('alert')).toContainText('3D rendering is unavailable');
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.evaluate(()=>{window.blockWebGL=false;});await page.getByRole('button',{name:'Retry',exact:true}).click();
  await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
  await page.locator('canvas').evaluate(canvas=>canvas.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
  await expect(page.getByRole('alert')).toContainText('graphics context was lost');
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.getByRole('button',{name:'Retry',exact:true}).click();
  await expect(page.locator('.kaiwu-stage')).toHaveAttribute('data-state','ready',{timeout:30000});
});
