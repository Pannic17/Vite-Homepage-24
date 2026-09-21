<script setup>
import {ref} from 'vue';
import {useHomeScene} from '../composables/useHomeScene.js';
import ResponsiveImage from '../components/ResponsiveImage.vue';
import LanguageSwitch from '../components/LanguageSwitch.vue';
import ProfileIdentity from '../components/ProfileIdentity.vue';
import ContactLinks from '../components/ContactLinks.vue';
const isDevelopment = import.meta.env.DEV;

const canvasHost = ref(null);
const {state: sceneState, quality, preference, select, toggle} = useHomeScene(canvasHost);
</script>

<template>
  <main id="main-content" class="home" tabindex="-1">
    <h1 id="h-title">PANNIC</h1>
    <div class="home-copy">
      <ProfileIdentity />
      <LanguageSwitch />
      <p id="m-intro">{{ $t('home.intro') }}</p>
      <ContactLinks class="home-social" />
      <nav class="f-button" :aria-label="$t('accessibility.navigation')">
        <RouterLink class="sub-button" to="/about">{{ $t('menu.about') }}</RouterLink>
        <RouterLink class="sub-button" to="/works">{{ $t('menu.works') }}</RouterLink>
        <RouterLink class="sub-button" to="/projects">{{ $t('menu.projects') }}</RouterLink>
      </nav>
      <RouterLink v-if="isDevelopment" class="sub-button test-link" to="/test">{{ $t('menu.test') }}</RouterLink>
      <div class="scene-controls">
        <button type="button" @click="toggle">{{ $t(sceneState === 'static' || sceneState === 'fallback' ? 'scene.enable' : 'scene.disable') }}</button>
        <label>{{ $t('scene.quality') }}
          <select :aria-label="$t('scene.quality')" :value="preference" @change="select($event.target.value)">
            <option v-for="level in ['auto','static','low','medium','high']" :key="level" :value="level">{{ $t('scene.' + level) }}</option>
          </select>
        </label>
        <span v-if="preference !== 'static' && quality === 'static'" role="status">{{ $t('scene.static') }}</span>
      </div>
    </div>
    <div id="three-canvas" ref="canvasHost" :data-state="sceneState" :data-quality="quality" aria-hidden="true"></div>
    <ResponsiveImage v-if="sceneState !== 'ready'" class="scene-fallback" src="image/home-cat.webp" loading="eager" width="720" height="960" alt="" aria-hidden="true" />
  </main>
</template>

<style scoped>
/* Preserve the original home composition independently of the shared page layout. */
.home {
  --context-color: #aaa;
  --hover-color: #54a296;
  width: 80%;
  margin-inline: auto;
  padding-top: 17vh;
  padding-bottom: max(2rem, env(safe-area-inset-bottom));
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.2;
}
#h-title { font-size: min(20vmin, 19.5vw); line-height: 1.2; letter-spacing: normal; padding-bottom: 2vh; }
.home-copy { padding-left: 1vw; }
.home-copy :deep(p) { margin-block: 1em; color: var(--context-color); }
.home-copy :deep(.language-switch) { justify-content: start; gap: 0; margin-left: -.5rem; }
.home-copy :deep(.language-switch button) { color: var(--context-color); }
.home-copy :deep(.language-switch button[aria-pressed="true"]) { color: var(--context-color); }
#m-intro { width: 50%; }
.f-button { display: flex; justify-content: space-between; flex-wrap: wrap; gap: .5rem; padding-block: 2vh; }
.sub-button { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; min-width: 44px; padding-block: 1vmin; font-size: max(1.125rem, 3vmin); color: var(--title-color); text-decoration: none; border: 0; background: none; }
.sub-button:focus-visible { text-decoration: underline; }
.home-social { justify-content: flex-end; gap: 2vh; }
.home-social :deep(img) { width: 5vh; height: 5vh; }
#three-canvas { position: fixed; inset: 0; pointer-events: none; }
#three-canvas :deep(canvas) { display: block; max-width: 100%; }
:deep(.scene-fallback) { position: absolute; right: 12vw; top: 20vh; width: min(34vw, 420px); height: auto; pointer-events: none; }
.scene-controls { display: flex; align-items: center; flex-wrap: wrap; gap: .5rem 1rem; color: var(--context-color); font-size: .875rem; order: 3; }
.scene-controls button, .scene-controls select { min-height: 44px; min-width: 44px; border: 0; background: transparent; color: inherit; font: inherit; }
.scene-controls button { padding: 0; }
.scene-controls label { display: inline-flex; align-items: center; gap: .5rem; }
@media (hover: hover) { .sub-button:hover { color: var(--hover-color); } }
@media (max-aspect-ratio: 1/1.7), (max-width: 40rem) {
  .home { padding-top: 10vh; }
  .home-copy { display: flex; flex-direction: column; }
  #m-intro { width: 100%; padding-top: 25vh; }
  .f-button { flex-direction: column; }
  .sub-button { font-size: max(1.125rem, 3vh); }
  .home-social { order: 1; justify-content: center; padding-bottom: 3vh; }
  :deep(.scene-fallback) { top: 39vh; right: 50%; width: auto; height: 27vh; transform: translateX(50%); }
  .test-link { order: 2; align-self: flex-start; }
}
</style>
