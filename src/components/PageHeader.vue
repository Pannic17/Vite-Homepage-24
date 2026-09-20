<script setup>
import LanguageSwitch from './LanguageSwitch.vue';
import {useRouter} from 'vue-router';
import {backOrFallback} from '../utils/navigation';
const router = useRouter();
defineProps({title: String, year: String, category: String, backTo: {type: String, default: '/'}});
</script>
<template>
  <header class="d-header">
    <div class="detail-actions">
      <nav :aria-label="$t('accessibility.navigation')">
        <RouterLink class="text-link" to="/">{{ $t('menu.main') }}</RouterLink>
        <button class="text-link" type="button" @click="backOrFallback(router, backTo)">{{ $t('menu.back') }}</button>
      </nav>
      <LanguageSwitch />
    </div>
    <h1>{{ title }}</h1>
    <p>{{ category }}<template v-if="category && year"> · </template>{{ year }}</p>
  </header>
</template>
<style scoped>
.d-header { display: grid; gap: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); margin-bottom: 2rem; }
.detail-actions, nav { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; }
.detail-actions { justify-content: space-between; }
</style>
