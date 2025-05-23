<script setup lang="ts">
import { useCounterStore } from '../stores/counter';

const counterStore = useCounterStore();
</script>

<template>
  <div class="home">
    <h1>首页</h1>
    <p>计数器: {{ counterStore.count }}</p>
    <p>双倍计数: {{ counterStore.doubleCount }}</p>
    <div>
      <button @click="counterStore.increment">
        增加
      </button>
      <button @click="counterStore.decrement">
        减少
      </button>
    </div>
    <div class="mt-4">
      <router-link to="/about">
        前往关于页面
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
