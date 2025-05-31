<template>
  <div>
    <div class="relative my-2">
      <img v-if="userStore.userInfo.avatarUrl" :src="userStore.userInfo.avatarUrl" class="w-9 h-9 rounded-full absolute top-1.5 left-2">
      <Input
        id="myInput"
        v-model="comment"
        :placeholder="placeholder"
        class="w-full h-12 pl-14 bg-background rounded-full"
      />
    </div>
    <div class="flex justify-end">
      <div class="space-x-2">
        <button class="cursor-pointer px-3 py-1 rounded-full bg-purple-500 text-white" @click="submitComment">
          发布
        </button>
        <button class="cursor-pointer px-3 py-1 rounded-full bg-[#F0F0F0] text-[#ccc]" @click="cancelComment">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import { useUserStore } from '@/stores/user'
import { ref, computed } from 'vue'
import { createWorkCommentApi } from '@/api/work'
import { createGuashiCommentApi } from '@/api/guashi'
import { toast } from 'vue-sonner'

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
  placeholder: {
    type: String,
    default: '发布你的评论',
  },
  replyId: {
    type: [Number, String],
  },
  apiType: {
    type: String,
    default: '',
  },
})

const commentApi = computed(() => {
  switch (props.apiType) {
  case 'guashi':
    return createGuashiCommentApi
  case 'work':
    return createWorkCommentApi
  default:
    return undefined
  }
})

const emit = defineEmits(['finishComment', 'closeCommentInput'])

const userStore = useUserStore()
const comment = ref('')
const focusCommentInput = () => {
  const inputElement = document.getElementById('myInput');

  if (inputElement) {
    inputElement.focus();
  }
}

const submitComment =  async () => {
  if (!comment.value) {
    toast.error('请输入评论内容')
    return
  }
  if (!commentApi.value) return
  const res = await commentApi.value(props.id, {
    replyId: props.replyId ? props.replyId : undefined,
    content: comment.value,
  })
  // TODO:评论id
  console.log('res', res)
  const { id } = res
  emit('finishComment', {
    id: id,
    content: comment.value,
    avatar: userStore.userInfo.avatarUrl,
    nickname: userStore.userInfo.nickname,
  })
  emit('closeCommentInput')
  comment.value = ''
}

const cancelComment = () => {
  comment.value = ''
  emit('closeCommentInput')
}

defineExpose({
  focusCommentInput,
})

</script>

