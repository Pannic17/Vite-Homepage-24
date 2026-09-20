<script setup>
import LanguageSwitch from './LanguageSwitch.vue';
</script>
<template>
  <nav class="header-actions" :aria-label="$t('accessibility.navigation')">
    <LanguageSwitch />
    <RouterLink class="text-link" to="/">{{ $t('menu.main') }}</RouterLink>
  </nav>
</template>
<style scoped>
.header-actions { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem; }
</style>
