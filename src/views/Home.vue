<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {createHomeScene} from '../three/home.js';
import {publicAsset} from '../utils/publicAsset.js';
import LanguageSwitch from '../components/LanguageSwitch.vue';
import ProfileIdentity from '../components/ProfileIdentity.vue';
import ContactLinks from '../components/ContactLinks.vue';
const isDevelopment = import.meta.env.DEV;

const canvasHost = ref(null);
const sceneState = ref('loading');
let homeScene;
onMounted(() => {
  homeScene = createHomeScene(canvasHost.value, {
    onReady: () => { sceneState.value = 'ready'; },
    onError: () => { sceneState.value = 'fallback'; },
  });
});
onUnmounted(() => homeScene?.dispose());
</script>

<template>
  <main id="main-content" class="page-container home" tabindex="-1">
    <header class="home-header">
      <h1 id="h-title">PANNIC</h1>
      <LanguageSwitch />
    </header>
    <div class="home-grid">
      <div class="home-copy">
        <ProfileIdentity />
        <p id="m-intro">{{ $t('home.intro') }}</p>
        <nav class="f-button" :aria-label="$t('accessibility.navigation')">
          <RouterLink class="text-link" to="/about">{{ $t('menu.about') }}</RouterLink>
          <RouterLink class="text-link" to="/works">{{ $t('menu.works') }}</RouterLink>
          <RouterLink class="text-link" to="/projects">{{ $t('menu.projects') }}</RouterLink>
        </nav>
        <ContactLinks>
          <RouterLink v-if="isDevelopment" class="text-link test-link" to="/test">{{ $t('menu.test') }}</RouterLink>
        </ContactLinks>
      </div>
      <div class="scene-panel" aria-hidden="true">
        <div id="three-canvas" ref="canvasHost" :data-state="sceneState"></div>
        <img v-if="sceneState !== 'ready'" class="scene-fallback" :src="publicAsset('image/CAT-Cover.png')" alt="">
      </div>
    </div>
  </main>
</template>

<style scoped>
.home { min-height: 100vh; min-height: 100svh; }
.home-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: var(--space-section); }
#h-title { font-size: clamp(3rem, 2rem + 6vw, 7rem); letter-spacing: -.045em; }
.home-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; align-items: center; }
.home-copy { min-width: 0; display: grid; gap: 1.5rem; }
#m-intro { max-width: 60ch; }
.f-button { display: flex; flex-wrap: wrap; gap: .75rem; }
.test-link { margin-left: auto; }
.scene-panel { position: relative; min-width: 0; aspect-ratio: 1; width: 100%; max-width: 30rem; justify-self: center; background: #202321; border: 1px solid var(--border-color); }
#three-canvas { position: absolute; inset: 0; pointer-events: none; }
#three-canvas :deep(canvas) { display: block; max-width: 100%; }
.scene-fallback { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: .5; pointer-events: none; }
@media (min-width: 64rem) { .home-grid { grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: 3rem; } }
</style>
