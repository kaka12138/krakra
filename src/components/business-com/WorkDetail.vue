<template>
  <BaseDialogCom v-model:open="isOpen" :class-arr="['max-w-4/5', 'max-h-[90vh]']">
    <div v-if="detailInfo" class="flex gap-4">
      <div class="min-w-1/2 max-w-1/2 overflow-hidden rounded-lg">
        <!-- TODO: 处理拉伸 -->
        <img :src="detailInfo.coverFileId" class="w-full h-full">
      </div>
      <div class="flex-1 relative max-h-160 overflow-y-auto">
        <div class="w-full" @click="toChainDetail">
          <ChainCom
            v-bind="chainInfo"
            :chain-list="detailInfo.chainData.slice(0, 5)"
            :show-tag="false"
          />
        </div>
        <div class="flex items-center justify-between my-6">
          <div class="flex items-center">
            <img
              v-if="detailInfo.avatar"
              :src="detailInfo.avatar"
              alt="Aminuosi avatar"
              class="w-12 h-12 rounded-full mr-4"
            >
            <CircleUserRound v-else class="w-12 h-12 rounded-full mr-4" />
            <div>
              <h1 class="text-lg font-semibold text-slate-800">
                {{ detailInfo.username ? detailInfo.username : '匿名用户' }}
              </h1>
              <div class="text-slate-500 flex items-center">
                <span>作品ID: {{ detailInfo.id }}</span>
              </div>
            </div>
          </div>
          <div class="text-xs text-slate-500">
            发布于: {{ detailInfo.createdTime }}
          </div>
        </div>

        <div class="mb-4">
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900">
            {{ detailInfo.name }}
          </h2>
        </div>

        <p class="text-slate-600 mb-6 py-2 text-md border-y-1 border-[#ccc] leading-relaxed">
          {{ detailInfo.description }}
        </p>

        <div class="flex space-x-2">
          <span v-for="item in detailInfo.tags" :key="item.id" class="bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded-full">#{{ item.name }}</span>
        </div>
        <!--评论列表 -->

        <div v-for="item in commentList" :key="item.id">
          <CommentItem :comment-info="item" @reply="subComment(item)" />
        </div>

        <div v-if="!showCommentInput" class="bg-[#f0f0f0] rounded-full sticky bottom-0 left-0 right-0 z-99 flex justify-between items-center px-2 mt-2">
          <div class="flex items-center cursor-pointer px-2 py-1 gap-x-2" @click="() => { subComment({}) }">
            <img :src="userStore.userInfo.avatarUrl" class="w-8 h-8 rounded-full">
            <span class="text-sm">说点什么...</span>
          </div>
          <div class="flex items-center gap-2">
            <HeartIcon class="w-8 h-8" />
            <span>{{ detailInfo.likeCount }}</span>
          </div>
          <div class="flex items-center gap-2">
            <PencilIcon class="w-8 h-8" />
            <span>{{ detailInfo.extendCount }}</span>
          </div>
          <div class="flex items-center gap-2">
            <MessageCircleMoreIcon class="w-8 h-8" />
            <span>{{ detailInfo.commentCount }}</span>
          </div>
        </div>
        <div class="sticky bottom-0 left-0 right-0 z-99">
          <CommentInputCom
            v-if="showCommentInput"
            ref="commentInputComRef"
            :comment-id="detailInfo.id"
            :placeholder="placeholderComment"
            :reply-id="replyId"
            @finish-comment="finishComment"
            @close-comment-input="closeCommentInput"
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
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

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

const closeCommentInput = () => {
  showCommentInput.value = false
}

const subComment = (item) => {
  replyId.value = item.id ? item.id : undefined
  placeholderComment.value = item.id ? `回复@${item.createdBy}` : '说点什么...'
  showCommentInput.value = true
}

// const thumbUpWork = async () => {
//   const { coverFileId, id, acceptId, type } = detailInfo.value
//   const data = await thumbUpWorkApi({})
//   console.log('thumbUp', data)
// }

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

const finishComment =  (item) => {
  // TODO:添加到评论列表
  // console.log('finishComment', comment)
  commentList.value.push(item)
  getCommentList()
}

const getCommentList = async () => {
  const data = await getCommentListApi(props.id)
  console.log('getCommentList', data)
  commentList.value = data
}


// 获取作品详情
const getWorkDetail = async () => {
  console.log('getWorkDetail', props.id)
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

