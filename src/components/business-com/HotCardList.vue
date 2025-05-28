<template>
  <div class="p-4">
    <div class="max-w-md mx-auto">
      <h1 class="text-3xl sm:text-4xl font-bold text-center mb-6">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 relative">
          热门卡片
          <span class="absolute -bottom-1 left-0 w-full h-1 bg-purple-300 opacity-50 rounded-full transform scale-x-110" />
        </span>
      </h1>

      <!-- <div class="flex justify-between items-center mb-5">
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
      </div> -->

      <div class="space-y-3 h-152 overflow-y-auto ">
        <div
          v-for="item in hotCardList"
          :key="item.id"
          class="bg-white/80 backdrop-blur-sm rounded-3xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          @click="handleClickCard(item.id)"
        >
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-purple-700">
              #{{ item.name }}
            </h3>
            <p class="text-xs sm:text-sm text-gray-500 mt-0.5">
              {{ item.createdCount || 1 }} 篇内容 {{ item.seeCount || 1 }} 浏览
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

<script setup lang="ts">

defineProps({
  hotCardList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['clickCard'])

const handleClickCard = (id: number) => {
  emit('clickCard', id)
}

</script>

<style scoped>
/* 添加一些自定义样式以更好地匹配图片中的标题效果 */
h1 span span { /* This targets the pseudo-underline for the title */
  filter: blur(1px); /* Optional: Adds a slight blur to the underline */
}
/* You may need to ensure your Tailwind config supports backdrop-blur if it's not working */
</style>
