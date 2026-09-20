<script setup>
import SiteLayout from '../layouts/SiteLayout.vue';
import ProfileIdentity from '../components/ProfileIdentity.vue';
import ContactLinks from '../components/ContactLinks.vue';
</script>
<template>
  <SiteLayout :title="$t('menu.about')">
    <template #subtitle>PANNIC</template>
    <section class="biography">
      <h2>{{ $t('home.name') }}</h2>
      <ProfileIdentity :show-name="false" />
      <p>{{ $t('home.intro') }}</p>
      <ContactLinks />
    </section>
  </SiteLayout>
</template>
<style scoped>.biography { max-width: 65ch; display: grid; gap: 1.5rem; }</style>
