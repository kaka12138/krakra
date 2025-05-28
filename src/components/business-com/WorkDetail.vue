<template>
  <BaseDialogCom v-model:open="isOpen" :class-arr="['max-w-4/5', 'max-h-[90vh]']">
    <div class="flex gap-4">
      <div class="min-w-1/2 max-h-160 overflow-hidden rounded-lg">
        <img src="https://picsum.photos/200/300" class="w-full h-auto">
      </div>
      <div class="relative max-h-160 overflow-y-auto">
        <div class="w-full">
          <ChainCom :chain-list="chainList" />
        </div>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <img
              src="https://via.placeholder.com/50/2563EB/FFFFFF?text=A"
              alt="Aminuosi avatar"
              class="w-12 h-12 rounded-full mr-4"
            >
            <div>
              <h1 class="text-lg font-semibold text-slate-800">
                Aminuosi
              </h1>
              <div class="text-xs text-slate-500 flex items-center">
                <span>作品ID: 23141556151</span>
                <button class="ml-1.5 text-slate-400 hover:text-slate-600" @click="copyId">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM6 11a1 1 0 011-1h7a1 1 0 110 2H7a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                    <path fill-rule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="text-xs text-slate-500">
            发布于: 2025.1.1
          </div>
        </div>

        <div class="mb-4">
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900">
            CherriFire 3rd Life x
          </h2>
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900">
            TMA AU 3
          </h2>
        </div>

        <p class="text-slate-600 mb-6 text-sm leading-relaxed">
          seems to float like a whimsical code, blending warmth with an enigmatic charm, as if whispering secrets in a language only the heart can decipher.
        </p>

        <div class="flex space-x-2">
          <span class="bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded-full">#插画</span>
          <span class="bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded-full">#插画</span>
          <span class="bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded-full">#插画</span>
        </div>
        <!--评论列表 -->

        <CommentItem :comment-info="commentInfo" />
        <CommentItem :comment-info="commentInfo" />
        <CommentItem :comment-info="commentInfo" />
        <CommentItem :comment-info="commentInfo" />
        <CommentItem :comment-info="commentInfo" />


        <div class="sticky bottom-0 left-0 right-0 z-99">
          <CommentInputCom />
        </div>
      </div>
    </div>
  </BaseDialogCom>
</template>

<script setup>
import { ref, watch } from 'vue';
import ChainCom from './ChainCom.vue';
import CommentItem from './CommentItem.vue';
import CommentInputCom from './CommentInputCom.vue';
import BaseDialogCom from './BaseDialogCom.vue';

const props = defineProps({
  open: Boolean,
})

const isOpen = ref(props.open || true)

const emit = defineEmits(['closed'])

const userId = ref('23141556151');
const chainList = ref([{
  id: 1,
  name: '零号位',
},
{
  id: 2,
  name: '',
},
{
  id: 3,
  name: '',
},
{
  id: 4,
  name: '',
},
{
  id: 5,
  name: '当前创作',
}])

const commentInfo = ref({
  avatar: 'https://picsum.photos/200/300',
  username: '张三',
  content: '这是一个测试内容',
  likeCount: 100,
})

const copyId = async () => {
  try {
    await navigator.clipboard.writeText(userId.value);
    // Optional: Add a notification like "ID copied!"
    console.log('ID copied to clipboard');
  } catch (err) {
    console.error('Failed to copy ID: ', err);
    // Optional: Handle error (e.g., show an error message)
  }
};

// TODO:暂时的，去了解shadcn-vue, 优化传递方式
watch(isOpen, (newVal) => {
  if(!newVal) {
    emit('closed')
  }
})
</script>

