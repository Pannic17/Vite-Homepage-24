<script setup>
import {computed} from 'vue';
import PageHeader from '../components/PageHeader.vue';
import TagList from '../components/portfolio/TagList.vue';
import NotFound from './NotFound.vue';
import {findEntry} from '../content/portfolio';
import ResponsiveImage from '../components/ResponsiveImage.vue';
const props = defineProps({id:{type:String,required:true}});
const entry = computed(() => findEntry(props.id));
</script>
<template>
  <main v-if="entry?.detail" id="main-content" class="page-container project-detail" tabindex="-1">
    <PageHeader :title="$t(entry.titleKey)" :year="$t(entry.dateKey)" :category="$t(entry.categoryKey)" :back-to="entry.detail.parent" />
    <div class="detail-meta"><TagList :tags="entry.tags" /></div>
    <ResponsiveImage :src="entry.cover" :alt="$t(entry.titleKey)" class="gcs-cover detail-cover" sizes="(max-width: 680px) 90vw, 640px" loading="eager" />
    <div class="detail-copy">
      <p v-if="entry.introKey">{{ $t(entry.introKey) }}</p>
      <p v-for="key in entry.detail.paragraphKeys" :key="key">{{ $t(key) }}</p>
      <p v-if="entry.detail.status === 'pending'">{{ $t('status.detailsPending') }}</p>
    </div>
  </main>
  <NotFound v-else />
</template>
<style scoped>
.project-detail { padding-top: 0; }
:deep(.detail-cover) { width: 100%; max-width: 40rem; margin-bottom: 2rem; }
.detail-meta { margin-bottom: 2rem; }
.detail-copy { max-width: 65ch; display: grid; gap: 1rem; }
</style>
