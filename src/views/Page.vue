<script setup>
import PageHeader from '../components/PageHeader.vue';
import {publicAsset} from '../utils/publicAsset';
</script>
<template>
  <main id="main-content" class="page-container" tabindex="-1">
    <PageHeader :title="$t('menu.test')" :category="$t('tags.ar-mini')" :year="$t('dates.december2024')" />
    <img class="test-cover" :src="publicAsset('image/ZAR-Cover.png')" :alt="$t('title.ZAR')">
    <p>{{ $t('status.detailsPending') }}</p>
  </main>
</template>
<style scoped>
.test-cover { max-width: 32rem; width: 100%; margin-bottom: 2rem; }
</style>
