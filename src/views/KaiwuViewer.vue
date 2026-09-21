<script setup>
import {onMounted,onBeforeUnmount,ref,watch} from 'vue';
import {useRoute} from 'vue-router';
import LanguageSwitch from '../components/LanguageSwitch.vue';
import {loadConfig} from '../features/kaiwu/config';
import '../features/kaiwu/kaiwu.css';
const route=useRoute(),container=ref(null),status=ref('loading'),playing=ref(false),background=ref('');
let scene,abort,generation=0;
async function start(){
  const current=++generation;abort?.abort();scene?.dispose();scene=null;
  abort=new AbortController();status.value='loading';background.value='';
  try{
    const base=new URL(import.meta.env.BASE_URL,location.origin).href;
    const config=await loadConfig(route.query,base,{getItem:key=>sessionStorage.getItem(key)},abort.signal);
    const {createScene}=await import('../features/kaiwu/scene');
    if(current!==generation)return;
    background.value=config.bgPath||'';playing.value=!!config.autoPlay;
    scene=createScene(container.value,config);await scene.ready;
    if(current===generation)status.value='ready';
  }catch{
    if(current===generation){scene?.dispose();scene=null;status.value='failed';}
  }
}
function toggle(){playing.value=!playing.value;scene?.setPlaying(playing.value);}
onMounted(start);watch(()=>route.fullPath,()=>{if(container.value)start();});
onBeforeUnmount(()=>{generation++;abort?.abort();scene?.dispose();});
</script>
<template>
  <main id="main-content" class="kaiwu-page" tabindex="-1">
    <nav class="kaiwu-nav" :aria-label="$t('accessibility.navigation')">
      <RouterLink to="/">{{ $t('kaiwuViewer.home') }}</RouterLink>
      <RouterLink to="/projects">{{ $t('kaiwuViewer.projects') }}</RouterLink>
      <RouterLink :to="{name:'KaiwuHome'}">{{ $t('kaiwuViewer.configure') }}</RouterLink><LanguageSwitch />
    </nav>
    <h1>{{ $t('kaiwuViewer.title') }}</h1>
    <div ref="container" class="kaiwu-stage" :data-state="status" :aria-busy="status==='loading'" :style="background ? {backgroundImage:'url('+JSON.stringify(background)+')'} : {}" />
    <p v-if="status==='loading'" class="kaiwu-status" role="status">{{ $t('kaiwuViewer.loading') }}</p>
    <div v-if="status==='failed'" class="kaiwu-status" role="alert"><p>{{ $t('kaiwuViewer.failed') }}</p><button @click="start">{{ $t('kaiwuViewer.retry') }}</button></div>
    <div class="kaiwu-controls"><button :disabled="status!=='ready'" :aria-pressed="playing" @click="toggle">{{ $t(playing?'kaiwuViewer.pause':'kaiwuViewer.play') }}</button><button :disabled="status!=='ready'" @click="scene?.reset()">{{ $t('kaiwuViewer.reset') }}</button></div>
  </main>
</template>
