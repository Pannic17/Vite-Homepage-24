<script setup>
import {profile} from '../content/profile';
import email from '../assets/icon_email.png';
import github from '../assets/icon_github.png';
import instagram from '../assets/icon_ins.png';
const icons = {email, github, instagram};
</script>
<template>
  <nav class="social-links" :aria-label="$t('contact.label')">
    <a v-for="contact in profile.contacts" :key="contact.id" :href="contact.href" :target="contact.id === 'email' ? undefined : '_blank'" :rel="contact.id === 'email' ? undefined : 'noopener noreferrer'">
      <img :src="icons[contact.id]" :alt="$t(contact.labelKey)">
    </a>
    <slot />
  </nav>
</template>
<style scoped>
.social-links { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem; }
.social-links a { display: inline-flex; justify-content: center; align-items: center; min-height: 44px; min-width: 44px; }
.social-links img { width: 28px; height: 28px; object-fit: contain; }
</style>
