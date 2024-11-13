<script setup>
import LanguageSwitch from "./LanguageSwitch.vue";
import router from "../router.js";

const props = defineProps({
  cover: String,
  title: String,
  year: String,
  category: String,
})

function goBack() {
  router.back();
}

function goHome() {
  router.replace('/');
}
</script>
<template>
  <div class="p-hd">
    <div class="p-header p-inline">
      <div class="p-left">
        <div class="p-cover">
          <img :src="cover" class="ph-cover">
          <div class="ph-divider-v"></div>
        </div>
        <div class="ph-set">
          <div class="ph-year">{{ category }}, {{ year }}</div>
          <div class="ph-title">{{ title }}</div>
        </div>
      </div>
      <div class="p-button">
        <button class="pb-button" @click="goHome">{{ $t("menu.main") }}</button>
        <button class="pb-button" @click="goBack">{{ $t("menu.back") }}</button>
      </div>

    </div>
    <div class="p-horizontal p-inline">
      <div class="p-left">
        <div class="p-divider-inline"></div>
        <div class="p-divider-center"></div>
        <div class="p-divider-inline p-divider-right"></div>
      </div>
      <LanguageSwitch fontSize="calc(var(--vsr) * 2)"></LanguageSwitch>
    </div>
    <div class="p-inline p-occupy">
      <div class="p-divider-content"></div>
    </div>
  </div>
</template>

<style scoped>
.p-hd {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  background-color: var(--background-color);
}

.p-header {
  position: fixed;
  height: calc(var(--vsr) * 15);
  padding-top: calc(var(--vsr) * 5);
}

.p-left {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  background-color: var(--background-color);
}

.p-cover {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: end;
}

.ph-cover {
  width: calc(var(--vsr) * 15);
  height: calc(var(--vsr) * 15);
}

.ph-divider-v {
  width: 2px;
  height: calc(var(--vsr) * 15);
  margin-inline: calc(var(--vsr) * 5);
  background-color: var(--hover-color);
}

.ph-set {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  height: calc(var(--vsr) * 15);
}

.ph-title {
  color: var(--title-color);
  text-shadow: 2px 2px 2px var(--hover-color);
  font-size: calc(var(--vsr) * 8);
  line-height: 1;
  align-items: center;
  vertical-align: top;
}

.ph-year {
  color: var(--hover-color);
  font-size: calc(var(--vsr) * 3);
  line-height: 1.5;
  align-items: center;
}

.p-inline {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - calc(var(--vsr) * 10));
  padding-inline: calc(var(--vsr) * 5);
  background-color: var(--background-color);
}

.p-horizontal {
  position: fixed;
  height: calc(var(--vsr) * 10 + 2px);
  top: calc(var(--vsr) * 20);
}

.p-divider-inline {
  height: 2px;
  margin-block: calc(var(--vsr) * 5);
  width: calc(var(--vsr) * 20);
  background-color: var(--hover-color);
}

.p-divider-center {
  height: calc(var(--vsr) * 10);
  width: 2px;
  background-color: var(--hover-color);
}

.p-divider-content {
  position: fixed;
  height: calc(var(--vsr) * 15);
  width: 2px;
  top: calc(var(--vsr) * 30);
  margin-left: calc(var(--vsr) * 20);
  background-color: var(--hover-color);
}

.p-occupy {
  height: calc(var(--vsr) * 15);
}

.p-button {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  text-align: end;
  height: 100%;
}

.pb-button {
  background: none;
  border: none;
  color: var(--context-color);
  cursor: pointer;
  padding: 0;
  font-size: calc(var(--vsr) * 2);
  text-align: right;
  margin-top: calc(var(--vsr) * 1.5);
  line-height: 1;
  vertical-align: bottom;
}

.pb-button:hover {
  color: var(--hover-color);
}


</style>