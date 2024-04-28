<script setup>
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

const tagsZAR = computed(() => {
  const tag = t("tags.mini");
  return ['AR', tag]
});

const arMini = computed(() => t('tags.ar-mini'));
const aiApp = computed(() => t('tags.ai-app'));
const cTool = computed(() => t('tags.tool'));
const cWeb = computed(() => t('tags.web'));
const cCourse = computed(() => t('tags.coursework'));
const cUnder = computed(() => t('tags.under'));

const tZAR = computed(() => t('title.ZAR'));
const tBLA = computed(() => t('title.BLA'));
const tHPG = computed(() => t('title.HPG'));
const tCCI = computed(() => t('title.CCI'));

const iZAR = computed(() => t('intro.ZAR'));
const iBLA = computed(() => t('intro.BLA'));
const iHPG = computed(() => t('intro.HPG'));
const iCCI = computed(() => t('intro.CCI'));
</script>

<template>
  <div id="background"></div>
  <div class="f-center">
    <div id="f-top">
      <div class="h-sub">
        <div class="h-left">
          <h2>PROJECTS</h2>
          <div class="subtitle">
            <span>{{ $t("projects.sub1") }}</span><span class="t-cyan"> PANNIC </span><span>{{ $t("projects.sub2") }}</span>
          </div>
        </div>
        <SubRight></SubRight>
      </div>
      <div style="height: 1px; background-color: var(--context-color); margin-block: 1vh"></div>
    </div>

    <div id="block" style="background-color: var(--background-color); width: 90vw"></div>

    <Kaiwu></Kaiwu>

    <MenuSection
        cover="./image/ZAR-Cover.png"
        :title="tZAR"
        :intro="iZAR"
        :category="arMini"
        :tags="tagsZAR"
        year="Fall 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/BLA-Cover.png"
        :title="tBLA"
        :intro="iBLA"
        :category="aiApp"
        :tags="['Flutter', 'AI']"
        year="January 2024"
    ></MenuSection>

    <MenuSection
        cover="./image/Split!.png"
        title="SPLIT!"
        intro=""
        :category="cTool"
        :tags="['Django', 'React']"
        year="Winter 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/HPG-Cover.png"
        :title="tHPG"
        :intro="iHPG"
        :category="cWeb"
        :tags="['Vue.js', 'Three.js']"
        year="2023"
    ></MenuSection>

    <MenuSection
        cover="./image/CourseWork.png"
        :title="tCCI"
        :intro="iCCI"
        :category="cCourse"
        :tags="['JavaScripts', 'OpenFramework', 'Python']"
        year="2023"
    ></MenuSection>

    <MenuSection
        cover="./image/Construction.png"
        title="AI Tester"
        intro=""
        :category="cUnder"
        :tags="['GPTs', 'AI']"
        year="2024"
    ></MenuSection>

  </div>

  <div style="background-color: var(--background-color); width: 90vw; height: 2vh"></div>


<!--  <h1>UNDER<br>CONSTRUCTION</h1>-->
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
  margin: 0 auto;
  padding-inline: 5%;
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