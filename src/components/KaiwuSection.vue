<script setup>
import {ref} from "vue";
import {generateUUID} from "three/src/math/MathUtils.js";
import AniButtom from "./AniButtom.vue";

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

function onDetail() {
  console.log('Detail')
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
    <div class="s-titles">
      <div class="k-head">
        <img id="k-logo" src="../assets/logo_kaiwu.png">
        <div>
          <h2 class="k-kaiwu">开物KaiwuArt</h2>
          <h3 class="k-link"><a href="https://kaiwuart.cn/">kaiwuart.cn</a></h3>
        </div>


      </div>

    </div>
    <button class="k-detail" @click="onDetail">Click For Details</button>
<!--    <AniButtom name="Click For Details" link="https://kaiwuart.cn/3d-viewer"></AniButtom>-->
    <div id="s-posters">
      <img class="k-poster" src="/image/kaiwu/KW-poster1.jpg">
      <img class="k-poster" src="/image/kaiwu/KW-poster2.jpg">
      <img class="k-poster" src="/image/kaiwu/KW-poster3.jpg">
      <img class="k-poster" src="/image/kaiwu/KW-poster4.jpg">
    </div>

<!--    <div id="b-click">-->
<!--      Click For Details-->
<!--    </div>-->

    <div class="k-text" style="text-align: left">
      Kaiwu is a NFT trade platform in China focusing on 3D digital artwork market. Focusing on 3D digital artworks and their application scenes in Metaverse, games, popular culture, collections and CG industries.
    </div>

    <div id="b-set">
      <div class="k-tag">
        <div><a href="https://kaiwuart.cn/3d-viewer" class="k-link">3D Viewer</a></div>
        <span style="color: var(--hover-color)">&ensp;|&ensp;</span>
        <div><a href="https://kaiwuart.cn/3d-viewer" class="k-link">Mobile App</a></div>
        <span style="color: var(--hover-color)">&ensp;|&ensp;</span>
        <div><a href="https://kaiwuart.cn/3d-viewer" class="k-link">Websites</a></div>
        <span style="color: var(--hover-color)">&ensp;|&ensp;</span>
        <div><a href="https://kaiwuart.cn/3d-viewer" class="k-link">Cloud & Backend</a></div>
        <span style="color: var(--hover-color)">&ensp;|&ensp;</span>
        <div><a href="https://kaiwuart.cn/3d-viewer" class="k-link">NFT & Zhixin Chain</a></div>
      </div>
<!--      <div id="b-block">-->
<!--        <AniButtom name="3D Viewer" link="https://kaiwuart.cn/3d-viewer"></AniButtom>-->
<!--        <AniButtom name="Mobile APP" link="https://kaiwuart.cn/3d-viewer"></AniButtom>-->
<!--        <AniButtom name="Cloud & Backend" link="https://kaiwuart.cn/3d-viewer"></AniButtom>-->
<!--        <AniButtom name="Official Website" link="https://kaiwuart.cn/3d-viewer"></AniButtom>-->
<!--        <AniButtom name="NFT & Zhixin Chain" link="https://kaiwuart.cn/3d-viewer"></AniButtom>-->
<!--      </div>-->
    </div>
    <div class="k-text" style="text-align: left">
      As the project manager and developer, I participated in every aspect of the project development, including the mobile apps for Android/iOS, WeChat mini-program, official website, cloud servers, databases, 3D rendering, and the publishing and trading of encrypted tokens. By collaborating with different developers and designers, we successfully launched KaiwuArt and rolled out a series of events.
    </div>


    <div style="margin-bottom: 1vh"></div>
<!--    <div class="d-line"></div>-->

  </div>
</template>

<style scoped>
.section {
  position: relative;
  padding-block: 1vh;
  margin-block: 4vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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

.k-tag {
  display: flex;
  margin-block: 1vh;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}

.k-detail {
  position: relative;
  margin-block: 1vh;
  align-items: center;
  width: 24vb;
  height: calc(5vb + 1px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--hover-color);
  background-color: transparent;
  font-size: calc(var(--vsr) * 2);
  color: var(--context-color);
}

.k-detail:hover {
  cursor: pointer;
  color: var(--hover-color);
}

.b-section {
  position: relative;
  margin-block: 1vh;
  align-items: center;
  width: 24vb;
  height: calc(5vb + 1px);
  display: flex;
  flex-direction: column;
  justify-content: center;

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
    height: 5vb;
    border-top: 1px solid var(--hover-color);
    border-left: 1px solid var(--hover-color);
  }

  &::after {
    right: 0;
    bottom: 0;
    height: 5vb;
    border-bottom: 1px solid var(--hover-color);
    border-right: 1px solid var(--hover-color);
  }

  &:hover::before,
  &:hover::after {
    width: calc(100% - 1px);
  //height: calc(100% - 1px);

  }
}

.b-section:hover {
  cursor: pointer;
  color: var(--hover-color);
}

@media screen and (max-aspect-ratio: 1/1.7) {
  .b-section{
    width: 60vw;

  }
}

#b-set {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  font-size: 2vb;
}

#b-click {
  width: 30vb;
  border: 1px solid var(--hover-color);
  height: 5vb;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 1vh;
}

#b-click:hover {
  cursor: pointer;
  color: var(--hover-color);
}

#b-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 90vw;
}

.s-titles {
  width: 100%;
}

.k-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#s-posters {
  display: flex;
  justify-content: space-between;
}

.k-poster {
  width: 25%
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

.k-text {
  margin-block: 1vh;
  text-align: center;
}

.d-line {
  text-align: center;
  height: 1px;
  width: 50%;
  background-color: var(--hover-color);
}
</style>