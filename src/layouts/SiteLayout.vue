<script setup>
import SiteHeader from '../components/layout/SiteHeader.vue';
import '../styles/portfolio.css';
defineProps({ title: String, portfolio: Boolean });
</script>
<template>
  <div class="page-container" :class="{'portfolio-layout': portfolio}">
    <SiteHeader :title="title"><slot name="subtitle" /></SiteHeader>
    <main id="main-content" tabindex="-1"><slot /></main>
  </div>
</template>

<style scoped>
.page-container { padding-top: 0; }
</style>
