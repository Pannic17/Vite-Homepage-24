<script setup>
import SubRight from "../components/SubRight.vue";
import {onMounted} from "vue";

onMounted(() => {
  // window.removeEventListener('resize', adjustTitleAlignment);
  let topHeight = document.getElementById('f-top').clientHeight;
  const block = document.getElementById('block')
  topHeight = topHeight - 0.02 * window.innerHeight;
  block.style.height = `${topHeight}px`
})
</script>

<template>
  <div id="background"></div>
  <div class="f-center">
    <div id="f-top">
      <div class="h-sub">
        <div class="h-left">
          <h2>ABOUT</h2>
          <div class="subtitle">
            <span>关于</span><span class="t-cyan"> PANNIC</span>
          </div>
        </div>
        <SubRight></SubRight>
      </div>
      <div style="height: 1px; background-color: var(--context-color); margin-block: 1vh"></div>
    </div>

    <div id="block" style="background-color: var(--background-color); width: 90vw"></div>

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