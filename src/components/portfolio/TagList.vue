<script setup>
import {useI18n} from 'vue-i18n';
defineProps({tags:{type:Array,default:() => []}, inline:Boolean});
const {t} = useI18n();
</script>
<template>
  <ul v-if="tags.length" class="tags" :class="{'tags-inline': inline}"><li v-for="tag in tags" :key="typeof tag === 'string' ? tag : tag.key">{{ typeof tag === 'string' ? tag : t(tag.key) }}</li></ul>
</template>
<style scoped>
.tags { display: flex; flex-wrap: wrap; gap: .5rem; padding: 0; margin: 0; list-style: none; }
.tags li { padding: .15rem .6rem; border: 1px solid var(--border-color); border-radius: .25rem; overflow-wrap: anywhere; max-width: 100%; font-size: .875rem; }
.tags-inline { justify-content: flex-end; gap: 0; min-width: 0; color: var(--context-color); }
.tags-inline li { padding: 0; border: 0; font-size: inherit; }
.tags-inline li::after { content: '|'; color: var(--hover-color); margin-inline: .35em; }
</style>
