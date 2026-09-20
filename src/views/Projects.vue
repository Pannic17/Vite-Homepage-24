<script setup>
import SiteLayout from '../layouts/SiteLayout.vue';
import ProjectCard from '../components/portfolio/ProjectCard.vue';
import KaiwuSection from '../components/KaiwuSection.vue';
import {projects} from '../content/portfolio';
</script>
<template>
  <SiteLayout :title="$t('menu.projects')">
    <template #subtitle>{{ $t('pages.projectsSubtitle') }}</template>
    <KaiwuSection />
    <ProjectCard v-for="entry in projects" :key="entry.id" :entry="entry" />
  </SiteLayout>
</template>
