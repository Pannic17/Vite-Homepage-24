import {failure,parseConfig} from './errors.js';
export const localConfigKey = 'kaiwu-viewer-config';

export function assetUrl(value, base, configUrl) {
  if (typeof value !== 'string' || !value.trim()) throw failure('url');
  // Remote configuration owns its relative paths, including root-relative ones.
  let url;try{url = new URL(value.trim(), configUrl || base);}catch{throw failure('url');}
  if (!['http:', 'https:'].includes(url.protocol)) throw failure('url');
  return url.href;
}

export function defaultConfig(base) {
  return {
    modelPath:new URL('kaiwu/model/owl_gltf/1.gltf',base).href,
    hdrPath:new URL('kaiwu/hdr/xmas.hdr',base).href,
    rotation:0, hdrAngle:0, autoPlay:false, ambientIntensity:0.2,
    hdrExposure:1, toneMapping:'ACESFilmic',
    camera:{position:{x:0,y:0,z:-15},lookAt:{x:0,y:0,z:0},focalLength:45},
  };
}

export function normalizeConfig(input, base, configUrl) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw failure('config');
  const defaults=defaultConfig(base);
  const config={...defaults,...input,camera:{...defaults.camera,...input.camera}};
  // Legacy local JSON uses source public-root paths. Scope those to Kaiwu.
  const resource=value=>!configUrl && /^\/(model|hdr|image)\//.test(value)
    ? new URL('kaiwu'+value,base).href : assetUrl(value,base,configUrl);
  config.modelPath=resource(config.modelPath);
  config.hdrPath=resource(config.hdrPath);
  if(config.bgPath)config.bgPath=resource(config.bgPath);
  for(const key of ['rotation','hdrAngle','ambientIntensity','hdrExposure']) {
    if(!Number.isFinite(config[key]))throw failure('config');
  }
  for(const key of ['position','lookAt']) {
    if(!['x','y','z'].every(axis=>Number.isFinite(config.camera[key]?.[axis])))throw failure('config');
  }
  if(!Number.isFinite(config.camera.focalLength)||config.camera.focalLength<=0)throw failure('config');
  // Do not silently render an unsupported legacy effect as if it were preserved.
  if(config.hdrAngle!==0 || config.enablePostprocessing===true)throw failure('effects');
  return config;
}

export async function loadConfig(query,base,storage,signal) {
  if(!query.type && !query.url)return defaultConfig(base);
  if(query.type==='1')return normalizeConfig({modelPath:assetUrl(query.url,base)},base);
  if(query.type==='2') {
    const url=assetUrl(query.url,base);
    let response,text;
    try{response=await fetch(url,{signal});if(!response.ok)throw failure('network');text=await response.text();}
    catch{throw failure('network');}
    return normalizeConfig(parseConfig(text),base,response.url || url);
  }
  if(query.type==='3') {
    let text;try{text=storage.getItem(localConfigKey);}catch{throw failure('storage');}
    if(!text)throw failure('local');
    return normalizeConfig(parseConfig(text),base);
  }
  throw failure('config');
}
