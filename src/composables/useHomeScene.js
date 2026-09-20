import {onMounted, onUnmounted, ref} from 'vue';
import {chooseQuality, qualityLevels} from '../three/quality.js';

const preferenceKey = 'home-scene-quality';

export function useHomeScene(host) {
  const state = ref('loading');
  const preference = ref('auto');
  const quality = ref('static');
  let scene, media, mounted = false, generation = 0, frame, idle, timer;

  function cancelPending() {
    generation++;
    cancelAnimationFrame(frame);
    if (idle !== undefined) window.cancelIdleCallback?.(idle);
    clearTimeout(timer);
    scene?.dispose();
    scene = undefined;
  }

  function selectedQuality() {
    return preference.value === 'auto' ? chooseQuality({
      reducedMotion: media.matches,
      saveData: navigator.connection?.saveData,
      cores: navigator.hardwareConcurrency,
      memory: navigator.deviceMemory,
    }) : preference.value;
  }

  function start() {
    cancelPending();
    quality.value = selectedQuality();
    if (quality.value === 'static') { state.value = 'static'; return; }
    state.value = 'loading';
    const current = generation;
    const load = async () => {
      if (!mounted || current !== generation || document.hidden) return;
      try {
        const {createHomeScene} = await import('../three/home.js');
        if (!mounted || current !== generation || document.hidden) return;
        scene = createHomeScene(host.value, {
          quality: quality.value,
          onReady: () => { state.value = 'ready'; },
          onError: () => { state.value = 'fallback'; },
          onQualityChange: level => {
            quality.value = level;
            if (level === 'static') state.value = 'static';
          },
        });
      } catch { if (mounted && current === generation) state.value = 'fallback'; }
    };
    // Give the text and static visual a paint before importing any WebGL code.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if ('requestIdleCallback' in window) idle = window.requestIdleCallback(load, {timeout: 750});
        else timer = setTimeout(load, 0);
      });
    });
  }

  function select(value) {
    if (value !== 'auto' && !Object.hasOwn(qualityLevels, value)) return;
    preference.value = value;
    try { localStorage.setItem(preferenceKey, value); } catch { /* Restricted storage is optional. */ }
    start();
  }

  function toggle() {
    select(state.value === 'static' || state.value === 'fallback' ? 'low' : 'static');
  }

  function onMotionChange() { if (preference.value === 'auto') start(); }
  function onVisibility() {
    if (!document.hidden && !scene && state.value === 'loading') start();
  }

  onMounted(() => {
    mounted = true;
    media = window.matchMedia('(prefers-reduced-motion: reduce)');
    try {
      const saved = localStorage.getItem(preferenceKey);
      if (saved === 'auto' || Object.hasOwn(qualityLevels, saved)) preference.value = saved;
    } catch { /* Default remains usable. */ }
    media.addEventListener('change', onMotionChange);
    document.addEventListener('visibilitychange', onVisibility);
    start();
  });
  onUnmounted(() => {
    mounted = false;
    cancelPending();
    media?.removeEventListener('change', onMotionChange);
    document.removeEventListener('visibilitychange', onVisibility);
  });
  return {state, quality, preference, select, toggle};
}
