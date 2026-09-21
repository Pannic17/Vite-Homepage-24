import {mkdir, readFile, writeFile, readdir, stat} from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {build, preview, transformWithOxc} from 'vite';
import {chromium} from '@playwright/test';
import {startBaselineServer} from './baseline-server.mjs';

// Read-only source inventory; probe artifacts stay outside production routes.
const source = path.resolve(process.argv[2] || 'E:/Projects/kaiwu-view');
const output = path.resolve('docs/Phase2/p2-0/2026-09-21');
const scratch = path.resolve('.phase2-preflight.local');
await mkdir(output, {recursive:true});
await mkdir(scratch, {recursive:true});
const json = async (file, value) => writeFile(path.join(output,file), JSON.stringify(value,null,2));
async function files(root) {
  const result = [];
  for (const item of await readdir(root,{withFileTypes:true})) {
    const file = path.join(root,item.name);
    if (item.isDirectory()) result.push(...await files(file));
    else result.push(file);
  }
  return result;
}
const assets = await Promise.all((await files(path.join(source,'public'))).map(async file => ({path:path.relative(source,file).replaceAll('\\','/'),bytes:(await stat(file)).size})));
const imports = [];
for (const file of await files(path.join(source,'src'))) {
  if (!/\.(js|ts|vue)$/.test(file)) continue;
  const text = await readFile(file,'utf8');
  imports.push({file:path.relative(source,file).replaceAll('\\','/'),imports:[...text.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g)].map(match=>match[1])});
}
const gltf = JSON.parse(await readFile(path.join(source,'public/model/owl_gltf/1.gltf'),'utf8'));
const references = [...gltf.buffers,...gltf.images].map(item=>item.uri);
for (const uri of references) await stat(path.join(source,'public/model/owl_gltf',uri));
await json('inventory.json',{
  source, homepageCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  sourceCommit:execFileSync('git',['-C',source,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  sourcePackage:JSON.parse(await readFile(path.join(source,'package.json'),'utf8')),
  assets,totalBytes:assets.reduce((sum,item)=>sum+item.bytes,0),imports,gltfReferences:references,
  sampleConfig:JSON.parse(await readFile(path.join(source,'public/2.json'),'utf8')),
});
const installed = JSON.parse(await readFile('node_modules/three/package.json','utf8'));
assert.equal(installed.version,'0.147.0');
const lock = JSON.parse(await readFile('package-lock.json','utf8'));
const threeEntries = Object.entries(lock.packages).filter(([name])=>/(^|\/)node_modules\/three$/.test(name));
assert.equal(threeEntries.length,1);
assert.equal(threeEntries[0][1].version,'0.147.0');
const moduleChecks=[];
for (const specifier of new Set(imports.flatMap(item=>item.imports).filter(value=>value.startsWith('three/')))) {
  if(specifier==='three/')continue;
  const normalized=specifier.endsWith('.js')?specifier:specifier+'.js';
  const exists=await stat(path.resolve('node_modules',normalized)).then(()=>true,()=>false);
  moduleChecks.push({specifier,normalized,exists});
}
const typescriptChecks=[];
for(const item of imports.filter(item=>item.file.endsWith('.ts'))) {
  const code=await readFile(path.join(source,item.file),'utf8');
  await transformWithOxc(code,item.file);
  typescriptChecks.push({file:item.file,transpile:'passed',typecheck:'not performed'});
}
await json('compatibility.json',{node:process.version,threeVersion:installed.version,threeEntries:threeEntries.map(([name,item])=>({name,version:item.version})),moduleChecks,typescriptChecks,pdfPresent:assets.some(item=>item.path==='public/model_doc.pdf'),sourceDependenciesInstalled:await stat(path.join(source,'node_modules')).then(()=>true,()=>false)});
await writeFile(path.join(scratch,'index.html'),'<html><head><title>r147 Kaiwu asset probe</title><link rel="icon" href="data:,"></head><body style="margin:0;background:#222"><script type="module" src="./probe.js"></script></body></html>');
await writeFile(path.join(scratch,'probe.js'),`
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {GammaCorrectionShader} from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
const base=import.meta.env.BASE_URL;
try {
 const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
 renderer.setSize(innerWidth,innerHeight); renderer.outputEncoding=THREE.sRGBEncoding;
 renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.physicallyCorrectLights=true;
 document.body.append(renderer.domElement);
 const scene=new THREE.Scene(); scene.add(new THREE.AmbientLight(0xffffff,0.2));
 const camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,1,1000);
 camera.position.set(0,0,-15);camera.setFocalLength(45);
 const controls=new OrbitControls(camera,renderer.domElement);controls.update();
 const hdr=await new RGBELoader().loadAsync(base+'hdr/xmas.hdr');
 const pmrem=new THREE.PMREMGenerator(renderer);const env=pmrem.fromEquirectangular(hdr);
 scene.environment=env.texture;
 const gltf=await new GLTFLoader().loadAsync(base+'model/owl_gltf/1.gltf');
 gltf.scene.rotation.y=Math.PI;gltf.scene.position.y=0.5;scene.add(gltf.scene);
 let meshes=0;gltf.scene.traverse(o=>{if(o.isMesh)meshes++;});
 renderer.render(scene,camera);
 const gl=renderer.getContext();const pixels=new Uint8Array(innerWidth*innerHeight*4);
 gl.readPixels(0,0,innerWidth,innerHeight,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
 let coloredPixels=0;for(let i=0;i<pixels.length;i+=4)if(pixels[i]+pixels[i+1]+pixels[i+2]>20)coloredPixels++;
 const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));
 composer.addPass(new ShaderPass(GammaCorrectionShader));
 const gui=new GUI();gui.destroy();
 window.probe={revision:THREE.REVISION,meshes,coloredPixels,triangles:renderer.info.render.triangles,glError:gl.getError(),officialImports:true};
 window.cleanup=()=>{controls.dispose();composer.dispose();env.dispose();hdr.dispose();pmrem.dispose();
 gltf.scene.traverse(o=>{if(o.isMesh){o.geometry.dispose();for(const m of [o.material].flat()){for(const v of Object.values(m))if(v?.isTexture)v.dispose();m.dispose();}}});renderer.dispose();};
} catch(error){window.probe={error:String(error.stack||error)};}
`);
let browser,baseline,server;
try {
 browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const results=[];
 for (const base of ['/', '/Vite-Homepage-24/']) {
  await build({configFile:false,root:scratch,base,publicDir:path.join(source,'public'),build:{outDir:path.join(scratch,'dist'),emptyOutDir:true}});
  server=await preview({configFile:false,root:scratch,base,build:{outDir:path.join(scratch,'dist')},preview:{host:'127.0.0.1',port:4186,strictPort:true}});
  const page=await browser.newPage({viewport:{width:1000,height:760}});
  const requests=[],errors=[];
  page.on('response',r=>requests.push({url:r.url(),status:r.status()}));
  page.on('pageerror',e=>errors.push(String(e)));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto('http://127.0.0.1:4186'+base);
  await page.waitForFunction(()=>window.probe,{},{timeout:60000});
  const result=await page.evaluate(()=>window.probe);
  await page.screenshot({path:path.join(output,base==='/'?'r147-default-root.png':'r147-default-subpath.png')});
  results.push({base,result,errors,requests});await json('probe-results.json',results);
  assert.equal(result.revision,'147');assert.ok(result.meshes>0);assert.ok(result.coloredPixels>1000);
  assert.equal(result.glError,0);assert.equal(errors.length,0);assert.ok(requests.every(r=>r.status<400));
  await page.evaluate(()=>window.cleanup());await page.close();await new Promise(resolve=>server.httpServer.close(resolve));server=null;
 }
 baseline=await startBaselineServer();
 const captures=[];
 for (const viewport of [{width:1440,height:900},{width:390,height:844}]) {
  for (const route of ['', 'projects']) {
   const page=await browser.newPage({viewport});const requests=[],errors=[];
   page.on('response',r=>requests.push({url:r.url(),status:r.status()}));page.on('pageerror',e=>errors.push(String(e)));
   await page.goto(baseline.url+route);await page.waitForLoadState('networkidle');await page.evaluate(()=>document.fonts.ready);
   const name=(route||'home')+'-'+viewport.width;
   await page.screenshot({path:path.join(output,name+'.png'),fullPage:true});
   captures.push({name,errors,requests,resources:await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name,duration:r.duration,transferSize:r.transferSize})))});
   await page.close();
  }
 }
 await json('homepage-baseline.json',captures);
 console.log('P2-0 probe and baseline complete: '+output);
} finally {
 await browser?.close();
 if(server)await new Promise(resolve=>server.httpServer.close(resolve));
 if(baseline)await new Promise(resolve=>baseline.server.httpServer.close(resolve));
}
