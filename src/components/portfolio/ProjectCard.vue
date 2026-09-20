<script setup>
import {publicAsset} from '../../utils/publicAsset';
defineProps({ cover: String, title: String, intro: String, category: String, tags: Array, year: String, link: String, route: String });
</script>
<template>
  <article class="project-card section">
    <img :src="publicAsset(cover)" :alt="title" class="s-cover" width="600" height="600">
    <div class="card-content">
      <p class="s-year">{{ year }}</p>
      <h2 class="s-title">
        <RouterLink v-if="route" :to="route">{{ title }}</RouterLink>
        <a v-else-if="link" :href="link" target="_blank" rel="noopener noreferrer">{{ title }}<span class="external" aria-hidden="true"> ↗</span></a>
        <template v-else>{{ title }}</template>
      </h2>
      <p v-if="category" class="category">{{ category }}</p>
      <ul v-if="tags?.length" class="tags"><li v-for="tag in tags" :key="tag">{{ tag }}</li></ul>
      <p v-if="intro" class="s-intro">{{ intro }}</p>
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
.tags { display: flex; flex-wrap: wrap; gap: .5rem; padding: 0; margin: 0; list-style: none; }
.tags li { padding: .15rem .6rem; border: 1px solid var(--border-color); border-radius: .25rem; overflow-wrap: anywhere; max-width: 100%; font-size: .875rem; }
.s-intro { max-width: 65ch; }
@media (min-width: 40rem) { .project-card { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: clamp(1.5rem, 4vw, 3rem); } }
</style>
