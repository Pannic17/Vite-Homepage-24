<script setup>

import HelloWorld from "../App.vue";
import SubRight from "../components/SubRight.vue";
</script>

<template>
  <hello-world></hello-world><div id="background"></div>
  <div class="f-center">
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