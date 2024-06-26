<script setup>
import {onMounted, onUnmounted, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {generateUUID} from "three/src/math/MathUtils.js";
import router from "../router.js";

const props = defineProps({
  cover: String,
  title: String,
  intro: String,
  category: String,
  tags: Array,
  year: String,
  link: String,
  route: String
})

onMounted(() => {
  // window.removeEventListener('resize', adjustTitleAlignment);
  onResize();
  window.addEventListener('resize', () => setTimeout(() => onResize(), 50));
})

onUnmounted(() => {
  window.removeEventListener('resize', () => setTimeout(() => onResize(), 50));
})

const { locale } = useI18n({ useScope: 'global' });

watch(locale, () => setTimeout(() => onResize(), 50))

const elementSection = ref(`section-${generateUUID()}`)
const elementT1 = ref(`unique-t1-${generateUUID()}`)
const elementT2 = ref(`unique-t2-${generateUUID()}`)

function goToLink() {
  if (props.route) {
    router.push(props.route)
  }
  if (props.link) {
    window.open(props.link, '_blank')
  }
}

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
</script>

<template>
  <div class="section" :id="elementSection">
    <div @click="goToLink" class="s-click">
      <img :src="cover" class="s-cover s-overlay">
    </div>
<!--    <img v-else :src="cover" class="s-cover s-overlay">-->
    <div class="s-text s-overlay" id="text">
      <div :id="elementT1" style="text-align: right; align-items: end; display: flex; justify-content: flex-end; flex-direction: column">
        <h4 class="s-year">{{ year }}</h4>
        <div class="s-subtitles">
          <div v-for="(content, index) in tags" :key="index" class="s-tags">
            {{ content }}<span style="color: var(--hover-color)">&ensp;|&ensp;</span>
          </div>
          <h4 class="s-category">{{ category }}</h4>
        </div>
      </div>

      <div :id="elementT2"
           @click="goToLink"
           class="s-click"
           aria-label="Link to Project"
           style="text-align: right; align-items: end; display: flex; justify-content: flex-end; flex-direction: column; height: 100%">
        <div class="s-expand"></div>
        <div class="s-intro">
            <span>{{ intro }}</span>
        </div>
        <a v-if="link" :href="link" target="_blank" style="text-decoration: none">
          <h3 class="s-title">{{ title }}</h3>
        </a>
        <h3 v-else class="s-title">{{ title }}</h3>
      </div>

    </div>

  </div>
</template>

<style scoped>
.s-overlay {
  position: absolute;
}

.s-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  bottom: 1vh;
  right: 0;
  height: calc(100% - 2vh);
}

.s-subtitles {
  display: flex;
}

.s-tags {
  color: var(--context-color);
}

.s-category {
  margin: 0;
}

.s-intro {
  right: 0;
  margin-bottom: 1vh;
  width: calc(84vw - var(--vsr) * 40);
  text-align: right;
  pointer-events: none;
}

.s-title {
  margin: 0;
  font-size: calc(var(--vsr) * 5);
  color: var(--title-color);
  text-shadow: 2px 2px 2px var(--context-color);
  text-align: right;
}

.s-title:hover {
  text-shadow: 2px 2px 2px var(--hover-color);
}

.s-cover {
  z-index: -1;
  width: calc(var(--vsr) * 40);
  height: calc(var(--vsr) * 40);
}

.s-expand {
  flex-grow: 1;
  width: 100%;
  //height: 100%;
}

.s-click {
  cursor: pointer;
  height: calc(var(--vsr) * 40);
  width: calc(var(--vsr) * 40);
}

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

.s-year {
  font-size: 2vh;
  color: var(--hover-color);
  padding: 0;
  margin-bottom: 1vh;
  margin-block-start: 0;
}

@media screen and (max-aspect-ratio: 1/1.7) {
  .s-cover {
    width: 90vw;
    height: 90vw;
  }

  .s-click {
    height: 90vw;
    width: 90vw;
  }

  .section {
    display: block;
    height: fit-content;
  }

  .s-overlay {
    position: static;
  }

  .s-text {
    height: fit-content;
  }

  .s-intro {
    width: 100%;
    text-align: left;
  }

  .s-title {
    font-size: calc(var(--vsr) * 5)
  }

  .s-subtitles {
    margin-right: auto;
    margin-block: 1vh;
    flex-direction: row-reverse;
    flex-wrap: wrap-reverse;
  }

  .s-tags {
    display: flex;
    flex-direction: row-reverse;
  }

  .s-year {
    margin-bottom: 0;
    margin-block-start: 1vh;
  }
}
</style>