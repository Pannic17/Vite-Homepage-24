import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {disposeObject3D} from '../../three/dispose';

// Adapted from kaiwu-view's ThreeHelper/CameraHelper/InitHelper for r147.
// No shared renderer, mutable PRESET, old PMREM or RoughnessMipmapper.
export function createScene(container,config) {
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.outputEncoding=THREE.sRGBEncoding;
  renderer.physicallyCorrectLights=true;
  const mappings={None:THREE.NoToneMapping,Linear:THREE.LinearToneMapping,Reinhard:THREE.ReinhardToneMapping,Cineon:THREE.CineonToneMapping,ACESFilmic:THREE.ACESFilmicToneMapping};
  renderer.toneMapping=mappings[config.toneMapping]??THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=config.hdrExposure;
  container.append(renderer.domElement);
  const scene=new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff,config.ambientIntensity));
  const camera=new THREE.PerspectiveCamera(45,1,1,1000);
  camera.position.copy(config.camera.position);camera.setFocalLength(config.camera.focalLength);
  const controls=new OrbitControls(camera,renderer.domElement);
  controls.target.copy(config.camera.lookAt);controls.update();controls.saveState();
  let disposed=false,object,environment,raf=0,playing=!!config.autoPlay,last=0;
  const resize=()=>{
    const {width,height}=container.getBoundingClientRect();
    camera.aspect=width/Math.max(height,1);camera.updateProjectionMatrix();
    renderer.setSize(width,Math.max(height,1));
  };
  const observer=new ResizeObserver(resize);observer.observe(container);resize();
  const render=time=>{
    if(disposed)return;
    if(!document.hidden){
      if(playing && object)object.rotation.y+=Math.min((time-last)/1000,0.05)*0.6;
      controls.update();renderer.render(scene,camera);
    }
    last=time;raf=requestAnimationFrame(render);
  };
  const ready=(async()=>{
    const hdr=await new RGBELoader().loadAsync(config.hdrPath);
    if(disposed){hdr.dispose();return;}
    const pmrem=new THREE.PMREMGenerator(renderer);
    try{environment=pmrem.fromEquirectangular(hdr);scene.environment=environment.texture;}
    finally{hdr.dispose();pmrem.dispose();}
    const gltf=await new GLTFLoader().loadAsync(config.modelPath);
    if(disposed){disposeObject3D(gltf.scene);return;}
    object=gltf.scene;object.rotation.y=(config.rotation+180)*Math.PI/180;object.position.y=0.5;
    scene.add(object);raf=requestAnimationFrame(render);
  })();
  return {
    ready,
    setPlaying(value){playing=value;},
    reset(){controls.reset();if(object)object.rotation.y=(config.rotation+180)*Math.PI/180;},
    dispose(){
      if(disposed)return;disposed=true;cancelAnimationFrame(raf);observer.disconnect();
      controls.dispose();disposeObject3D(object);environment?.dispose();
      renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
    },
  };
}
