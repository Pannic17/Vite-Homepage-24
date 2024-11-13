<script setup>

import router from "../router.js";
import PageHeader from "../components/PageHeader.vue";
import {computed} from "vue";
import {useI18n} from "vue-i18n";

const props = defineProps({
  cover: String,
  title: String,
  year: String,
  category: String,
})

const { t } = useI18n();
function goBack() {
  router.back();
}

const arMini = computed(() => t('tags.ar-mini'));
</script>

<template>
  <div style="overflow-x: hidden">
    <PageHeader
        cover="./image/ZAR-Cover.png"
        title="Test Page"
        :category="arMini"
        year="December 2024"
    ></PageHeader>
    <div class="p-category"></div>
    <div class="p-main" ></div>
  </div>

  <!--
    <div class="ph-info">
      <div class="ph-subtitles">
        <div class="ph-year"></div>
        <div class="ph-tags"></div>
      </div>
  -->

</template>

<style scoped>

.p-category {
  width: 10vw;
}



.p-main {
  height: 200vh;
  overflow-y: auto;
  background-color: #888888;
  margin-top: calc(var(--vsr) * 15);
  margin-left: calc(var(--vsr) * 30);
  width: calc(100% - calc(var(--vsr) * 35));
}


</style>