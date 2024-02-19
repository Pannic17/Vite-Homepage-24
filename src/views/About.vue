<script setup>

import HelloWorld from "../App.vue";
</script>

<template>
  <div id="background"  style="background-color: #1a1a1a"></div>
  <div class="f-center">
    <h2>ABOUT</h2>
    <div class="subtitle">
      <span>关于</span><span class="t-cyan"> PANNIC</span>
    </div>
    <div style="height: 1px; background-color: #aaaaaa; margin-block: 1vh"></div>
  </div>
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
  color: #54a296;
}


</style>