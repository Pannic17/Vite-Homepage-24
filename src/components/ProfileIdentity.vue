<script setup>
import {profile} from '../content/profile';
defineProps({showName:{type:Boolean,default:true}});
</script>
<template>
  <p class="identity">
    <template v-if="showName">{{ $t('home.name') }}<br></template>{{ $t('home.master') }}<br>{{ $t('home.bachelor') }}<br>
    <i18n-t keypath="home.company" tag="span" scope="global"><template #company><a :href="profile.company.href" target="_blank" rel="noopener noreferrer">{{ profile.company.label }}</a></template></i18n-t>
  </p>
</template>
<style scoped>.identity { color: var(--title-color); }</style>
