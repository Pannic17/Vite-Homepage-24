<script setup>
import {publicAsset} from '../utils/publicAsset';
import {kaiwu} from '../content/portfolio';
</script>
<template>
  <section class="kaiwu">
    <header class="k-head">
      <img class="k-logo" src="../assets/logo_kaiwu.png" alt="" width="112" height="112">
      <div><h2>{{ $t(kaiwu.titleKey) }}</h2><a class="text-link" :href="kaiwu.href">kaiwuart.cn ↗</a></div>
    </header>
    <div class="posters">
      <img v-for="poster in kaiwu.posters" :key="poster.number" :src="publicAsset(poster.src)" :alt="$t('kaiwu.poster', {number:poster.number})">
    </div>
    <p>{{ $t(kaiwu.paragraphs[0]) }}</p>
    <ul class="kaiwu-links">
      <li v-for="link in kaiwu.links" :key="link.id"><a class="text-link" :href="link.href">{{ $t(link.labelKey) }}</a></li>
    </ul>
    <p>{{ $t(kaiwu.paragraphs[1]) }}</p>
  </section>
</template>
<style scoped>
.kaiwu { display: grid; gap: 1.5rem; margin-bottom: var(--space-section); }
.k-head { display: flex; align-items: center; flex-wrap: wrap; gap: 1.5rem; }
.k-head > div { min-width: 0; }
.k-head a { margin-top: .75rem; }
.k-logo { width: 7rem; height: 7rem; object-fit: contain; }
.posters { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; align-items: start; }
.posters img { width: 100%; }
.kaiwu-links { display: flex; flex-wrap: wrap; gap: .75rem; list-style: none; padding: 0; margin: 0; }
.kaiwu p { max-width: 75ch; }
@media (min-width: 64rem) { .posters { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
</style>
