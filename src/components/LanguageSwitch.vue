<script setup>
import {useI18n} from "vue-i18n";
import {ref} from "vue";

const i18n = useI18n();
const current = ref(i18n.locale.value);
function setLanguage(lang) {
  i18n.locale.value = lang;
  current.value = lang;
}

const props = defineProps({
  fontSize: String
})

console.log(props.fontSize)

</script>

<template>
  <div style="padding: 0; margin: 0">
    <button
        :class="{ 'is-active': current === 'zh-CN' }"
        :style="{ fontSize: fontSize || 'inherit' }"
        @click="setLanguage('zh-CN')"
        class="lang-button"
    >中文</button> |
    <button
        :class="{ 'is-active': current === 'en-US' }"
        :style="{ fontSize: fontSize || 'inherit' }"
        @click="setLanguage('en-US')"
        class="lang-button"
    >ENGLISH</button>
  </div>
</template>

<style scoped>
.lang-button {
  background: none;
  border: none;
  color: inherit; /* 或者您希望的任何颜色 */
  cursor: pointer;
  padding: 0;
  font-size: inherit;
}

.is-active {
  text-decoration: underline;
}
</style>