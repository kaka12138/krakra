<template>
  <div class="w-full max-w-100 flex items-center justify-center space-x-1 rounded-full bg-gray-200 p-1" :class="[classStr]">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="[
        'flex-1 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none cursor-pointer',
        selectedTab === tab.value
          ? 'bg-[#926DDE] text-white shadow-md'
          : 'text-[#926DDE] hover:bg-purple-100 hover:text-purple-600',
      ]"
      @click="() => {emit('update:modelValue', tab.value); selectedTab = tab.value}"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  tabs: Array,
  classStr: String,
  modelValue: Number,
})

const emit = defineEmits(['update:modelValue'])


const selectedTab = ref(-1); // 默认选中 "全部"
</script>

<style scoped>
/* 你可以在这里添加一些额外的 scoped CSS，如果 Tailwind 不能完全满足需求的话 */
</style>
