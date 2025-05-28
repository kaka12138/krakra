<template>
  <div v-if="guashiInfo" class="w-full bg-background rounded-xl p-4">
    <!-- 用户信息区域 -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img :src="guashiInfo.avatar" alt="用户头像" class="w-full h-full object-cover">
        </div>
        <div>
          <div class="flex items-center gap-1">
            <span class="font-medium text-sm">{{ guashiInfo.username }}</span>
            <div class="w-4 h-4 rounded-full bg-purple-500" />
            <div class="w-4 h-4 rounded-full bg-yellow-400" />
          </div>
          <div class="text-xs text-gray-500">
            {{ guashiInfo.name }}
          </div>
        </div>
      </div>
      <button class="text-sm px-3 py-1 rounded-full border border-yellow-400 text-yellow-500">
        + 关注
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="mb-3">
      <p class="text-sm text-gray-800 mb-2">
        {{ guashiInfo.description }}
      </p>
    </div>

    <!-- 标签区域 -->
    <div class="flex gap-2 mb-3">
      <span v-for="(tag, index) in guashiInfo.tags" :key="index" class="text-xs text-purple-500">#{{ tag }}</span>
      <!-- <span class="ml-auto text-xs text-gray-500">收回</span> -->
    </div>

    <!-- 图片网格 -->
    <div class="grid grid-cols-3 gap-1 mb-3">
      <div v-for="(image, index) in guashiInfo.imageFileIds" :key="index" class="relative aspect-square rounded-md overflow-hidden">
        <img :src="image" class="w-full h-full object-cover">
      </div>
    </div>

    <!-- 互动区域 -->
    <div class="pt-4 flex items-center justify-center gap-x-20 text-gray-500">
      <div class="flex items-center cursor-pointer">
        <MessageCircleMoreIcon />
        <span class="text-sm">{{ guashiInfo.comments }}</span>
      </div>
      <div class="flex items-center cursor-pointer">
        <ThumbsUpIcon />
        <span class="text-sm">{{ guashiInfo.likes }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MessageCircleMoreIcon, ThumbsUpIcon } from 'lucide-vue-next'

defineProps({
  guashiInfo: Object,
})

</script>
