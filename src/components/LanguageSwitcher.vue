<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { availableLocales, setLanguage } from '../utils/i18n';

const { locale } = useI18n();

const switchLanguage = (code: 'zh' | 'en') => {
  setLanguage(code);
};
</script>

<template>
  <div class="language-switcher">
    <select v-model="locale" @change="switchLanguage(locale)">
      <option v-for="lang in availableLocales" :key="lang.code" :value="lang.code">
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.language-switcher {
  margin: 10px;
}

select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
