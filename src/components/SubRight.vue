<script setup>
import LanguageSwitch from "../components/LanguageSwitch.vue";
import router from "../router.js";

const props = defineProps({
  fontSize: {
    type: String,
    default: 'calc(var(--vsr) * 2)',
  },
});

function goBack() {
  router.back();
}

</script>

<template>
  <div class="h-right">
    <LanguageSwitch fontSize="calc(var(--vsr) * 2)"></LanguageSwitch>
    <button id="b-back" @click="goBack">{{ $t("menu.back") }}</button>
  </div>
</template>

<style scoped>
.h-right {
  text-align: right;
}

#b-back {
  background: none;
  border: none;
  color: var(--context-color);
  cursor: pointer;
  padding: 0;
//font-weight: bold;
  font-size: calc(var(--vsr) * 2);
//padding-block: calc(var(--vsr) * 1);
  text-align: right;
  margin-top: calc(var(--vsr) * 1.5);
  line-height: 1.5;
}

#b-back:hover {
  color: var(--hover-color);
}
</style>