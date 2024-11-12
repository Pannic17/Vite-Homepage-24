<script setup>

</script>

<template>
  <div class="p-hd">
    <div class="p-header p-inline">
      <div class="p-left">
        <img src="/image/ZAR-Cover.png" alt="Cover Image" class="ph-cover">
        <div class="ph-divider-v"></div>
      </div>
      <div class="ph-title">TEST PAGE</div>
    </div>
    <div class="p-divider p-inline">
      <div class="p-divider-inline"></div>
      <div class="p-divider-center"></div>
      <div class="p-divider-inline"></div>
    </div>
    <div class="p-content p-inline">
      <div class="p-left">
        <div class="p-category"></div>
        <div class="ph-divider-v"></div>
      </div>

      <div class="p-main"></div>
    </div>
  </div>

  <!--
    <div class="ph-info">
      <div class="ph-subtitles">
        <div class="ph-year"></div>
        <div class="ph-tags"></div>
      </div>
  -->

</template>

<style scoped>
.p-hd {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100vw;
  background-color: var(--background-color);
}

.p-header {
  height: 10vw;
  margin-top: 3vw;
}

.p-left {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: end;
}

.ph-cover {
  width: 10vw;
  height: 10vw;
}

.ph-divider-v {
  width: 2px;
  height: 10vw;
  margin-inline: 3vw;
  background-color: var(--hover-color);
}

.ph-title {
  text-align: right;
  color: var(--title-color);
  text-shadow: 2px 2px 2px var(--hover-color);
  font-size: 10vw;
  line-height: 1;
  align-items: center;
  vertical-align: top;
}

.p-inline {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding-inline: 3vw;
}

.p-divider {
  height: calc(6vw + 2px);
  justify-content: start;
}

.p-divider-inline {
  height: 2px;
  margin-block: 3vw;
  width: 13vw;
  background-color: var(--hover-color);
}

.p-divider-center {
  height: calc(6vw + 2px);
  width: 2px;
  background-color: var(--hover-color);
}

.p-category {
  width: 10vw;
}


</style>