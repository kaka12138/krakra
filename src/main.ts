import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';
import i18n from './i18n';
import { setupLanguage } from './utils/i18n';
import './style.css';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);

// 初始化语言设置
setupLanguage().then(() => {
  app.mount('#app');
});
