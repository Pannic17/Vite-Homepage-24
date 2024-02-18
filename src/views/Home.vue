<script setup>
import {onMounted, onUnmounted} from "vue";
import {initialize} from "../three/home.js";
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const i18n = useI18n();
const current = ref(i18n.locale.value);
function setLanguage(lang) {
  console.log("CLICK LANGUAGE")
  i18n.locale.value = lang;
  current.value = lang;
}

onMounted(() => {

  // initialize();
  initialize();
  window.onresize = function (){
    location.reload();
  }
})

onUnmounted(() => {
  // window.removeEventListener('resize', adjustTitleAlignment);
});

</script>

<template>
  <div id="background"  style="background-color: #1a1a1a"></div>
  <div id="f-center">
    <h1 id="h-title">PANNIC</h1>
    <div class="m-text" style="padding-left: 1vw">
      <p>
        {{ $t("home.name") }}<br>
        {{ $t("home.master") }}<br>
        {{ $t("home.bachelor") }}<br>
        Co-founder and Developer of <a href="https://kaiwuart.cn/">kaiwuart.cn</a>
      </p>
      <div style="padding: 0; margin: 0">
        <button
            :class="{ 'is-active': current === 'zh-CN' }"
            @click="setLanguage('zh-CN')"
            class="lang-button"
        >中文</button> |
        <button
            :class="{ 'is-active': current === 'en-US' }"
            @click="setLanguage('en-US')"
            class="lang-button"
        >ENGLISH</button>
      </div>
      <p id="m-intro">
        As a creative programmer, Innovative developer and project manager, successfully launching a mobile online trading app. From my academic background in creative programming, I have been specialised in integrating neural networks with game engines, demonstrating a strong commitment to the game industry.
      </p>
      <div class="f-social">
        <a href="mailto:pannic1984@outlook.com"><img class="p-social" src="../assets/icon_email.png" alt="Email"></a>
        <a href="https://github.com/Pannic17"><img class="p-social" src="../assets/icon_github.png" alt="Github"/></a>
        <a href="https://www.instagram.com/pannic17/"><img class="p-social" src="../assets/icon_ins.png" alt="Instagram"></a>
      </div>
    </div>
  </div>
  <div id="three-canvas"></div>
</template>

<style scoped>
#background, #three-canvas {
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /*background-color: #1a1a1a;*/
}

#background {
  z-index: -1;
}

#f-center {
  width: 80%;
  margin: 0 auto;
  text-align: left;
}

#h-title {
  color: #f9f9f9;
  padding-top: 9vh;
  padding-bottom: 2vh;
  margin-bottom: 0;
  font-size: calc(var(--vsr) * 20);
  //width: 84%;
}

p {
  color: #aaaaaa;
}

a {
  color: inherit;
}

.m-text {
  color: #aaaaaa;
}

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

#three-canvas {
  pointer-events: none;
}

#m-intro {
  width: 50%;
}

.f-social{
  text-align: right;
}

.p-social {
  width: 5vh;
  padding-left: 2vh;

}

@media screen and (max-aspect-ratio: 1/2) {
  #h-title {
    padding-top: 2vh;
  }
  #m-intro {
    padding-top: 25vh;
    width: 100%;
  }
}
</style>