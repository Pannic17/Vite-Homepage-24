<script setup>
import {useI18n} from 'vue-i18n';
defineProps({tags:{type:Array,default:() => []}});
const {t} = useI18n();
</script>
<template>
  <ul v-if="tags.length" class="tags"><li v-for="tag in tags" :key="typeof tag === 'string' ? tag : tag.key">{{ typeof tag === 'string' ? tag : t(tag.key) }}</li></ul>
</template>
<style scoped>
.tags { display: flex; flex-wrap: wrap; gap: .5rem; padding: 0; margin: 0; list-style: none; }
.tags li { padding: .15rem .6rem; border: 1px solid var(--border-color); border-radius: .25rem; overflow-wrap: anywhere; max-width: 100%; font-size: .875rem; }
</style>
