<template>
  <div
    v-if="artwork"
    class="w-full max-w-sm overflow-hidden"
    @click="handleClick"
  >
    <div
      class="relative rounded-lg overflow-hidden"
      :class="[isCreateCollectionMode ? 'border-2' : 'border-0', isCreateCollectionMode && artwork.isSelected ? 'border-[#926DDE] z-9999' : ' border-[#ccc]']"
      @click="handleSelectCollection"
    >
      <img
        :src="artwork.coverFileId"
        alt="Artwork Image"
        class="w-full h-auto"
        :class="[isCreateCollectionMode && artwork.isSelected ? 'brightness-125' : '', viewNsfw ? 'blur-sm' : '']"
      >
      <div v-if="isCreateCollectionMode && artwork.isSelected" class="absolute top-1 left-1 p-0.5 bg-[#926DDE] rounded-full flex items-center justify-center">
        <CheckIcon :size="18" color="white" />
      </div>
      <!-- 18+ -->
      <div v-if="viewNsfw" class="w-full h-full absolute top-0 left-0 z-88 flex flex-col items-center justify-center gap-y-1" @click.stop="() => {}">
        <img src="../../../imgs/18+.png" alt="18+" class="w-16 h-16">
        <p class="text-[#ccc] text-lg font-medium">
          敏感内容
        </p>
        <p class="text-[#ccc] text-sm">
          这个作品包含敏感内容
        </p>
        <button class="px-3 py-1 text-xs rounded-full bg-[#ccc] mix-blend-overlay text-black cursor-pointer" @click.stop="viewNsfw =false">
          查 看
        </button>
      </div>
    </div>
    <!-- class="w-full h-auto aspect-[3/4] object-cover" -->
    <div class="p-4">
      <h2 class="text-lg font-semibold text-gray-800 mb-1">
        {{ artwork.name }}
      </h2>
      <div class="flex items-center text-sm text-gray-500 mb-3 gap-x-1">
        <span>作品ID: {{ artwork.creatorId }}</span>
        <CopyIcon :size="16" />
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img
            :src="artwork.avatar"
            alt="Author Avatar"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 border border-gray-200"
            @click.stop="toMyWorkPage(artwork.creatorId)"
          >

          <p class="text-sm font-medium text-gray-700">
            {{ artwork.username ||'匿名用户' }}
          </p>
          <div class="flex space-x-1 ml-0.5">
            <span class="w-3 h-3 bg-yellow-400 rounded-full" />
            <span class="w-3 h-3 bg-purple-500 rounded-full" />
          </div>
        </div>

        <div class="flex items-center space-x-3 sm:space-x-4 text-gray-600">
          <button class="flex flex-col items-center cursor-pointer" @click.stop="handleLike">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="22"
              height="22"
              viewBox="0 0 17.6666259765625 15.30224609375"
              :fill="artwork.likeFlag ? '#926DDE' : 'none'"
            >
              <path
                d="M5.08333 0.5C2.55203 0.5 0.5 2.55204 0.5 5.08333C0.5 9.66667 5.91667 13.8333 8.83333 14.8026C11.75 13.8333 17.1667 9.66667 17.1667 5.08333C17.1667 2.55204 15.1146 0.5 12.5833 0.5C11.0332 0.5 9.66279 1.26954 8.83333 2.44742C8.00387 1.26954 6.63346 0.5 5.08333 0.5Z"
                stroke="rgba(102, 102, 102, 1)"
                stroke-width="1"
                stroke-linejoin="round"
                stroke-linecap="round"
              />
            </svg>

            <span class="text-xs sm:text-sm">{{ artwork.likeCount || 0 }}</span>
          </button>
          <button class="flex flex-col items-center cursor-pointer" @click.stop="() => {}">
            <!-- <BookmarkIcon /> -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="22"
              height="22"
              viewBox="0 0 13.52001953125 13.419921875"
            >
              <path :fill-rule="artwork.followerFlag ? 'nonzero' : 'evenodd'" :fill="artwork.followerFlag ? '#926DDE' : '#666666'" d="M7.77 0L13.01 0L6.91 5.95L13.52 13.42L8.31 13.42L4.2 8.59L3.87 8.91L3.87 13.42L0 13.42L0 0L3.87 0L3.87 3.95L7.47 0.3L7.77 0ZM9.53 2L5.53 5.9L10.42 11.42L11.3 12.42L8.78 12.42L4.26 7.13L3.55 7.83L2.87 8.49L2.87 12.42L1 12.42L1 1L2.87 1L2.87 6.39L3.87 5.38L8.18 1L10.55 1L9.53 2Z" />
            </svg>

            <span class="text-xs sm:text-sm">{{ artwork.extendCount || 0 }}</span>
          </button>
        </div>
      </div>
      <div v-if="isRecreationMode" class="hover:bg-[#926DDE] hover:text-white transition-all duration-300 text-center text-[#926DDE] mt-2 cursor-pointer border border-[#926DDE] rounded-full px-2 py-1">
        去二创
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {CopyIcon, CheckIcon } from 'lucide-vue-next';
// TODO: 每个组件都有一个弹窗？？？
import { useWorkDetail } from '@/hooks/useWorkDetial';

const router = useRouter()

const props = defineProps({
  isCreateCollectionMode: {
    type: Boolean,
    default: false,
  },
  artwork: {
    type: Object,
    required: true,
  },
  // TODO: 优化
  isRecreationMode: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['handleSelectCollection'])

// TODO:后端判断
const viewNsfw = ref(props.artwork.isNsfw)

const { open } = useWorkDetail(router)

const handleLike = () => {
  console.log('handleLike')
}

const handleSelectCollection = (e: Event) => {
  if (props.isCreateCollectionMode) {
    e.stopPropagation()
    emit('handleSelectCollection', props.artwork)
  }
}

const handleClick = () => {
  console.log('handleClick')
  if (!props.artwork.id) return
  open(props.artwork.id)
}

const toMyWorkPage = (id: string | number) => {
  router.push({
    path: `/about/${id}/mywork`,
  })
}
</script>
