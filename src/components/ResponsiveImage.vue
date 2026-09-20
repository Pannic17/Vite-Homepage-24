<script setup>
import {computed} from 'vue';
import {publicAsset} from '../utils/publicAsset.js';
import variants from '../content/imageVariants.json';
defineOptions({inheritAttrs:false});
const props = defineProps({src:{type:String,required:true}, alt:{type:String,default:''}, sizes:{type:String,default:'100vw'}, loading:{type:String,default:'lazy'}});
const image = computed(() => variants[props.src]);
const srcset = computed(() => image.value?.variants.map(item => `${publicAsset(item.src)} ${item.width}w`).join(', '));
</script>
<template>
  <picture>
    <source v-if="image" type="image/webp" :srcset="srcset" :sizes="sizes">
    <img v-bind="$attrs" :src="publicAsset(src)" :alt="alt" :width="image?.width" :height="image?.height" :loading="loading" decoding="async">
  </picture>
</template>
<style scoped>
picture { display: contents; }
source { display: none; }
</style>
