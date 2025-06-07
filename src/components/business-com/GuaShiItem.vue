<template>
  <div v-if="guashiInfo" class="w-full bg-[#FAFAFA] rounded-xl p-4">
    <!-- 用户信息区域 -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <div class="w-13 h-13 rounded-full overflow-hidden">
          <img :src="guashiInfo.avatar" alt="用户头像" class="w-full h-full object-cover">
        </div>
        <div>
          <div class="flex items-center gap-1">
            <span class="font-medium texrt-[#333] text-2xl">{{ guashiInfo.username || '匿名用户' }}</span>
            <div class="w-4 h-4 rounded-full bg-purple-500" />
            <div class="w-4 h-4 rounded-full bg-yellow-400" />
          </div>
          <div class="text-xl text-[#999]">
            {{ guashiInfo.name }}
          </div>
        </div>
      </div>
      <!-- TODO: -->
      <button class="text-sm px-3 py-1 rounded-full border border-yellow-400 text-yellow-500">
        + 关注
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="mb-3">
      <p class="text-2xl text-gray-800 mb-2">
        {{ guashiInfo.content }}
      </p>
    </div>

    <!-- 标签区域 -->
    <div class="flex flex-wrap gap-2 mb-3">
      <span v-for="tag in guashiInfo.tags" :key="tag.id" class="text-xl text-purple-500">#{{ tag.name }}</span>
      <!-- <span class="ml-auto text-xs text-gray-500">收回</span> -->
    </div>

    <!-- 图片网格 -->
    <div class="grid grid-cols-3 gap-4 mb-3">
      <div v-for="(image, index) in guashiInfo.imageFileIds" :key="index" class="relative aspect-square rounded-md overflow-hidden">
        <img :src="image" class="w-full h-full object-cover">
      </div>
    </div>

    <!-- 互动区域 -->
    <div class="pt-4 flex items-center justify-center gap-x-20 text-gray-500">
      <div class="flex items-center cursor-pointer" @click="handleThumbUpGuashi(guashiInfo)">
        <ThumbsUpIcon :fill="guashiInfo.followerFlag ? '#E86868' : 'none'" stroke-width="1" />
        <!-- TODO: 缺点赞字段 -->
        <span class="text-sm">{{ guashiInfo.followers || 0 }}</span>
      </div>
      <div class="flex items-center cursor-pointer" @click="viewComments">
        <MessageCircleMoreIcon />
        <span class="text-sm">{{ guashiInfo.comments || 0 }}</span>
      </div>
      <div class="flex items-center cursor-pointer">
        <ShareIcon />
        <!-- TODO: 缺少分享字段 -->
        <span class="text-sm">{{ guashiInfo.directions || 0 }}</span>
      </div>
    </div>
    <!-- 评论 -->
    <div v-if="showComments">
      <CommentInputCom
        :id="guashiInfo.id"
        ref="commentInputComRef"
        :placeholder="placeholder"
        :reply-id="replyId"
        api-type="guashi"
        @close-comment-input="showComments = false"
        @finish-comment="finishComment"
      />
    </div>
    <div class="max-h-120 overflow-auto ">
      <div v-for="item in commentList" :key="item.id" class="border-b border-gray-200 py-2">
        <div class="flex items-center gap-x-2 my-3">
          <img :src="item.avatar" class="w-10 h-10 min-w-10 min-h-10 rounded-full">
          <div>
            <p class="text-base text-[#333]">
              {{ item.nickname || '匿名用户' }}
            </p>
            <p>{{ item.content }}</p>
          </div>
        </div>
        <div class="ml-12 flex gap-x-10">
          <div class="flex items-center gap-x-2 cursor-pointer" @click="handleThumbUpComment(item)">
            <HeartIcon :fill="item.followerFlag ? 'red' : 'none'" stroke-width="1" /><span>{{ item.thumbsUps || 0 }}</span>
          </div>
          <div class="flex items-center gap-x-2 cursor-pointer" @click="handleReply(item)">
            <MessageCircleMoreIcon /> <span>评论</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageCircleMoreIcon, ThumbsUpIcon, HeartIcon, ShareIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import CommentInputCom from '@/components/business-com/CommentInputCom.vue'
import { getGuashiCommentsApi, thumbUpGuashiApi } from '@/api/guashi'
import { thumbUpCommentApi } from '@/api/comment'
import { useDebounceFn } from '@vueuse/core'
import { getUrlId } from '@/utils/common'


const props = defineProps({
  guashiInfo: Object,
})
const commentList = ref([])
const showComments = ref(false)
const commentInputComRef = ref(null)
const replyId = ref(null)
const placeholder = ref('发布你的评论')

const handleReply = ({ id, nickname }) => {
  showComments.value = true
  replyId.value = id
  placeholder.value = `回复 ${nickname || '匿名用户'}:`
  commentInputComRef.value?.focusCommentInput()
}

const finishComment = (data: any) => {
  console.log('finishComment')
  commentList.value.unshift(data)
  replyId.value = null
}

const thumbUpCommentDebounce = useDebounceFn((item) => {
  const { id: commentId, userId: acceptId, content } = item
  thumbUpCommentApi({
    commentId,
    acceptId,
    content,
  })
}, 1000)

const handleThumbUpComment = (item) => {
  item.followerFlag = !item.followerFlag
  item.thumbsUps = item.followerFlag ? item.thumbsUps + 1 : item.thumbsUps - 1
  thumbUpCommentDebounce(item)
}

const thumbUpGuashiDebounce = useDebounceFn((item) => {
  const { id, creatorId, imageFileIds } = item
  thumbUpGuashiApi({
    postId: id,
    acceptId: creatorId,
    coverUrl: getUrlId(imageFileIds[0]),
  })
}, 1000)

const handleThumbUpGuashi = (item) => {
  item.followerFlag = !item.followerFlag
  item.followers = item.followerFlag ? item.followers + 1 : item.followers - 1
  thumbUpGuashiDebounce(item)
}

const viewComments = async () => {
  showComments.value = true
  // TODO: 这里需要优化，暂时处理
  placeholder.value = '发布你的评论'
  const res = await getGuashiCommentsApi(props.guashiInfo.id)
  commentList.value = res || []

}

</script>
