import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {disposeObject3D} from '../../three/dispose';
import {failure} from './errors';

// Every mounted page owns its resources; the shared r147 module owns no state.
export function createScene(container,input,{onError=()=>{}}={}) {
  const config=structuredClone(input);
  let renderer,scene,camera,controls,observer,object,environment;
  let disposed=false,raf=0,playing=!!config.autoPlay,last=0,loaded=false;
  const textures=new Set();
  function dispose(){
    if(disposed)return;disposed=true;cancelAnimationFrame(raf);raf=0;
    observer?.disconnect();document.removeEventListener('visibilitychange',visibility);
    renderer?.domElement.removeEventListener('webglcontextlost',contextLost);
    controls?.removeEventListener('change',schedule);controls?.dispose();
    const released=new Set();disposeObject3D(object,released);
    for(const texture of textures)if(!released.has(texture))texture.dispose();
    textures.clear();environment?.dispose();scene?.clear();
    renderer?.dispose();renderer?.forceContextLoss();renderer?.domElement.remove();
    object=null;
  }
  function contextLost(event){event.preventDefault();dispose();onError(failure('webgl'));}
  function schedule(){if(!disposed && loaded && !document.hidden && !raf)raf=requestAnimationFrame(render);}
  function render(time){
    raf=0;if(disposed||document.hidden)return;
    if(playing && object)object.rotation.y+=Math.min((time-last)/1000,0.05)*0.6;
    last=time;renderer.render(scene,camera);
    if(playing)schedule();
  }
  function visibility(){cancelAnimationFrame(raf);raf=0;last=performance.now();schedule();}
  try{
    try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch{throw failure('webgl');}
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    renderer.outputEncoding=THREE.sRGBEncoding;renderer.physicallyCorrectLights=true;
    const mappings={None:THREE.NoToneMapping,Linear:THREE.LinearToneMapping,Reinhard:THREE.ReinhardToneMapping,Cineon:THREE.CineonToneMapping,ACESFilmic:THREE.ACESFilmicToneMapping};
    renderer.toneMapping=mappings[config.toneMapping]??THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=config.hdrExposure;
    container.append(renderer.domElement);
    renderer.domElement.addEventListener('webglcontextlost',contextLost);
    scene=new THREE.Scene();scene.add(new THREE.AmbientLight(0xffffff,config.ambientIntensity));
    camera=new THREE.PerspectiveCamera(45,1,1,1000);
    camera.position.copy(config.camera.position);camera.setFocalLength(config.camera.focalLength);
    controls=new OrbitControls(camera,renderer.domElement);
    controls.target.copy(config.camera.lookAt);controls.update();controls.saveState();
    controls.addEventListener('change',schedule);
    const resize=()=>{
      if(disposed)return;
      const {width,height}=container.getBoundingClientRect();
      camera.aspect=width/Math.max(height,1);camera.updateProjectionMatrix();
      renderer.setSize(width,Math.max(height,1));schedule();
    };
    observer=new ResizeObserver(resize);observer.observe(container);resize();
    document.addEventListener('visibilitychange',visibility);
  }catch(error){dispose();throw error;}
  // Instance-local image loading replaces the legacy global iOS workaround.
  const manager=new THREE.LoadingManager();
  const imageLoader=new THREE.TextureLoader(manager);
  const originalLoad=imageLoader.load.bind(imageLoader);
  imageLoader.load=(url,onLoad,onProgress,onFailure)=>{
    const texture=originalLoad(url,value=>{if(disposed)value.dispose();onLoad?.(value);},onProgress,onFailure);
    textures.add(texture);return texture;
  };
  const loader=new GLTFLoader(manager);
  loader.register(parser=>{parser.textureLoader=imageLoader;return {name:'KAIWU_LOCAL_IMAGE_LOADER'};});
  const ready=(async()=>{
    try{
      const hdr=await new RGBELoader().loadAsync(config.hdrPath);
      if(disposed){hdr.dispose();return;}
      const pmrem=new THREE.PMREMGenerator(renderer);
      try{environment=pmrem.fromEquirectangular(hdr);scene.environment=environment.texture;}
      finally{hdr.dispose();pmrem.dispose();}
      const gltf=await loader.loadAsync(config.modelPath);
      if(disposed){disposeObject3D(gltf.scene);return;}
      object=gltf.scene;object.rotation.y=(config.rotation+180)*Math.PI/180;object.position.y=0.5;
      scene.add(object);loaded=true;last=performance.now();schedule();
    }catch(error){dispose();throw error;}
  })();
  return {
    ready,dispose,
    setPlaying(value){playing=value;last=performance.now();schedule();},
    reset(){controls.reset();if(object)object.rotation.y=(config.rotation+180)*Math.PI/180;schedule();},
  };
}
