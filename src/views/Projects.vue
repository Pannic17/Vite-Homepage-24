<script setup>
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

const tagsZAR = computed(() => {
  const tag = t("tags.mini");
  return ['AR', tag]
});

const arMini = computed(() => t('tags.ar-mini'));
const aiApp = computed(() => t('tags.ai-app'));
const cTool = computed(() => t('tags.tool'));
const cCourse = computed(() => t('tags.coursework'));
const cUnder = computed(() => t('tags.under'));
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

    <MenuSection
        cover="./image/ZAR-Cover.png"
        title="状元街区 · 微缩状元府"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        :category="arMini"
        :tags="tagsZAR"
        year="Fall 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/BLA-Cover.png"
        title="比恋AI"
        intro=
            "比恋AI是一款面向中国AI用户的聊天APP，接入了ChatGPT以及文言一心接口，提供可以在中国大陆访问的AI入口。
            我负责该应用的移动端前端开发，前端基于Flutter框架，实现了iOS和Android端跨平台同步开发，使用响应式布局，同时使用了微信分享等相关接口。"
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
        cover="./image/CourseWork.png"
        title="CCI课程作业"
        intro=
            "这里展示了我在UAL CCI硕士一年期间所有的Coding作业。
            包括Coding 1中的JavaScript相关，
            Coding 2中OpenFramework以及Python相关，
            Coding 3中与神经网络相关的作业。"
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