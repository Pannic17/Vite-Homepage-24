<script setup>

import LanguageSwitch from "../../components/LanguageSwitch.vue";
const props = defineProps({
  cover: String,
  title: String,
  intro: String,
  category: String,
  tags: Array,
  year: String,
  link: String,
  route: String
})
</script>

<template>
  <div id="background"></div>
  <div class="d-center">
    <div id="d-top">
      <div class="d-header">
        <div class="dh-right">
          <div class="dhr-top">
            <LanguageSwitch fontSize="calc(var(--vsr) * 2)"></LanguageSwitch>
            <h3 class="dhr-year d-sub">{{ year }}</h3>
          </div>
          <div class="dhr-bottom">
            <div v-for="(content, index) in tags" :key="index" class="dhr-tags d-sub">
              {{ content }}<span style="color: var(--hover-color)">&ensp;|&ensp;</span>
            </div>
            <h3 class="dhr-category d-sub">{{ category }}</h3>
          </div>
        </div>
        <div class="h-left"></div>
      </div>
    </div>
  </div>

  <div id="block" style="background-color: var(--background-color); width: 90vw"></div>
</template>

<style scoped>

</style>