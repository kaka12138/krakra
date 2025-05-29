<template>
  <div v-if="guashiInfo" class="w-full bg-[#FAFAFA] rounded-xl p-4">
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
        {{ guashiInfo.content }}
      </p>
    </div>

    <!-- 标签区域 -->
    <div class="flex gap-2 mb-3">
      <span v-for="tag in guashiInfo.tags" :key="tag.id" class="text-xs text-purple-500">#{{ tag.name }}</span>
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
        <!-- TODO: 缺点赞字段 -->
        <span class="text-sm">{{ guashiInfo.directions }}</span>
      </div>
    </div>
    <!-- 评论 -->
    <div>
      <CommentInputCom
        ref="inputRef"
        :comment-id="commentId"
        :placeholder="placeholder"
        @finish-comment="finishComment"
      />
      <div class="h-40 overflow-y-auto mt-6">
        <div v-for="item in 10" :key="item" class="border-b border-gray-200 py-2">
          <div class="flex items-center gap-x-2 my-3">
            <img src="https://picsum.photos/200/300" class="w-10 h-10 rounded-full">
            <div>
              <p class="text-base text-[#333]">
                张三
              </p>
              <p>这是一个测试内容</p>
            </div>
          </div>
          <div class="ml-12 flex gap-x-10">
            <div class="flex items-center gap-x-2 cursor-pointer">
              <HeartIcon /> <span>100</span>
            </div>
            <div class="flex items-center gap-x-2 cursor-pointer" @click="handleReply(replyId)">
              <MessageCircleMoreIcon /> <span>评论</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageCircleMoreIcon, ThumbsUpIcon, HeartIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import CommentInputCom from '@/components/business-com/CommentInputCom.vue'

const props = defineProps({
  guashiInfo: Object,
})
const commentList = ref([])
const inputRef = ref(null)
const commentId = ref(props.guashiInfo.id)
const placeholder = ref('发布你的评论')

const handleReply = (replyId: number) => {
  console.log(replyId)
  commentId.value = replyId
  inputRef.value?.focusCommentInput()
}

const finishComment = () => {
  commentId.value = props.guashiInfo.id
}
</script>
