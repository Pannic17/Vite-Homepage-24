<script setup>
import SiteHeader from '../components/layout/SiteHeader.vue';
defineProps({ title: String });
</script>
<template>
  <div class="page-container">
    <SiteHeader :title="title"><slot name="subtitle" /></SiteHeader>
    <main id="main-content" tabindex="-1"><slot /></main>
  </div>
</template>
