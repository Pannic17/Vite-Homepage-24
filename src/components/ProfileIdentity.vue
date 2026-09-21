<script setup>
import {profile} from '../content/profile';
defineProps({showName:{type:Boolean,default:true}});
</script>
<template>
  <p class="identity">
    <template v-if="showName">{{ $t('home.name') }}<br></template>{{ $t('home.master') }}<br>{{ $t('home.bachelor') }}<br>
    <i18n-t keypath="home.company" tag="span" scope="global"><template #company><RouterLink :to="profile.company.destination.to">{{ profile.company.label }}</RouterLink></template></i18n-t>
  </p>
</template>
<style scoped>.identity { color: var(--title-color); }</style>
