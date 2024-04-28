<script setup>

import HelloWorld from "../App.vue";
import SubRight from "../components/SubRight.vue";
import MenuSection from "../components/MenuSection.vue";
import {computed, onMounted} from "vue";
import {useI18n} from "vue-i18n";
import Kaiwu from "../components/Kaiwu.vue";

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

const iCAT = computed(() => t('intro.CAT'));
const iGCS = computed(() => t('intro.GCS'));

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
        :intro="iCAT"
        :category="xrGame"
        :tags="['Unity', 'AR', 'ResNet', 'OpenCV']"
        year="2021"
    ></MenuSection>

    <MenuSection
        cover="./image/GCS-Cover.jpg"
        title="Chronoscape"
        :intro="iGCS"
        :category="xrInteractive"
        :tags="tagsGCS"
        year="June 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/OGX-Cover.png"
        title="O Galaxy"
        intro="利用棱镜、摄像机和投影仪，通过捕捉现实世界的图像创建虚拟世界"
        :category="aiGame"
        :tags="['Unreal 5', 'Stable Diffusion', 'OpenCV', 'Django']"
        year="Fall 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/C1F-Cover.png"
        title="PokemonPad"
        intro="一款基于Three.js和WebGL开发的Web音乐小游戏"
        :category="webGame"
        :tags="['Three.js', 'Vue.js', 'WebGL']"
        year="December 2022"
        link="https://pannic17.github.io/C1-Final/"
    ></MenuSection>

    <MenuSection
        cover="./image/C3F-Cover.png"
        title="AI Shijing Paintings"
        intro="An experiment of using AI to understand ancient Chinese Poem and reconstruct paints."
        :category="aiExperiment"
        :tags="['Python', 'Stable Diffusion', 'ChatGPT', 'LoRA']"
        year="June 2023"
        link="https://github.com/Pannic17/C3-Final"
    ></MenuSection>

    <MenuSection
        cover="./image/C2F-Cover.png"
        title="Ai, Art & hAsh"
        intro=
            "The generative art of computer's understanding, memory and validation of your picture.
            For this project, I created a Python script that uses a Stable Diffusion model to generate an image based on a hash string.
            I then used the generated image to cast a face in an input image. The script uses OpenCV to detect faces in an input image,
            and then uses a binary mask to replace the face with the generated image.
            The script also uses OpenCV to compute the perceptual hash of an input image."
        :category="aiExperiment"
        :tags="['Python', 'Stable Diffusion', 'OpenCV']"
        year="March 2023"
        link="https://github.com/Pannic17/C2-Final"
    ></MenuSection>

    <MenuSection
        cover="./image/ABP-Cover.png"
        title="Anybody Problem"
        intro=""
        :category="xrGame"
        :tags="tagsABP"
        year="March 2023"
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