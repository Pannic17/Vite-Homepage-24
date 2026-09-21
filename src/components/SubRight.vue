<script setup>
import LanguageSwitch from './LanguageSwitch.vue';
import {useRouter} from 'vue-router';
import {backOrFallback} from '../utils/navigation';
defineProps({backTo: String});
const router=useRouter();
</script>
<template>
  <nav class="header-actions" :aria-label="$t('accessibility.navigation')">
    <LanguageSwitch />
    <div class="header-links">
      <button v-if="backTo" class="text-link" type="button" @click="backOrFallback(router, backTo)">{{ $t('menu.back') }}</button>
      <RouterLink class="text-link header-home" to="/">{{ $t('menu.main') }}</RouterLink>
    </div>
  </nav>
</template>
<style scoped>
.header-actions { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem; }
.header-links { display: flex; align-items: center; gap: var(--header-space, .75rem); }
</style>
