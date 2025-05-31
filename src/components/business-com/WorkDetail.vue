<template>
  <BaseDialogCom v-model:open="isOpen" :class-arr="['max-w-4/5', 'max-h-[90vh]']">
    <div v-if="detailInfo" class="flex gap-4">
      <div class="min-w-1/2 max-w-1/2 overflow-hidden rounded-lg">
        <!-- TODO: 这里是轮播 -->
        <img :src="detailInfo.coverFileId" class="w-full h-full">
      </div>
      <div class="flex-1 relative h-[70vh] overflow-y-auto">
        <div class="w-full" @click="toChainDetail">
          <ChainCom
            v-bind="chainInfo"
            :chain-list="detailInfo.chainData.slice(0, 5)"
          />
        </div>
        <div class="flex items-center justify-between my-6">
          <div class="flex items-center">
            <img
              v-if="detailInfo.avatar"
              :src="detailInfo.avatar"
              alt="Aminuosi avatar"
              class="w-12 h-12 rounded-full mr-1"
            >
            <CircleUserRound v-else color="#9370DB" class="w-12 h-12 rounded-full mr-1" />
            <div>
              <h1 class="text-lg font-semibold text-black">
                {{ detailInfo.username ? detailInfo.username : '匿名用户' }}
              </h1>
              <div class="text-sm text-gray-500 flex items-center">
                <span>作品ID: {{ detailInfo.id }}</span>
              </div>
            </div>
          </div>
          <div class="text-sm text-gray-500">
            发布于: {{ detailInfo.createdTime }}
          </div>
        </div>


        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900">
          {{ detailInfo.name }}
        </h2>


        <p class="text-slate-600 my-4 py-2 text-md border-y-1 border-[#ccc] leading-relaxed">
          {{ detailInfo.description }}
        </p>

        <div class="flex space-x-2">
          <span v-for="item in detailInfo.tags" :key="item.id" class="bg-[#9370DB] text-white text-xs px-3 py-1 rounded-full">#{{ item.name }}</span>
        </div>
        <!--评论列表 -->

        <div v-for="item in commentList" :key="item.id">
          <CommentItem :comment-info="item" @thumb-up="handleThumbUpComment" @reply="handleReply" />
        </div>

        <div v-if="!showCommentInput" class="bg-[#eee] sticky w-full box-border bottom-0 z-99 flex rounded-full justify-between items-center">
          <div class="bg-[#ddd] rounded-full flex items-center cursor-pointer px-1 py-1 gap-x-2" @click="handleWorkComment(detailInfo)">
            <img :src="userStore.userInfo.avatarUrl" class="w-8 h-8 rounded-full">
            <span class="text-sm">说点什么...</span>
          </div>
          <div class="flex-1 flex items-center justify-evenly">
            <div class="flex items-center gap-2 cursor-pointer" @click="handleWorkThumbUp(detailInfo)">
              <HeartIcon
                class="w-9 h-9"
                color="#aaa"
                :fill="detailInfo.followerFlag ? 'red' : 'none'"
                stroke-width="1"
              />
              <span class="text-xl text-[#aaa]">{{ detailInfo.likeCount }}</span>
            </div>
            <div class="flex items-center gap-2 cursor-pointer">
              <PencilIcon class="w-9 h-9" color="#aaa" />
              <span class="text-xl text-[#aaa]">{{ detailInfo.extendCount }}</span>
            </div>
            <div class="flex items-center gap-2 cursor-pointer">
              <MessageCircleMoreIcon class="w-9 h-9" color="#aaa" />
              <span class="text-xl text-[#aaa]">{{ detailInfo.commentCount }}</span>
            </div>
          </div>
        </div>
        <div class="sticky bottom-0 left-0 right-0 z-99">
          <CommentInputCom
            v-if="showCommentInput"
            :id="detailInfo.id"
            ref="commentInputComRef"
            :placeholder="placeholderComment"
            :reply-id="replyId"
            api-type="work"
            @finish-comment="finishComment"
            @close-comment-input="showCommentInput = false"
          />
        </div>
      </div>
    </div>
  </BaseDialogCom>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import ChainCom from './ChainCom.vue';
import CommentItem from './CommentItem.vue';
import CommentInputCom from './CommentInputCom.vue';
import BaseDialogCom from './BaseDialogCom.vue';
import { CircleUserRound, HeartIcon, MessageCircleMoreIcon, PencilIcon } from 'lucide-vue-next';
import { getWorkDetail_Api, getCommentListApi, thumbUpWorkApi } from '@/api/work';
import { thumbUpCommentApi } from '@/api/comment'
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core'
import { getUrlId } from '@/utils/common'

const router = useRouter()
console.log('router', router)

const props = defineProps({
  open: Boolean,
  id: String || Number,
})

const userStore = useUserStore()


const isOpen = ref(props.open || false)

const emit = defineEmits(['closed'])

const detailInfo = ref({})

const commentList = ref([])
const placeholderComment = ref('')
const replyId = ref('')
const commentInputComRef = ref(null)
const showCommentInput = ref(false)

const chainInfo = computed(() => {
  const { chainData } = detailInfo.value
  if(!chainData) return {}
  const sliceChain = chainData.slice(0, 5)
  const highlightNodes = [sliceChain[0].id]
  const currentNodeId = sliceChain[sliceChain.length - 1].id
  return {
    highlightNodes,
    currentNodeId,
  }
})

const toChainDetail = () => {
  console.log('toChainDetail', detailInfo.value)
  router.push({
    path: '/chainDetail',
    query: {
      id: detailInfo.value.id,
    },
  })
  isOpen.value = false
}

// thumbup
const thumbUpWorkDebounce = useDebounceFn((item) => {
  const { id, creatorId, imageFileIds } = item
  thumbUpWorkApi({
    postId: id,
    acceptId: creatorId,
    coverFileId: getUrlId(imageFileIds[0]),
  })
}, 1000)


const handleWorkThumbUp = (item) => {
  item.followerFlag = !item.followerFlag
  item.followers = item.followerFlag ? item.followers + 1 : item.followers - 1
  thumbUpWorkDebounce(item)
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


const handleReply = ({ id, nickname }) => {
  showCommentInput.value = true
  replyId.value = id
  placeholderComment.value = `回复 ${nickname || '匿名用户'}:`
  commentInputComRef.value?.focusCommentInput()
}

const handleWorkComment = () => {
  showCommentInput.value = true
  placeholderComment.value = '发布你的评论'
  commentInputComRef.value?.focusCommentInput()
}

const finishComment = (data) => {
  // TODO:添加到评论列表
  console.log('finishComment', data)
  commentList.value.unshift(data)
  replyId.value = null
}

const getCommentList = async () => {
  const data = await getCommentListApi(props.id)
  console.log('getCommentList', data)
  commentList.value = data
}


// 获取作品详情
const getWorkDetail = async () => {
  const data = await getWorkDetail_Api(props.id)
  detailInfo.value = data
  await getCommentList()
  isOpen.value = true
}

// TODO: 这里需要优化，暂时处理
watch(() => props.id, (newVal) => {
  console.log('watch', newVal)
  getWorkDetail()
}, {
  immediate: true,
})

// TODO:暂时的，去了解shadcn-vue, 优化传递方式
watch(isOpen, (newVal) => {
  if(!newVal) {
    emit('closed')
  }
})
</script>

