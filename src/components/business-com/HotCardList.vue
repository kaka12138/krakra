<template>
  <div class="p-4 sm:p-6 max-h-3/4">
    <div class="max-w-md mx-auto">
      <h1 class="text-3xl sm:text-4xl font-bold text-center mb-6">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 relative">
          热门卡片
          <span class="absolute -bottom-1 left-0 w-full h-1 bg-purple-300 opacity-50 rounded-full transform scale-x-110" />
        </span>
      </h1>

      <div class="flex justify-between items-center mb-5">
        <div class="flex space-x-2">
          <button
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out',
              activeTab === 'weekly'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200',
            ]"
            @click="activeTab = 'weekly'"
          >
            本周
          </button>
          <button
            :class="[
              'px-5 py-2 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out',
              activeTab === 'monthly'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200',
            ]"
            @click="activeTab = 'monthly'"
          >
            本月
          </button>
        </div>
        <button class="flex items-center space-x-1 text-purple-500 hover:text-purple-700 transition-colors">
          <RefreshCcw />
          <span class="text-xs sm:text-sm">点击刷新</span>
        </button>
      </div>

      <div class="space-y-3 h-140 overflow-y-auto ">
        <div
          v-for="item in items"
          :key="item.id"
          class="bg-white/80 backdrop-blur-sm rounded-3xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
        >
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-purple-700">
              {{ item.tag }}
            </h3>
            <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
              {{ item.stats }}
            </p>
          </div>
          <button class="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shadow transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RefreshCcw } from 'lucide-vue-next';

const activeTab = ref('weekly'); // 'weekly' or 'monthly'

const items = ref([
  { id: 1, tag: '#初音未来3451', stats: '10万+篇内容 · 133.2万浏览' },
  { id: 2, tag: '#夏日潮流搭配', stats: '8万+篇内容 · 98.5万浏览' },
  { id: 3, tag: '#Vue3学习笔记', stats: '5万+篇内容 · 75.1万浏览' },
  { id: 4, tag: '#咖啡探店指南', stats: '12万+篇内容 · 201.0万浏览' },
  { id: 5, tag: '#周末去哪儿玩', stats: '9.5万+篇内容 · 150.6万浏览' },
  { id: 6, tag: '#AI绘画作品', stats: '20万+篇内容 · 300.2万浏览' },
  { id: 7, tag: '#AI绘画作品', stats: '20万+篇内容 · 300.2万浏览' },
  { id: 8, tag: '#AI绘画作品', stats: '20万+篇内容 · 300.2万浏览' },
  { id: 9, tag: '#AI绘画作品', stats: '20万+篇内容 · 300.2万浏览' },
  { id: 10, tag: '#AI绘画作品', stats: '20万+篇内容 · 300.2万浏览' },
  { id: 11, tag: '#AI绘画作品', stats: '20万+篇内容 · 300.2万浏览' },
  { id: 12, tag: '#AI绘画作品', stats: '20万+篇内容 · 300.2万浏览' },
  { id: 13, tag: '#AI绘画作品', stats: '20万+篇内容 · 300.2万浏览' },
  { id: 14, tag: '#AI绘画作品', stats: '20万+篇内容 · 300.2万浏览' },
]);

// 在实际应用中，切换 tab 或点击刷新时，你会重新获取数据
// const refreshData = () => {
//   console.log(`Refreshing data for ${activeTab.value}...`);
//   // API call to fetch new items
// };
</script>

  <style scoped>
  /* 添加一些自定义样式以更好地匹配图片中的标题效果 */
  h1 span span { /* This targets the pseudo-underline for the title */
    filter: blur(1px); /* Optional: Adds a slight blur to the underline */
  }
  /* You may need to ensure your Tailwind config supports backdrop-blur if it's not working */
  </style>
