<script setup>
import {onMounted, onUnmounted} from "vue";
import {clearAnimation, initialize} from "../three/home.js";
import router from "../router.js";
import LanguageSwitch from "../components/LanguageSwitch.vue";

// function for debug
function go2Debug() {
  router.push('/debug')
}

function go2About() {
  router.push('/about')
}

function go2Works() {
  router.push('/works')
}

function go2Projects() {
  router.push('/projects')
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
  clearAnimation();
});

</script>

<template>
  <div id="background"></div>
  <div id="f-center">
    <h1 id="h-title">PANNIC</h1>
    <div class="m-text" style="padding-left: 1vw">
      <p>
        {{ $t("home.name") }}<br>
        {{ $t("home.master") }}<br>
        {{ $t("home.bachelor") }}<br>
        Co-founder and Developer of <a href="https://kaiwuart.cn/" target="_blank">kaiwuart.cn</a>
      </p>
      <LanguageSwitch></LanguageSwitch>
      <p id="m-intro">
        As a creative programmer, Innovative developer and project manager, successfully launching a mobile online trading app. From my academic background in creative programming, I have been specialised in integrating neural networks with game engines, demonstrating a strong commitment to the game industry.
      </p>
      <div class="f-social-v">
        <a href="mailto:pannic1984@outlook.com"><img class="p-social" src="../assets/icon_email.png" alt="Email"></a>
        <a href="https://github.com/Pannic17" target="_blank"><img class="p-social" src="../assets/icon_github.png" alt="Github"/></a>
        <a href="https://www.instagram.com/pannic17/" target="_blank"><img class="p-social" src="../assets/icon_ins.png" alt="Instagram"></a>
      </div>

      <div class="f-button">
        <button
            class="sub-button"
            @click="go2About"
        >{{ $t("menu.about") }}</button>
        <button
            class="sub-button"
            @click="go2Works"
        >{{ $t("menu.works") }}</button>
        <button
            class="sub-button"
            @click="go2Projects"
        >{{ $t("menu.projects") }}</button>
      </div>

      <div class="f-social-c">
        <a href="mailto:pannic1984@outlook.com"><img class="p-social" src="../assets/icon_email.png" alt="Email"></a>
        <a href="https://github.com/Pannic17" target="_blank"><img class="p-social" src="../assets/icon_github.png" alt="Github"/></a>
        <a href="https://www.instagram.com/pannic17/" target="_blank"><img class="p-social" src="../assets/icon_ins.png" alt="Instagram"></a>
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

#f-center {
  width: 80%;
  margin: 0 auto;
  text-align: left;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none;    /* Firefox */
  -ms-user-select: none;     /* IE10+/Edge */
  user-select: none;
}

#h-title {
  color: var(--title-color);
  margin-top: 8vh;
  padding-bottom: 2vh;
  margin-bottom: 0;
  font-size: calc(var(--vsr) * 20);
  //width: 84%;
}

.m-text {
  color: var(--context-color);
}

.f-button {
  display: flex;
  justify-content: space-between;
  padding-block: 2vh;
}

.sub-button {
  background: none;
  border: none;
  color: var(--title-color); /* 或者您希望的任何颜色 */
  cursor: pointer;
  padding: 0;
  //font-weight: bold;
  font-size: calc(var(--vsr) * 3);
  padding-block: calc(var(--vsr) * 1);
}

.sub-button:hover {
  //background-color: #aaaaaa;
  color: var(--hover-color);
  //border-radius: 5px;
  //font-weight: bold;
  //padding-block: calc(var(--vsr) * 1);
}

#three-canvas {
  pointer-events: none;
}

#m-intro {
  width: 50%;
}

.f-social-v{
  text-align: right;
}

.f-social-c{
  display: none;
}

.p-social {
  width: 5vh;
  padding-left: 2vh;
}

@media screen and (max-aspect-ratio: 1/1.7) {
  #h-title {
    padding-top: 2vh;
  }
  #m-intro {
    padding-top: 25vh;
    width: 100%;
  }
  .f-button {
    display: flex;
    flex-direction: column;
    padding-block: 2vh;
  }
  .sub-button {
    background: none;
    border: none;
    color: var(--title-color); /* 或者您希望的任何颜色 */
    cursor: pointer;
    padding: 0;
    font-size: 3vh;
    margin: 1vh;
  }
  .f-social-v {
    display: none;
  }
  .f-social-c {
    display: inherit;
    text-align: center;
    padding-bottom: 3vh;
  }
  .p-social {
    padding: 1vh;
  }
}
</style>