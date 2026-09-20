<script setup>
import PageHeader from '../components/PageHeader.vue';
import {publicAsset} from '../utils/publicAsset';
</script>
<template>
  <main id="main-content" class="page-container" tabindex="-1">
    <PageHeader title="Test Page" :category="$t('tags.ar-mini')" year="December 2024" />
    <img class="test-cover" :src="publicAsset('image/ZAR-Cover.png')" alt="AR Miniprogram">
    <p>{{ $t('status.detailsPending') }}</p>
  </main>
</template>
<style scoped>
.test-cover { max-width: 32rem; width: 100%; margin-bottom: 2rem; }
</style>
