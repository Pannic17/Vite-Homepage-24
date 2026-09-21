import {writeFile} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import sharp from 'sharp';

// Run against a local Vite dev server to reproduce the transparent model portrait.
const base = process.argv[2] || 'http://127.0.0.1:5180/Vite-Homepage-24/';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({reducedMotion: 'reduce'});
  await page.goto(base);
  const data = await page.evaluate(async () => {
    const THREE = await import('/Vite-Homepage-24/node_modules/three/build/three.module.js');
    const {GLTFLoader} = await import('/Vite-Homepage-24/node_modules/three/examples/jsm/loaders/GLTFLoader.js');
    const model = (await new GLTFLoader().loadAsync(new URL('cat.gltf', location.href).href)).scene;
    model.rotation.y = -.35;
    const bounds = new THREE.Box3().setFromObject(model);
    model.position.sub(bounds.getCenter(new THREE.Vector3()));
    const size = bounds.getSize(new THREE.Vector3());
    const scene = new THREE.Scene();
    scene.add(model, new THREE.AmbientLight(0x999999));
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    const camera = new THREE.PerspectiveCamera(45, 720 / 960, .1, 100);
    camera.position.z = Math.max(size.y, size.x / camera.aspect) / (2 * Math.tan(Math.PI / 8)) * 1.15 + size.z / 2;
    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(720, 960);
    renderer.render(scene, camera);
    const result = renderer.domElement.toDataURL('image/png').split(',')[1];
    renderer.dispose();
    return result;
  });
  await writeFile('public/image/home-cat.webp', await sharp(Buffer.from(data, 'base64')).webp({quality: 90, alphaQuality: 100}).toBuffer());
} finally {
  await browser.close();
}
