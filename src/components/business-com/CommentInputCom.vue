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
import { ref } from 'vue'

defineProps({
  placeholder: {
    type: String,
    default: '发布你的评论',
  },
  commentId: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['finishComment'])

const userStore = useUserStore()
const comment = ref('')
const focusCommentInput = () => {
  const inputElement = document.getElementById('myInput');
  // placeholder.value = ''
  if (inputElement) {
    inputElement.focus();
  }
}

const submitComment = () => {
  console.log(comment.value)
  emit('finishComment')
}

const cancelComment = () => {
  comment.value = ''
}

defineExpose({
  focusCommentInput,
})

</script>

