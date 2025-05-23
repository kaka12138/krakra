<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
</script>

<template>
  <div class="about">
    <h1>{{ t('common.about') }}</h1>
    <p>{{ t('about.description') }}</p>
    <p>{{ t('about.currentLanguage') }}: {{ locale === 'zh' ? '中文' : 'English' }}</p>
    <div class="mt-4">
      <router-link to="/">
        {{ t('common.home') }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem;
  text-align: center;
}
</style>
