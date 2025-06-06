<template>
  <div class="py-2 border-b-1 border-[#ccc]">
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
      <div class="flex items-center gap-x-2 cursor-pointer" @click="handleThumbUpComment">
        <HeartIcon :fill="commentInfo.followerFlag ? '#9370DB' : 'none'" stroke-width="1" /> <span>{{ commentInfo.thumbsUps }}</span>
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

const emit = defineEmits(['reply', 'thumbUp'])

const handleReply = () => {
  emit('reply', props.commentInfo)
}

const handleThumbUpComment = () => {
  emit('thumbUp', props.commentInfo)
}

</script>
