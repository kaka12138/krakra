import { createI18n } from 'vue-i18n';
import zh from './locales/zh';
import en from './locales/en';

// 类型定义
type MessageSchema = typeof zh;

const i18n = createI18n<[MessageSchema], 'zh' | 'en'>({
  legacy: false, // 使用组合式API
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages: {
    zh,
    en,
  },
});

export default i18n;
