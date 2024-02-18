import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');

function updateCssVariableForShortEdge() {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    const vsr = Math.min(vh, vw);
    document.documentElement.style.setProperty('--vsr', `${vsr}px`);
}

// 在页面加载时设置
updateCssVariableForShortEdge();

// 监听窗口尺寸变化
window.addEventListener('resize', updateCssVariableForShortEdge);