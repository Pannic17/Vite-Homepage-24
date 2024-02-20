<script setup>

import HelloWorld from "../App.vue";
import SubRight from "../components/SubRight.vue";
import MenuSection from "../components/MenuSection.vue";
import {onMounted} from "vue";

onMounted(() => {
  // window.removeEventListener('resize', adjustTitleAlignment);
  const topHeight = document.getElementById('f-top').clientHeight;
  const block = document.getElementById('block')
  block.style.height = `${topHeight}px`
})
</script>

<template>
  <hello-world></hello-world><div id="background"></div>
  <div class="f-center">
    <div id="f-top">
      <div class="h-sub">
        <div class="h-left">
          <h2>WORKS</h2>
          <div class="subtitle">
            <span>Artworks by</span><span class="t-cyan"> PANNIC </span><span>作品</span>
          </div>
        </div>
        <SubRight></SubRight>
      </div>
      <div style="height: 1px; background-color: var(--context-color); margin-block: 1vh"></div>
    </div>

    <div id="block" style="background-color: var(--background-color); width: 90vw"></div>


    <MenuSection
        cover="./image/CAT-Cover.png"
        title="CatNet"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        category="XR游戏"
        :tags="['Unity', 'AR', 'ResNet', 'OpenCV']"
    ></MenuSection>

    <MenuSection
        cover="./image/ZAR-Cover.png"
        title="Chronoscape"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        category="XR交互"
        :tags="['Unreal 5', 'XR', 'OpenCV', 'YOLO', '装置']"
    ></MenuSection>

    <MenuSection
        cover="./image/ZAR-Cover.png"
        title="O Galaxy"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        category="AI游戏"
        :tags="['Unreal 5', 'Stable Diffusion', 'OpenCV', 'Django']"
    ></MenuSection>

    <MenuSection
        cover="./image/ZAR-Cover.png"
        title="PokemonPad"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        category="Web游戏"
        :tags="['Three.js', 'Vue.js', 'WebGL']"
    ></MenuSection>

    <MenuSection
        cover="./image/ZAR-Cover.png"
        title="Anybody Problem"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        category="XR游戏"
        :tags="['Unreal 4', 'XR', 'OpenCV', 'YOLO', '装置']"
    ></MenuSection>

    <MenuSection
        cover="./image/ZAR-Cover.png"
        title="Ai, Art & hAsh"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        category="AI艺术实验"
        :tags="['Python', 'Stable Diffusion', 'OpenCV']"
    ></MenuSection>

    <MenuSection
        cover="./image/ZAR-Cover.png"
        title="AI Shijing Paintings"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        category="AI艺术实验"
        :tags="['Python', 'Stable Diffusion', 'ChatGPT', 'LoRA']"
    ></MenuSection>



  </div>
  <h1>UNDER<br>CONSTRUCTION</h1>
</template>

<style scoped>
#f-top {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 90vw;
  background: var(--background-color);
}

.f-center {
  width: 90%;
  margin: 0 auto;
  text-align: left;
}

.subtitle {
  font-size: calc(var(--vsr) * 2);
}

.t-cyan {
  color: var(--hover-color);
}

.h-sub {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

</style>