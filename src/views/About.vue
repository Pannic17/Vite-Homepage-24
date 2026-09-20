<script setup>
import SiteLayout from '../layouts/SiteLayout.vue';
</script>
<template>
  <SiteLayout title="ABOUT">
    <template #subtitle>关于 PANNIC</template>
    <section class="pending"><h2>UNDER CONSTRUCTION</h2><p>{{ $t('status.detailsPending') }}</p></section>
  </SiteLayout>
</template>
<style scoped>
.pending { max-width: 42rem; display: grid; gap: 1rem; }
</style>
