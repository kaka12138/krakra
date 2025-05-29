<template>
  <div class="border-b border-gray-200 py-2">
    <div class="flex gap-x-2 my-3">
      <img v-if="commentInfo.avatar" :src="commentInfo.avatar" class="w-8 h-8 max-h-8 rounded-full">
      <div v-else class="border-1 border-[#333] rounded-full max-h-8">
        <UserRoundXIcon class="w-8 h-8 rounded-full" />
      </div>
      <div>
        <p class="text-base text-[#999]">
          <!-- TODO:用户名 -->
          {{ commentInfo.nickname || '匿名用户' }}
        </p>
        <p class="text-md text-[#333] ">
          {{ commentInfo.content }}
        </p>
      </div>
    </div>
    <div class="ml-12 flex gap-x-10">
      <div class="flex items-center gap-x-2 cursor-pointer">
        <HeartIcon /> <span>{{ commentInfo.thumbsUps }}</span>
      </div>
      <div class="flex items-center gap-x-2 cursor-pointer" @click="handleReply">
        <MessageCircleMoreIcon /> <span>评论</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageCircleMoreIcon, HeartIcon, UserRoundXIcon } from 'lucide-vue-next'
const props = defineProps({
  commentInfo: Object,
})

const emit = defineEmits(['reply'])

const handleReply = () => {
  emit('reply', props.commentInfo)
}

</script>
