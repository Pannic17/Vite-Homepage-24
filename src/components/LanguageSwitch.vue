<script setup>
import {useI18n} from 'vue-i18n';
const {locale} = useI18n({useScope: 'global'});
</script>
<template>
  <div class="language-switch" role="group" :aria-label="$t('accessibility.language')">
    <button type="button" lang="zh-CN" :aria-pressed="locale === 'zh-CN'" @click="locale = 'zh-CN'">中文</button>
    <span aria-hidden="true">/</span>
    <button type="button" lang="en" :aria-pressed="locale === 'en-US'" @click="locale = 'en-US'">ENGLISH</button>
  </div>
</template>
<style scoped>
.language-switch { display: flex; align-items: center; gap: .25rem; }
button { min-height: 44px; min-width: 44px; padding: .5rem; border: 0; background: none; }
button[aria-pressed="true"] { text-decoration: underline; text-underline-offset: .3em; color: var(--hover-color); }
</style>
