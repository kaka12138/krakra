<template>
  <div class="border-b border-gray-200 py-2">
    <div class="flex items-center gap-x-2 my-3">
      <img :src="commentInfo.avatar" class="w-10 h-10 rounded-full">
      <div>
        <p class="text-base text-[#333]">
          {{ commentInfo.username }}
        </p>
        <p>{{ commentInfo.content }}</p>
      </div>
    </div>
    <div class="ml-12 flex gap-x-10">
      <div class="flex items-center gap-x-2 cursor-pointer">
        <HeartIcon /> <span>{{ commentInfo.likeCount }}</span>
      </div>
      <div class="flex items-center gap-x-2 cursor-pointer" @click="handleReply(replyId)">
        <MessageCircleMoreIcon /> <span>评论</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageCircleMoreIcon, HeartIcon } from 'lucide-vue-next'
defineProps({
  commentInfo: Object,
})

</script>
