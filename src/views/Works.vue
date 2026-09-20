<script setup>
import SiteLayout from '../layouts/SiteLayout.vue';
import ProjectCard from '../components/portfolio/ProjectCard.vue';
import {works} from '../content/portfolio';
</script>
<template>
  <SiteLayout :title="$t('menu.works')">
    <template #subtitle>{{ $t('pages.worksSubtitle') }}</template>
    <ProjectCard v-for="entry in works" :key="entry.id" :entry="entry" />
  </SiteLayout>
</template>
