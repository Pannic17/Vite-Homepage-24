import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n, {installLocaleEffects} from './i18n';

const app = createApp(App);
app.use(router);
app.use(i18n);

const stopLocaleEffects = installLocaleEffects(router);
app.mount('#app');
if (import.meta.hot) import.meta.hot.dispose(stopLocaleEffects);
