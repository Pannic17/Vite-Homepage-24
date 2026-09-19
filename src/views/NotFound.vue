<script setup>
import {useI18n} from 'vue-i18n';
const {t} = useI18n();
</script>

<template>
  <main class="not-found">
    <h1>404</h1>
    <p>{{ t('status.notFound') }}</p>
    <RouterLink to="/">{{ t('menu.main') }}</RouterLink>
  </main>
</template>

<style scoped>
.not-found { max-width: 48rem; margin: 0 auto; padding: 2rem; }
</style>
