<script setup lang="ts">
import { useCounterStore } from '../stores/counter';
import { useI18n } from 'vue-i18n';

const counterStore = useCounterStore();
const { t } = useI18n();
</script>

<template>
  <div class="home">
    <h1>{{ t('common.home') }}</h1>
    <p>{{ t('home.counter') }}: {{ counterStore.count }}</p>
    <p>{{ t('home.doubleCounter') }}: {{ counterStore.doubleCount }}</p>
    <div>
      <button @click="counterStore.increment">
        {{ t('home.increase') }}
      </button>
      <button @click="counterStore.decrement">
        {{ t('home.decrease') }}
      </button>
    </div>
    <div class="mt-4">
      <router-link to="/about">
        {{ t('common.about') }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  text-align: center;
}

button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #f0f0f0;
}
</style>
