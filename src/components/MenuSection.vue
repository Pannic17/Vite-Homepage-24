<script setup>
import ProjectCard from './portfolio/ProjectCard.vue';
// Compatibility boundary until page content moves to data in phase 3.
defineOptions({ inheritAttrs: false });
</script>
<template><ProjectCard v-bind="$attrs" /></template>
