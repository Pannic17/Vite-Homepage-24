<script setup>

import HelloWorld from "../App.vue";
import SubRight from "../components/SubRight.vue";
import MenuSection from "../components/MenuSection.vue";
</script>

<template>
  <div id="background"></div>
  <div class="f-center">
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

    <MenuSection
        cover="./image/ZAR-Cover.png"
        title="状元街区 · 微缩状元府"
        intro="状元街区·微缩状元府 是一款微信AR小程序，基于微信xr-frame框架开发。
              用户通过扫描二维码，可以在对应的Marker上展示出生动的人物三维动画。
              该小程序作为景区的互动体验项目，旨在复原古代场景中传统中国人的生活。"
        category="AR小程序"
        :tags="['AR', '微信小程序']"
    ></MenuSection>

    <MenuSection
        cover="./image/BLA-Cover.png"
        title="比恋AI"
        category="AI聊天App"
        :tags="['Flutter', 'AI']"
    ></MenuSection>

  </div>



  <h1>UNDER<br>CONSTRUCTION</h1>
</template>

<style scoped>
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