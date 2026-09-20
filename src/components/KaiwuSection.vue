<script setup>
import {publicAsset} from '../utils/publicAsset';
</script>
<template>
  <section class="kaiwu">
    <header class="k-head">
      <img class="k-logo" src="../assets/logo_kaiwu.png" alt="" width="112" height="112">
      <div><h2>开物KaiwuArt</h2><a class="text-link" href="https://kaiwuart.cn/">kaiwuart.cn ↗</a></div>
    </header>
    <div class="posters">
      <img v-for="number in 4" :key="number" :src="publicAsset('image/kaiwu/KW-poster' + number + '.jpg')" :alt="'Kaiwu poster ' + number">
    </div>
    <p>Kaiwu is a NFT trade platform in China focusing on 3D digital artwork market. Focusing on 3D digital artworks and their application scenes in Metaverse, games, popular culture, collections and CG industries.</p>
    <ul class="kaiwu-links">
      <li v-for="label in ['3D Viewer', 'Mobile App', 'Websites', 'Cloud & Backend', 'NFT & Zhixin Chain']" :key="label"><a class="text-link" href="https://kaiwuart.cn/3d-viewer">{{ label }}</a></li>
    </ul>
    <p>As the project manager and developer, I participated in every aspect of the project development, including the mobile apps for Android/iOS, WeChat mini-program, official website, cloud servers, databases, 3D rendering, and the publishing and trading of encrypted tokens. By collaborating with different developers and designers, we successfully launched KaiwuArt and rolled out a series of events.</p>
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
