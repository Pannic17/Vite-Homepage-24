<script setup>
import {publicAsset} from '../../utils/publicAsset';
import TagList from './TagList.vue';
import {useI18n} from 'vue-i18n';
defineProps({entry:{type:Object,required:true}});
const {t} = useI18n();
</script>
<template>
  <article class="project-card section" :data-entry-id="entry.id">
    <img :src="publicAsset(entry.cover)" :alt="t(entry.titleKey)" class="s-cover" width="600" height="600">
    <div class="card-content">
      <p class="s-year">{{ t(entry.dateKey) }}</p>
      <h2 class="s-title">
        <RouterLink v-if="entry.destination.kind === 'internal'" :to="entry.destination.to">{{ t(entry.titleKey) }}</RouterLink>
        <a v-else-if="entry.destination.kind === 'external'" :href="entry.destination.href" target="_blank" rel="noopener noreferrer">{{ t(entry.titleKey) }}<span class="external" aria-hidden="true"> ↗</span></a>
        <template v-else>{{ t(entry.titleKey) }}</template>
      </h2>
      <p class="category">{{ t(entry.categoryKey) }}</p>
      <TagList :tags="entry.tags" />
      <p class="s-intro">{{ entry.introKey ? t(entry.introKey) : t('status.introPending') }}</p>
      <p v-if="entry.destination.kind === 'none'" class="detail-status">{{ t('status.noDetail') }}</p>
    </div>
  </article>
</template>
<style scoped>
.project-card { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; border-top: 1px solid var(--border-color); padding-block: 1.5rem; margin-block: var(--space-section); }
.project-card:first-child { margin-top: 0; }
.s-cover { width: 100%; aspect-ratio: 1; object-fit: contain; background: #1b1d1c; }
.card-content { min-width: 0; display: flex; flex-direction: column; align-items: start; gap: .75rem; }
.s-year { color: var(--hover-color); }
.s-title { font-size: var(--text-title); }
.s-title a { display: inline-block; min-height: 44px; padding-block: .25rem; }
.external { font-size: 1rem; }
.category { color: var(--title-color); }
.s-intro { max-width: 65ch; }
@media (min-width: 40rem) { .project-card { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: clamp(1.5rem, 4vw, 3rem); } }
</style>
