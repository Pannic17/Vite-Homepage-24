<script setup>
import SiteLayout from '../layouts/SiteLayout.vue';
import ProjectCard from '../components/portfolio/ProjectCard.vue';
import {works} from '../content/portfolio';
</script>
<template>
  <SiteLayout portfolio :title="$t('menu.works')">
    <template #subtitle><i18n-t keypath="pages.worksSubtitle" scope="global"><template #name><span class="portfolio-brand">PANNIC</span></template></i18n-t></template>
    <ProjectCard v-for="(entry, index) in works" :key="entry.id" :entry="entry" :eager="index === 0" />
  </SiteLayout>
</template>
