<script setup>
import PageHeader from '../../components/PageHeader.vue';
import {publicAsset} from '../../utils/publicAsset';
</script>
<template>
  <main id="main-content" class="page-container gcs-detail" tabindex="-1">
    <PageHeader title="Chronoscape" year="June 2023" category="Unreal 5 · XR · OpenCV · YOLO" back-to="/works" />
    <img :src="publicAsset('image/GCS-Cover.jpg')" alt="Chronoscape" class="gcs-cover">
    <div class="detail-copy"><p>{{ $t('intro.GCS') }}</p><p>{{ $t('status.detailsPending') }}</p></div>
  </main>
</template>
<style scoped>
.gcs-cover { width: 100%; max-width: 40rem; margin-bottom: 2rem; }
.detail-copy { max-width: 65ch; display: grid; gap: 1rem; }
</style>
