import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Scene, Mesh, BoxGeometry, MeshBasicMaterial, Texture } from 'three';
import { disposeObject3D } from '../../src/three/dispose.js';

test('shared GLTF resources and bitmaps are released once across scene roots', () => {
  const counts = { geometry: 0, material: 0, texture: 0, image: 0 };
  const geometry = new BoxGeometry();
  const texture = new Texture({ close: () => { counts.image++; } });
  const material = new MeshBasicMaterial({ map: texture, alphaMap: texture });
  geometry.addEventListener('dispose', () => { counts.geometry++; });
  material.addEventListener('dispose', () => { counts.material++; });
  texture.addEventListener('dispose', () => { counts.texture++; });
  const scene = new Scene();
  scene.add(new Mesh(geometry, material), new Mesh(geometry, [material, material]));
  const otherScene = new Scene();
  otherScene.add(new Mesh(geometry, material));
  const released = new Set();
  disposeObject3D(scene, released);
  disposeObject3D(otherScene, released);
  disposeObject3D(scene, released);
  assert.deepEqual(counts, { geometry: 1, material: 1, texture: 1, image: 1 });
});
