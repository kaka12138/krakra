import { nextTick } from 'vue';
import i18n from '../i18n';

// 语言列表
export const availableLocales = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'English' },
];

// 获取当前语言
export function getCurrentLanguage() {
  return i18n.global.locale.value;
}

// 切换语言
export async function setLanguage(locale: 'zh' | 'en') {
  i18n.global.locale.value = locale;
  // 保存语言设置到localStorage
  localStorage.setItem('locale', locale);
  document.querySelector('html')?.setAttribute('lang', locale);
  return nextTick();
}

// 从localStorage中获取已保存的语言设置
export function getLocaleFromStorage() {
  return localStorage.getItem('locale') as 'zh' | 'en' || 'zh';
}

// 初始化语言
export async function setupLanguage() {
  const savedLocale = getLocaleFromStorage();
  return setLanguage(savedLocale);
}
