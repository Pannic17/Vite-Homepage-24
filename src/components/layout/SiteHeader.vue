<script setup>
import SubRight from '../SubRight.vue';
defineProps({ title: String });
</script>
<template>
  <header class="site-header">
    <div class="site-heading"><h1>{{ title }}</h1><p class="subtitle"><slot /></p></div>
    <SubRight />
  </header>
</template>
<style scoped>
.site-header { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 1.5rem; padding-bottom: 1.5rem; margin-bottom: var(--space-section); border-bottom: 1px solid var(--border-color); }
.site-heading { min-width: 0; }
.subtitle { margin-top: .75rem; }
</style>
