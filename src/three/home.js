import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader';
import { setupThree } from './setup';
import { disposeObject3D } from './dispose';
import { publicAsset } from '../utils/publicAsset';
import { ShiftEffect } from './effect/p/ShiftEffect';
import { SobelEffect } from './effect/c/SobelEffect';
import { LineEffect } from './effect/c/LineEffect';
import { HalftoneEffect } from './effect/p/HalftoneEffect';
import { PostEffect } from './effect/p/PostEffect';
import { PixelEffect } from './effect/p/PixelEffect';
import { AfterEffect } from './effect/p/AfterEffect';
import { GlitchEffect } from './effect/c/GlitchEffect';

// One instance is owned by one mounted Home view. No scene state survives routes.
export function createHomeScene(container, { onReady = () => {}, onError = () => {} } = {}) {
  let scene, camera, renderer, composer, model, observer;
  let disposed = false;
  let animationId;
  let lastEffect = 0;
  let effects = [];
  const passes = new Set();
  const active = new Set();
  const abort = new AbortController();

  function dispose() {
    if (disposed) return;
    disposed = true;
    abort.abort();
    cancelAnimationFrame(animationId);
    observer?.disconnect();
    document.removeEventListener('dblclick', onDoubleClick);
    renderer?.domElement.removeEventListener('webglcontextlost', onContextLost);
    active.clear();
    // Includes inactive effects, which are not in composer.passes.
    for (const pass of passes) pass.dispose?.();
    passes.clear();
    composer?.dispose();
    disposeObject3D(scene);
    scene?.clear();
    renderer?.dispose();
    renderer?.forceContextLoss();
    renderer?.domElement.remove();
    model = null;
    effects = [];
  }

  function fail(error) {
    if (disposed) return;
    dispose();
    onError(error);
  }

  function onContextLost(event) {
    event.preventDefault();
    fail(new Error('WebGL context lost'));
  }

  function startEffect(effect) {
    effect.end();
    effect.add();
    active.add(effect);
  }

  function onDoubleClick(event) {
    if (!model || disposed || event.target.closest?.('a,button,input,select,textarea')) return;
    startEffect(effects[0]);
    startEffect(effects[1]);
  }

  function resize() {
    if (disposed || !renderer) return;
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
    for (const pass of passes) {
      pass.setSize?.(width, height);
      if (pass.uniforms?.width) pass.uniforms.width.value = width;
      if (pass.uniforms?.height) pass.uniforms.height.value = height;
    }
  }

  function animate(time) {
    if (disposed || !model) return;
    try {
      model.position.y = Math.cos(time / 100) * 0.02;
      model.rotation.y += 0.005;
      if (!lastEffect) lastEffect = time;
      if (time - lastEffect > 10000 + Math.random() * 5000) {
        startEffect(effects[Math.floor(Math.random() * effects.length)]);
        lastEffect = time;
      }
      for (const effect of active) effect.animate(() => active.delete(effect));
      composer.render();
      animationId = requestAnimationFrame(animate);
    } catch (error) { fail(error); }
  }

  try {
    ({ scene, camera, renderer } = setupThree(container));
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    passes.add(renderPass);
    composer.addPass(renderPass);
    const width = container.clientWidth;
    const height = container.clientHeight;
    effects = [
      new ShiftEffect(composer, 200, 0.025, 30),
      new SobelEffect(composer, 200, width, height, 30),
      new LineEffect(composer, 200, width, height),
      new HalftoneEffect(composer, 200, width, height),
      new PostEffect(composer, 100, 20),
      new PixelEffect(composer, 120, scene, camera, 50),
      new AfterEffect(composer, 200),
      new GlitchEffect(composer, 100),
    ];
    for (const effect of effects) {
      for (const pass of [effect.pass, effect.mask, effect.p1, effect.p2]) {
        if (pass) passes.add(pass);
      }
    }
    const shift = new ShaderPass(RGBShiftShader);
    shift.uniforms.amount.value = 0.0015;
    passes.add(shift);
    composer.addPass(shift);
    scene.add(new THREE.AmbientLight(0x999999));
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    resize();
    observer = new ResizeObserver(() => {
      try { resize(); } catch (error) { fail(error); }
    });
    observer.observe(container);
    document.addEventListener('dblclick', onDoubleClick);

    const modelUrl = publicAsset('cat.gltf');
    // Fetch is cancellable; parsing is not, so also guard its resolved result.
    fetch(modelUrl, { signal: abort.signal })
      .then(response => {
        if (!response.ok) throw new Error('Model HTTP ' + response.status);
        return response.arrayBuffer();
      })
      .then(buffer => {
        if (disposed) return null;
        return new GLTFLoader().parseAsync(buffer, new URL('.', new URL(modelUrl, location.href)).href);
      })
      .then(gltf => {
        if (!gltf) return;
        if (disposed) {
          const released = new Set();
          for (const root of gltf.scenes) disposeObject3D(root, released);
          return;
        }
        model = gltf.scene;
        scene.add(model);
        onReady();
        animationId = requestAnimationFrame(animate);
      })
      .catch(error => { if (!disposed) fail(error); });
  } catch (error) { fail(error); }

  return { dispose, resize };
}
