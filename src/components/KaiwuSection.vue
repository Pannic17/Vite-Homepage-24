<script setup>
import ResponsiveImage from './ResponsiveImage.vue';
import {kaiwu} from '../content/portfolio';
</script>
<template>
  <section class="kaiwu corner-frame">
    <header class="k-head">
      <img class="k-logo" src="../assets/logo_kaiwu.png" alt="" width="112" height="112">
      <div><h2>{{ $t(kaiwu.titleKey) }}</h2><RouterLink class="k-link" :to="kaiwu.destination.to">KaiwuArt</RouterLink></div>
    </header>
    <RouterLink class="k-detail" :to="kaiwu.destination.to">{{ $t('kaiwu.details') }}</RouterLink>
    <div class="posters">
      <ResponsiveImage v-for="poster in kaiwu.posters" :key="poster.number" :src="poster.src" :alt="$t('kaiwu.poster', {number:poster.number})" sizes="22.5vw" loading="eager" />
    </div>
    <p>{{ $t(kaiwu.paragraphs[0]) }}</p>
    <ul class="kaiwu-links">
      <li v-for="link in kaiwu.links" :key="link.id"><RouterLink v-if="link.destination.kind==='internal'" class="k-link" :to="link.destination.to">{{ $t(link.labelKey) }}</RouterLink><span v-else class="k-label">{{ $t(link.labelKey) }}</span></li>
    </ul>
    <p>{{ $t(kaiwu.paragraphs[1]) }}</p>
  </section>
</template>
<style scoped>
.kaiwu { display: grid; gap: 1vh; margin-block: 4vh; padding-block: 1vh; }
.k-head { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.k-head > div { min-width: 0; text-align: right; margin-left: auto; }
.k-head h2 { font-size: max(1.5rem, 8vmin); line-height: 1.2; text-shadow: 2px 2px 2px var(--hover-color); }
.k-head a { margin-top: 1.5vmin; }
.k-logo { width: 21vmin; height: 21vmin; object-fit: contain; }
.k-link, .k-label { display: inline-flex; align-items: center; min-height: 44px; min-width: 44px; color: var(--context-color); font-size: max(.875rem, 2vmin); }
.k-detail { justify-self: center; display: inline-flex; align-items: center; justify-content: center; width: max(10rem, 24vh); max-width: 100%; min-height: max(44px, 5vh); border: 1px solid var(--hover-color); color: var(--context-color); font-size: max(.875rem, 2vmin); text-decoration: none; margin-block: 1vh; }
.posters { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); align-items: start; }
.posters :deep(img) { width: 100%; }
.kaiwu-links { display: flex; justify-content: center; flex-wrap: wrap; list-style: none; padding: 0; margin: 0; }
.kaiwu-links li { max-width: 100%; }
.kaiwu-links li:not(:last-child)::after { content: '|'; color: var(--hover-color); margin-inline: .35em; }
.kaiwu p { margin-block: 1vh; }
@media (hover: hover) { .k-link:hover, .k-detail:hover { color: var(--hover-color); } }
</style>
