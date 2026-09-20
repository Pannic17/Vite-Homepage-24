<script setup>
import ResponsiveImage from '../ResponsiveImage.vue';
import TagList from './TagList.vue';
import {useI18n} from 'vue-i18n';
defineProps({entry:{type:Object,required:true}, eager:Boolean});
const {t} = useI18n();
</script>
<template>
  <article class="project-card section corner-frame" :data-entry-id="entry.id">
    <ResponsiveImage :src="entry.cover" :alt="t(entry.titleKey)" class="s-cover" :loading="eager ? 'eager' : 'lazy'" sizes="(max-width: 639px) 90vw, (max-aspect-ratio: 1/1.7) 90vw, 40vmin" />
    <div class="card-content">
      <div class="card-meta">
        <p class="s-year">{{ t(entry.dateKey) }}</p>
        <div class="s-subtitles">
          <TagList :tags="entry.tags" inline />
          <p class="category">{{ t(entry.categoryKey) }}</p>
        </div>
      </div>
      <div class="card-description">
        <p class="s-intro">{{ entry.introKey ? t(entry.introKey) : t('status.introPending') }}</p>
        <h2 class="s-title">
          <RouterLink v-if="entry.destination.kind === 'internal'" :to="entry.destination.to">{{ t(entry.titleKey) }}</RouterLink>
          <a v-else-if="entry.destination.kind === 'external'" :href="entry.destination.href" target="_blank" rel="noopener noreferrer">{{ t(entry.titleKey) }}</a>
          <template v-else>{{ t(entry.titleKey) }}</template>
        </h2>
        <span v-if="entry.destination.kind === 'none'" class="detail-status">{{ t('status.noDetail') }}</span>
      </div>
    </div>
  </article>
</template>
<style scoped>
.project-card { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1vh; padding-block: 1vh; margin-block: 4vh; }
:deep(.s-cover) { width: 100%; height: auto; aspect-ratio: 1; object-fit: contain; align-self: start; }
.card-content { min-width: 0; display: flex; flex-direction: column; justify-content: space-between; gap: 1.5rem; text-align: right; }
.s-year { color: var(--hover-color); font-size: max(.875rem, 2vh); font-weight: 700; margin-bottom: 1vh; }
.s-subtitles { display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: baseline; gap: .25rem; }
.category { color: var(--title-color); font-weight: 700; }
.s-intro { margin-bottom: 1vh; }
.s-title { font-size: max(1.125rem, 5vmin); line-height: 1.2; text-shadow: 2px 2px 2px var(--context-color); }
.s-title a { display: inline-flex; align-items: center; min-height: 44px; min-width: 44px; text-decoration: none; }
.s-title a::after { content: ''; position: absolute; inset: 0; }
.s-title a:focus-visible { outline: none; }
.detail-status { position: absolute; width: 1px; height: 1px; clip-path: inset(50%); overflow: hidden; white-space: nowrap; }
@media (hover: hover) {
  .s-title:hover { text-shadow: 2px 2px 2px var(--hover-color); }
  .s-title a:hover { color: var(--title-color); }
}
.s-title a:focus-visible { text-shadow: 2px 2px 2px var(--hover-color); }
@media (min-width: 40rem) and (min-aspect-ratio: 1/1.7) {
  .project-card { grid-template-columns: minmax(0, 40vmin) minmax(0, 1fr); gap: 6vw; }
}
@media (max-width: 39.999rem), (max-aspect-ratio: 1/1.7) {
  .card-content { gap: 1vh; }
  .s-intro { text-align: left; }
  .s-subtitles { flex-direction: row-reverse; }
}
</style>
