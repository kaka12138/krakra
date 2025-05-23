<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1 class="text-3xl font-bold mb-6">
    {{ msg }}
  </h1>

  <div class="p-6 bg-gray-100 rounded-lg shadow-md">
    <button type="button" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4" @click="count++">
      count is {{ count }}
    </button>
    <p class="text-gray-700">
      Edit
      <code class="bg-gray-200 px-1 py-0.5 rounded">components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p class="mt-4">
    Check out
    <a
      href="https://vuejs.org/guide/quick-start.html#local"
      target="_blank"
      class="text-blue-500 hover:text-blue-700 underline"
    >create-vue</a>, the official Vue + Vite starter
  </p>
  <p class="mt-2">
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      class="text-blue-500 hover:text-blue-700 underline"
    >Vue Docs Scaling up Guide</a>.
  </p>
  <p class="mt-6 text-gray-500">
    Click on the Vite and Vue logos to learn more
  </p>
</template>

