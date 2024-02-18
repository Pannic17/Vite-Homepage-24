<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
<!--  <div>-->
<!--    <a href="https://vitejs.dev" target="_blank">-->
<!--      <img src="/vite.svg" class="logo" alt="Vite logo" />-->
<!--    </a>-->
<!--    <a href="https://vuejs.org/" target="_blank">-->
<!--      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />-->
<!--    </a>-->
<!--  </div>-->
<!--  <HelloWorld msg="Vite + Vue" />-->
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #1a1a1a;
}

p {
  color: #aaaaaa;
}

h1 {
  color: #f9f9f9;
  padding-top: 9vh;
  padding-bottom: 2vh;
  margin-bottom: 0;
  font-size: calc(var(--vsr) * 20);
}
</style>
