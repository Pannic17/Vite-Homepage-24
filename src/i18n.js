import {createI18n} from 'vue-i18n';
import {watch} from 'vue';
import en from './lang/en';
import cn from './lang/cn';
import {en as kaiwuEn,cn as kaiwuCn} from './features/kaiwu/messages';
import {initialLocale, isSupportedLocale, persistLocale} from './utils/locale';

const storage = () => window.localStorage;
const i18n = createI18n({
  legacy: false,
  locale: initialLocale(navigator.language, storage),
  fallbackLocale: 'en-US',
  messages: {'en-US': {...en,kaiwuViewer:kaiwuEn}, 'zh-CN': {...cn,kaiwuViewer:kaiwuCn}},
});

// One state source drives the switch, document metadata and persistence.
export function installLocaleEffects(router) {
  return watch(
    [i18n.global.locale, () => router.currentRoute.value.meta.titleKey],
    ([locale, titleKey]) => {
      if (!isSupportedLocale(locale)) {
        i18n.global.locale.value = 'en-US';
        return;
      }
      document.documentElement.lang = locale;
      document.title = titleKey ? i18n.global.t(titleKey) + ' | PANNIC' : 'PANNIC';
      persistLocale(locale, storage);
    },
    {immediate: true},
  );
}
export default i18n;
