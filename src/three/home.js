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
import {qualityLevels, createPerformanceMonitor} from './quality.js';

// One instance is owned by one mounted Home view. No scene state survives routes.
export function createHomeScene(container, { quality = 'medium', onReady = () => {}, onError = () => {}, onQualityChange = () => {} } = {}) {
  let scene, camera, renderer, composer, model, observer;
  let disposed = false;
  let paused = document.hidden;
  let lastFrame = 0;
  let animationTime = 0;
  let monitor = createPerformanceMonitor(quality, setQuality);
  let animationId;
  let lastEffect = 0;
  const effects = new Map();
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
    document.removeEventListener('visibilitychange', onVisibility);
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
    effects.clear();
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

  function startEffect(index) {
    if (paused || disposed || index >= qualityLevels[quality].effects) return;
    let effect = effects.get(index);
    if (!effect) {
      const {width, height} = renderer.getDrawingBufferSize(new THREE.Vector2());
      const factories = [
        () => new ShiftEffect(composer, 200, .025, 30),
        () => new SobelEffect(composer, 200, width, height, 30),
        () => new LineEffect(composer, 200, width, height),
        () => new HalftoneEffect(composer, 200, width, height),
        () => new PostEffect(composer, 100, 20),
        () => new PixelEffect(composer, 120, scene, camera, 50),
        () => new AfterEffect(composer, 200),
        () => new GlitchEffect(composer, 100),
      ];
      effect = factories[index]();
      effects.set(index, effect);
      for (const pass of [effect.pass, effect.mask, effect.p1, effect.p2]) if (pass) passes.add(pass);
      resize();
    }
    effect.end();
    effect.add();
    active.add(effect);
  }

  function onDoubleClick(event) {
    if (!model || disposed || event.target.closest?.('a,button,input,select,textarea')) return;
    startEffect(0);
    startEffect(1);
  }

  function resize() {
    if (disposed || !renderer) return;
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const dpr = Math.min(window.devicePixelRatio || 1, qualityLevels[quality].dpr);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    composer?.setPixelRatio(dpr);
    composer?.setSize(width, height);
    for (const pass of passes) {
      pass.setSize?.(Math.floor(width * dpr), Math.floor(height * dpr));
      if (pass.uniforms?.width) pass.uniforms.width.value = width * dpr;
      if (pass.uniforms?.height) pass.uniforms.height.value = height * dpr;
    }
  }

  function pause() {
    paused = true;
    cancelAnimationFrame(animationId);
    animationId = undefined;
    lastFrame = 0;
    monitor.reset();
  }

  function resume() {
    if (disposed || document.hidden) return;
    paused = false;
    if (model && animationId === undefined) animationId = requestAnimationFrame(animate);
  }

  function onVisibility() { document.hidden ? pause() : resume(); }

  function createPipeline() {
    if (composer || quality === 'low') return;
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    passes.add(renderPass);
    composer.addPass(renderPass);
    const shift = new ShaderPass(RGBShiftShader);
    shift.uniforms.amount.value = .0015;
    passes.add(shift);
    composer.addPass(shift);
  }

  function setQuality(next) {
    if (disposed || next === quality || !Object.hasOwn(qualityLevels, next)) return;
    if (next === 'static') {
      dispose();
      onQualityChange('static');
      return;
    }
    quality = next;
    for (const effect of active) effect.end();
    active.clear();
    // Release every target belonging to a quality tier we no longer need.
    for (const [index, effect] of effects) {
      if (index < qualityLevels[quality].effects) continue;
      for (const pass of [effect.pass, effect.mask, effect.p1, effect.p2]) {
        if (pass) { pass.dispose?.(); passes.delete(pass); }
      }
      effects.delete(index);
    }
    if (quality === 'low') {
      for (const pass of passes) pass.dispose?.();
      passes.clear();
      composer?.dispose();
      composer = undefined;
    }
    createPipeline();
    monitor = createPerformanceMonitor(quality, setQuality);
    resize();
    onQualityChange(quality);
  }

  function animate(time) {
    animationId = undefined;
    if (disposed || paused || !model) return;
    try {
      const interval = 1000 / qualityLevels[quality].fps;
      if (!lastFrame || time - lastFrame >= interval - 1) {
        const delta = lastFrame ? Math.min(time - lastFrame, 100) : interval;
        lastFrame = time;
        animationTime += delta;
        model.position.y = Math.cos(animationTime / 100) * 0.02;
        model.rotation.y += delta * .0003;
        if (animationTime - lastEffect > 10000 + Math.random() * 5000) {
          startEffect(Math.floor(Math.random() * qualityLevels[quality].effects));
          lastEffect = animationTime;
        }
        for (const effect of active) effect.animate(() => active.delete(effect));
        if (composer) composer.render();
        else renderer.render(scene, camera);
        monitor.frame(time);
      }
      if (!disposed && !paused) animationId = requestAnimationFrame(animate);
    } catch (error) { fail(error); }
  }

  try {
    if (quality === 'static') return {dispose, resize, pause, resume, setQuality};
    ({ scene, camera, renderer } = setupThree(container));
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    createPipeline();
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
    document.addEventListener('visibilitychange', onVisibility);

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
        if (!paused) resume();
      })
      .catch(error => { if (!disposed) fail(error); });
  } catch (error) { fail(error); }

  return { dispose, resize, pause, resume, setQuality };
}
