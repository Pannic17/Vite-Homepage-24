<script setup>
import {useI18n} from 'vue-i18n';
import {useRouter} from 'vue-router';
import LanguageSwitch from '../../components/LanguageSwitch.vue';
import {publicAsset} from '../../utils/publicAsset';
import {backOrFallback} from '../../utils/navigation';

const {t} = useI18n();
const router = useRouter();
</script>

<template>
  <main class="gcs-detail">
    <header class="d-header">
      <nav aria-label="Project navigation">
        <RouterLink to="/">{{ t('menu.main') }}</RouterLink>
        <button type="button" @click="backOrFallback(router, '/works')">{{ t('menu.back') }}</button>
      </nav>
      <LanguageSwitch />
      <h1>Chronoscape</h1>
      <p>June 2023 · Unreal 5 · XR · OpenCV · YOLO</p>
    </header>
    <img :src="publicAsset('image/GCS-Cover.jpg')" alt="Chronoscape" class="gcs-cover">
    <p>{{ t('intro.GCS') }}</p>
    <p>{{ t('status.detailsPending') }}</p>
  </main>
</template>

<style scoped>
.gcs-detail { max-width: 64rem; margin: 0 auto; padding: 2rem clamp(1rem, 5vw, 4rem); line-height: 1.6; }
.d-header nav { display: flex; gap: 1.5rem; margin-bottom: 1rem; }
.d-header button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
.d-header h1 { font-size: clamp(2rem, 7vw, 5rem); padding-top: 2rem; overflow-wrap: anywhere; }
.gcs-cover { display: block; width: 100%; max-width: 36rem; height: auto; margin: 2rem 0; }
</style>
