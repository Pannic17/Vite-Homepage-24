<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import LanguageSwitch from '../components/LanguageSwitch.vue';
import {localConfigKey,normalizeConfig} from '../features/kaiwu/config';
import {errorKey,parseConfig,failure} from '../features/kaiwu/errors';
import {publicAsset} from '../utils/publicAsset';
import '../features/kaiwu/kaiwu.css';
const router=useRouter(),model=ref(''),remote=ref(''),error=ref('');
function open(type,url){router.push({name:'KaiwuViewer',query:{type,url}});}
async function local(event){
  error.value='';
  const file=event.target.files[0];if(!file)return;
  try{
    const text=await file.text();normalizeConfig(parseConfig(text),new URL(import.meta.env.BASE_URL,location.origin).href);
    try{sessionStorage.setItem(localConfigKey,text);}catch{throw failure('storage');}
    open('3');
  }catch(reason){error.value=errorKey(reason);}
  finally{event.target.value='';}
}
</script>
<template>
  <main id="main-content" class="kaiwu-page" tabindex="-1">
    <nav class="kaiwu-nav" :aria-label="$t('accessibility.navigation')">
      <RouterLink to="/">{{ $t('kaiwuViewer.home') }}</RouterLink>
      <RouterLink to="/projects">{{ $t('kaiwuViewer.projects') }}</RouterLink><LanguageSwitch />
    </nav>
    <img :src="publicAsset('kaiwu/image/logo.png')" alt="" width="100" height="100">
    <h1>{{ $t('kaiwuViewer.title') }}</h1><p>{{ $t('kaiwuViewer.intro') }}</p>
    <p><RouterLink :to="{name:'KaiwuViewer'}">{{ $t('kaiwuViewer.example') }}</RouterLink></p>
    <form class="kaiwu-form" @submit.prevent="open('1',model)">
      <label for="kaiwu-model">{{ $t('kaiwuViewer.model') }}</label><input id="kaiwu-model" v-model="model" type="url" required>
      <button>{{ $t('kaiwuViewer.open') }}</button>
    </form>
    <form class="kaiwu-form" @submit.prevent="open('2',remote)">
      <label for="kaiwu-remote">{{ $t('kaiwuViewer.remote') }}</label><input id="kaiwu-remote" v-model="remote" type="url" required>
      <button>{{ $t('kaiwuViewer.open') }}</button>
    </form>
    <div class="kaiwu-form"><label for="kaiwu-local">{{ $t('kaiwuViewer.local') }}</label><input id="kaiwu-local" type="file" accept=".json,application/json" @change="local"></div>
    <p v-if="error" role="alert">{{ $t(error) }}</p>
    <p>{{ $t('kaiwuViewer.hint') }}</p>
  </main>
</template>
