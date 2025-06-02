<template>
  <BaseDialogCom v-model:open="isOpen" :class-arr="['max-w-4/5', 'max-h-[90vh]']">
    <div v-if="detailInfo" class="flex gap-4">
      <div class="min-w-1/2 max-w-1/2 overflow-hidden">
        <!-- TODO: 这里是轮播 -->
        <img :src="detailInfo.coverFileId" class="w-full h-auto rounded-lg">
      </div>
      <div class="relative w-1/2">
        <div class="h-[70vh] overflow-y-auto">
          <div class="w-full" @click="toChainDetail">
            <ChainCom
              v-bind="chainInfo"
              :chain-list="detailInfo.chainData ? detailInfo.chainData.slice(0, 5) : []"
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

          <div class="mb-12">
            <div v-for="item in commentList" :key="item.id">
              <CommentItem :comment-info="item" @thumb-up="handleThumbUpComment" @reply="handleReply" />
            </div>
          </div>

          <div v-if="!showCommentInput" class="bg-[#eee] absolute w-full box-border left-0 bottom-0 z-99 flex justify-between items-center">
            <div class="bg-[#ddd] rounded-full flex items-center cursor-pointer px-1 py-1 gap-x-2" @click="handleWorkComment(detailInfo)">
              <img :src="userStore.userInfo.avatarUrl" class="w-8 h-8 rounded-full">
              <span class="text-sm">说点什么...</span>
            </div>
            <div class="flex-1 flex items-center justify-evenly">
              <div class="flex items-center gap-2 cursor-pointer" @click="handleLike(detailInfo)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="22"
                  height="22"
                  viewBox="0 0 17.6666259765625 15.30224609375"
                  :fill="detailInfo.likeFlag ? '#926DDE' : 'none'"
                >
                  <path
                    d="M5.08333 0.5C2.55203 0.5 0.5 2.55204 0.5 5.08333C0.5 9.66667 5.91667 13.8333 8.83333 14.8026C11.75 13.8333 17.1667 9.66667 17.1667 5.08333C17.1667 2.55204 15.1146 0.5 12.5833 0.5C11.0332 0.5 9.66279 1.26954 8.83333 2.44742C8.00387 1.26954 6.63346 0.5 5.08333 0.5Z"
                    stroke="rgba(102, 102, 102, 1)"
                    stroke-width="1"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                  />
                </svg>
                <span class="text-xl text-[#aaa]">{{ detailInfo.likeCount }}</span>
              </div>
              <div class="flex items-center gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="22"
                  height="22"
                  viewBox="0 0 13.52001953125 13.419921875"
                >
                  <path :fill-rule="detailInfo.followerFlag ? 'nonzero' : 'evenodd'" :fill="detailInfo.followerFlag ? '#926DDE' : '#666666'" d="M7.77 0L13.01 0L6.91 5.95L13.52 13.42L8.31 13.42L4.2 8.59L3.87 8.91L3.87 13.42L0 13.42L0 0L3.87 0L3.87 3.95L7.47 0.3L7.77 0ZM9.53 2L5.53 5.9L10.42 11.42L11.3 12.42L8.78 12.42L4.26 7.13L3.55 7.83L2.87 8.49L2.87 12.42L1 12.42L1 1L2.87 1L2.87 6.39L3.87 5.38L8.18 1L10.55 1L9.53 2Z" />
                </svg>
                <span class="text-xl text-[#aaa]">{{ detailInfo.extendCount }}</span>
              </div>
              <div class="flex items-center gap-2 cursor-pointer">
                <MessageCircleMoreIcon class="w-9 h-9" color="#aaa" />
                <span class="text-xl text-[#aaa]">{{ detailInfo.commentCount }}</span>
              </div>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 z-99">
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
    </div>
  </BaseDialogCom>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import ChainCom from './ChainCom.vue';
import CommentItem from './CommentItem.vue';
import CommentInputCom from './CommentInputCom.vue';
import BaseDialogCom from './BaseDialogCom.vue';
import { CircleUserRound, MessageCircleMoreIcon } from 'lucide-vue-next';
import { getWorkDetail_Api, getCommentListApi, thumbUpWorkApi } from '@/api/work';
import { thumbUpCommentApi } from '@/api/comment'
import { useUserStore } from '@/stores/user';
import { useDebounceFn } from '@vueuse/core'
import { getUrlId } from '@/utils/common'
import { useRouter } from 'vue-router'


const props = defineProps({
  open: Boolean,
  id: [String, Number],
})

const userStore = useUserStore()

const router = useRouter()


const isOpen = ref(props.open || false)

const emit = defineEmits(['closed', 'toChainDetailPage'])

const detailInfo = ref()

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
  const { id } = detailInfo.value.chainData[0]
  router.push({
    path: '/chainDetail',
    query: {
      id,
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

// 收藏
const handleLike = (item) => {
  console.log('handleLike', item)
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

