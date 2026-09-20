<script setup>
import SiteLayout from '../layouts/SiteLayout.vue';
import MenuSection from "../components/MenuSection.vue";
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import Kaiwu from "../components/KaiwuSection.vue";



const { t } = useI18n();

const tagsZAR = computed(() => {
  const tag = t("tags.mini");
  return ['AR', tag]
});

const arMini = computed(() => t('tags.ar-mini'));
const aiApp = computed(() => t('tags.ai-app'));
const cTool = computed(() => t('tags.tool'));
const cWeb = computed(() => t('tags.web'));
const cCourse = computed(() => t('tags.coursework'));
const cUnder = computed(() => t('tags.under'));

const tZAR = computed(() => t('title.ZAR'));
const tBLA = computed(() => t('title.BLA'));
const tHPG = computed(() => t('title.HPG'));
const tCCI = computed(() => t('title.CCI'));

const iZAR = computed(() => t('intro.ZAR'));
const iBLA = computed(() => t('intro.BLA'));
const iHPG = computed(() => t('intro.HPG'));
const iCCI = computed(() => t('intro.CCI'));
</script>

<template>
  <SiteLayout title="PROJECTS">
    <template #subtitle>{{ $t("projects.sub1") }} PANNIC {{ $t("projects.sub2") }}</template>
    <Kaiwu></Kaiwu>

    <MenuSection
        cover="./image/ZAR-Cover.png"
        :title="tZAR"
        :intro="iZAR"
        :category="arMini"
        :tags="tagsZAR"
        year="Fall 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/BLA-Cover.png"
        :title="tBLA"
        :intro="iBLA"
        :category="aiApp"
        :tags="['Flutter', 'AI']"
        year="January 2024"
    ></MenuSection>

    <MenuSection
        cover="./image/Split!.png"
        title="SPLIT!"
        intro=""
        :category="cTool"
        :tags="['Django', 'React']"
        year="Winter 2023"
    ></MenuSection>

    <MenuSection
        cover="./image/HPG-Cover.png"
        :title="tHPG"
        :intro="iHPG"
        :category="cWeb"
        :tags="['Vue.js', 'Three.js']"
        year="2023"
    ></MenuSection>

    <MenuSection
        cover="./image/CourseWork.png"
        :title="tCCI"
        :intro="iCCI"
        :category="cCourse"
        :tags="['JavaScripts', 'OpenFramework', 'Python']"
        year="2023"
    ></MenuSection>

    <MenuSection
        cover="./image/Construction.png"
        title="AI Tester"
        intro=""
        :category="cUnder"
        :tags="['GPTs', 'AI']"
        year="2024"
    ></MenuSection>

  </SiteLayout>
</template>
