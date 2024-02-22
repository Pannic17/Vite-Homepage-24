<script setup>

import HelloWorld from "../App.vue";
import SubRight from "../components/SubRight.vue";
import MenuSection from "../components/MenuSection.vue";
import {computed, onMounted} from "vue";
import {useI18n} from "vue-i18n";

onMounted(() => {
  // window.removeEventListener('resize', adjustTitleAlignment);
  let topHeight = document.getElementById('f-top').clientHeight;
  const block = document.getElementById('block')
  topHeight = topHeight - 0.02 * window.innerHeight;
  block.style.height = `${topHeight}px`
})

const { t } = useI18n();

const tagsGCS = computed(() => {
  const tag = t("tags.installment");
  return ['Unreal 5', 'XR', 'OpenCV', 'YOLO', tag]
});

const tagsABP = computed(() => {
  const tag = t("tags.installment");
  return ['Unreal 4', 'OpenCV', tag]
});

const xrGame = computed(() => t('tags.xr-game'));
const xrInteractive = computed(() => t('tags.xr-interactive'));
const aiGame = computed(() => t('tags.ai-game'));
const webGame = computed(() => t('tags.web-game'));
const aiExperiment = computed(() => t('tags.ai-experiment'));

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
        intro=
            "CatNet是一款结合了神经网路的AR游戏。
            该游戏由Unity开发，利用Unity Barracuda插件将轻量级神经网络部署到移动端游戏中，
            实现通过手机摄像头利用神经网络对现实生物进行识别分类和特征提取，
            并利用获得的数据程序化生成相应的3D模型。
            通过该项目对未来可能的AR游戏方向进行实验性的探索，研究通过主流游戏引擎将轻量化模型部署在移动端的可能性。"
        :category="xrGame"
        :tags="['Unity', 'AR', 'ResNet', 'OpenCV']"
        year="2021"
    ></MenuSection>

    <MenuSection
        cover="./image/GCS-Cover.jpg"
        title="Chronoscape"
        intro=
            "Chronoscape时空景观 是一款基于UE5引擎开发的XR交互游戏装置。
            在这个作品中"
        :category="xrInteractive"
        :tags="tagsGCS"
        year="June 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/OGX-Cover.png"
        title="O Galaxy"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        :category="aiGame"
        :tags="['Unreal 5', 'Stable Diffusion', 'OpenCV', 'Django']"
        year="Fall 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/C1F-Cover.png"
        title="PokemonPad"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        :category="webGame"
        :tags="['Three.js', 'Vue.js', 'WebGL']"
        year="December 2022"
    ></MenuSection>

    <MenuSection
        cover="./image/ABP-Cover.png"
        title="Anybody Problem"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        :category="xrGame"
        :tags="tagsABP"
        year="March 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/C2F-Cover.png"
        title="Ai, Art & hAsh"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        :category="aiExperiment"
        :tags="['Python', 'Stable Diffusion', 'OpenCV']"
        year="March 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/C3F-Cover.png"
        title="AI Shijing Paintings"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        :category="aiExperiment"
        :tags="['Python', 'Stable Diffusion', 'ChatGPT', 'LoRA']"
        year="June 2023"
    ></MenuSection>



  </div>
<!--  <h1>UNDER<br>CONSTRUCTION</h1>-->
  <div style="background-color: var(--background-color); width: 90vw; height: 2vh"></div>
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