<script setup>
import SiteLayout from '../layouts/SiteLayout.vue';
import ProjectCard from '../components/portfolio/ProjectCard.vue';
import KaiwuSection from '../components/KaiwuSection.vue';
import {projects} from '../content/portfolio';
</script>
<template>
  <SiteLayout portfolio :title="$t('menu.projects')">
    <template #subtitle><i18n-t keypath="pages.projectsSubtitle" scope="global"><template #name><span class="portfolio-brand">PANNIC</span></template></i18n-t></template>
    <KaiwuSection />
    <ProjectCard v-for="entry in projects" :key="entry.id" :entry="entry" />
  </SiteLayout>
</template>
