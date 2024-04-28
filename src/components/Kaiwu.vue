<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {generateUUID} from "three/src/math/MathUtils.js";

const elementSection = ref(`section-${generateUUID()}`)
const elementT1 = ref(`unique-t1-${generateUUID()}`)
const elementT2 = ref(`unique-t2-${generateUUID()}`)
function onResize() {
  let section = document.getElementById(elementSection.value)
  const t1Height = document.getElementById(elementT1.value).clientHeight;
  const t2Height = document.getElementById(elementT2.value).clientHeight;
  const textHeight = t1Height + t2Height
  console.log(`${textHeight}TEXT`)
  console.log(section.clientHeight)
  if (section.clientHeight < textHeight) {
    section.style.height = `${textHeight}px`
  } else {
    // const vsrValue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vsr')) * 40;
    // section.style.height = `${vsrValue}px`
  }
}

// onMounted(() => {
//   // window.removeEventListener('resize', adjustTitleAlignment);
//   onResize();
//   window.addEventListener('resize', () => setTimeout(() => onResize(), 50));
// })
//
// onUnmounted(() => {
//   window.removeEventListener('resize', () => setTimeout(() => onResize(), 50));
// })
</script>

<template>
  <div class="section" :id="elementSection">
<!--    <div style="height: calc(var(&#45;&#45;vsr) * 40); width: calc(var(&#45;&#45;vsr) * 40);"-->
<!--         @click="goToLink" class="s-click">-->
<!--      <img :src="cover" class="s-cover s-overlay">-->
    <div class="k-titles">
      <div class="k-head">
        <img id="k-logo" src="../assets/logo_kaiwu.png">
        <div>
          <h2 class="k-kaiwu">开物KaiwuArt</h2>
          <h3 class="k-link"><a href="https://kaiwuart.cn/">kaiwuart.cn</a></h3>
        </div>
        <div id="k-poster">
          <img src="./image/kaiwu/KW-poster1.jpg">
        </div>

      </div>

    </div>

  </div>
</template>

<style scoped>
.section {
  position: relative;
  padding-block: 1vh;
  margin-block: 4vh;
  display: flex;
  justify-content: space-between;
  height: calc(var(--vsr) * 40);
  width: 90vw;


  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 1vh;
    transition: all 0.5s ease;
  }

  &::before {
    top: 0;
    left: 0;
    border-top: 2px solid var(--hover-color);
    border-left: 2px solid var(--hover-color);
  }

  &::after {
    right: 0;
    bottom: 0;
    height: 1vh;
    border-bottom: 2px solid var(--hover-color);
    border-right: 2px solid var(--hover-color);
  }

  &:hover::before,
  &:hover::after {
    width: calc(100% - 1px);
  //height: calc(100% - 1px);
  }
}

.k-titles {
  width: 100%;
}

.k-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#k-logo {
  width: calc(var(--vsr) * 21);
  height: calc(var(--vsr) * 21);
}

.k-kaiwu {
  margin: 0;
  padding: 0;
  color: var(--title-color);
  text-shadow: 2px 2px 2px var(--hover-color);
  text-align: right;
}

.k-link {
  background: none;
  border: none;
  color: var(--context-color);
  cursor: pointer;
  padding: 0;
//font-weight: bold;
  font-size: calc(var(--vsr) * 2);
//padding-block: calc(var(--vsr) * 1);
  text-align: right;
  margin-top: calc(var(--vsr) * 1.5);
  line-height: 1.5;
}

.k-link:hover {
  color: var(--hover-color);
}
</style>