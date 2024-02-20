<script setup>
const props = defineProps({
  cover: String,
  title: String,
  intro: String,
  category: String,
  tags: Array,
})
</script>

<template>
  <div class="section">
    <img :src="cover" class="s-cover s-overlay">
    <div class="s-text s-overlay">
      <div class="s-subtitles">
        <div v-for="(content, index) in tags" :key="index" class="s-tags">
          {{ content }}<span style="color: var(--hover-color)">&ensp;|&ensp;</span>
        </div>
        <h4 class="s-category">{{ category }}</h4>
      </div>
      <div style="text-align: right; align-items: end; display: flex; justify-content: flex-end; flex-direction: column">
        <div class="s-intro">
            <span>{{ intro }}</span>
        </div>
        <h3 class="s-title">{{ title }}</h3>
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
  width: 45vw;
  text-align: left;
}

.s-title {
  margin: 0;
  font-size: calc(var(--vsr) * 5);
  color: var(--title-color);
  text-shadow: 2px 2px 2px var(--context-color);
  text-align: right;
}

.s-cover {
  z-index: -1;
  width: calc(var(--vsr) * 40);
  height: calc(var(--vsr) * 40);
}

.section {
  position: relative;
  padding-block: 1vh;
  margin-block: 1vh;
  display: flex;
  justify-content: space-between;
  height: calc(var(--vsr) * 40);
  width: 100%;


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
    border-top: 1px solid var(--hover-color);
    border-left: 1px solid var(--hover-color);
  }

  &::after {
    right: 0;
    bottom: 0;
    height: 1vh;
    border-bottom: 1px solid var(--hover-color);
    border-right: 1px solid var(--hover-color);
  }

  &:hover::before,
  &:hover::after {
    width: calc(100% - 1px);
  //height: calc(100% - 1px);
  }
}

@media screen and (max-aspect-ratio: 1/1.7) {
  .s-cover {
    width: 90vw;
    height: 90vw;
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
  }

  .s-title {
    font-size: calc(var(--vsr) * 5)
  }

  .s-category {
    margin-block: 1vh;
  }
}
</style>