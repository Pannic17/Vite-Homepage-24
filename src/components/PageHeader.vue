<script setup>
import SiteHeader from './layout/SiteHeader.vue';
defineProps({title: String, year: String, category: String, backTo: {type: String, default: '/'}});
</script>
<template>
  <SiteHeader class="d-header" :title="title" :back-to="backTo">
    {{ category }}<template v-if="category && year"> · </template>{{ year }}
  </SiteHeader>
</template>
