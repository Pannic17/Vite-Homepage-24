export const localConfigKey = 'kaiwu-viewer-config';

export function assetUrl(value, base, configUrl) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('Invalid resource URL');
  // Remote configuration owns its relative paths, including root-relative ones.
  const url = new URL(value, configUrl || base);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported resource URL');
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
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid configuration');
  const defaults=defaultConfig(base);
  const config={...defaults,...input,camera:{...defaults.camera,...input.camera}};
  // Legacy local JSON uses source public-root paths. Scope those to Kaiwu.
  const resource=value=>!configUrl && /^\/(model|hdr|image)\//.test(value)
    ? new URL('kaiwu'+value,base).href : assetUrl(value,base,configUrl);
  config.modelPath=resource(config.modelPath);
  config.hdrPath=resource(config.hdrPath);
  if(config.bgPath)config.bgPath=resource(config.bgPath);
  for(const key of ['rotation','hdrAngle','ambientIntensity','hdrExposure']) {
    if(!Number.isFinite(config[key]))throw new Error('Invalid numeric configuration');
  }
  for(const key of ['position','lookAt']) {
    if(!['x','y','z'].every(axis=>Number.isFinite(config.camera[key]?.[axis])))throw new Error('Invalid camera');
  }
  if(!Number.isFinite(config.camera.focalLength)||config.camera.focalLength<=0)throw new Error('Invalid focal length');
  // Do not silently render an unsupported legacy effect as if it were preserved.
  if(config.hdrAngle!==0 || config.enablePostprocessing===true)throw new Error('Advanced effects pending');
  return config;
}

export async function loadConfig(query,base,storage,signal) {
  if(!query.type && !query.url)return defaultConfig(base);
  if(query.type==='1')return normalizeConfig({modelPath:assetUrl(query.url,base)},base);
  if(query.type==='2') {
    const url=assetUrl(query.url,base);
    const response=await fetch(url,{signal});
    if(!response.ok)throw new Error('Configuration request failed');
    return normalizeConfig(await response.json(),base,response.url || url);
  }
  if(query.type==='3') {
    const text=storage.getItem(localConfigKey);
    if(!text)throw new Error('Select a local configuration again');
    return normalizeConfig(JSON.parse(text),base);
  }
  throw new Error('Unsupported configuration type');
}
