<template>
  <div v-if="artwork" class="w-full max-w-sm rounded-lg shadow-lg overflow-hidden" @click="handleClick">
    <div class="relative">
      <img
        :src="artwork.coverFileId"
        alt="Artwork Image"
        class="w-full h-auto"
      >
    </div>
    <!-- class="w-full h-auto aspect-[3/4] object-cover" -->
    <div class="p-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-1">
        {{ artwork.username }}
      </h2>
      <div class="flex items-center text-sm text-gray-500 mb-3 gap-x-1">
        <span>作品ID: {{ artwork.creatorId }}</span>
        <CopyIcon size="16" />
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img
            :src="artwork.avatar"
            alt="Author Avatar"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 border border-gray-200"
          >
          <div>
            <p class="text-sm font-medium text-gray-700">
              {{ artwork.name }}
            </p>
            <div class="flex space-x-1 mt-0.5">
              <span class="w-2 h-2 bg-yellow-400 rounded-full" />
              <span class="w-2 h-2 bg-purple-500 rounded-full" />
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3 sm:space-x-4 text-gray-600">
          <button class="flex items-center hover:text-pink-500">
            <HeartIcon />
            <span class="text-xs sm:text-sm">{{ artwork.likeCount }}</span>
          </button>
          <button class="flex items-center hover:text-blue-500">
            <BookmarkIcon />
            <span class="text-xs sm:text-sm">{{ artwork.commentCount }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CopyIcon, BookmarkIcon, HeartIcon } from 'lucide-vue-next';
// TODO: 每个组件都有一个弹窗？？？
import { useWorkDetail } from '@/hooks/useWorkDetial';
const props = defineProps({
  artwork: {
    type: Object,
    required: true,
  },
});

const { open } = useWorkDetail()

const handleClick = () => {
  console.log('handleClick', props.artwork.id)
  if (!props.artwork.id) return
  // open(props.artwork.id)
  open('55')
}

</script>

  <style scoped>
  /*
    writing-mode and text-orientation are used for vertical text.
    Tailwind CSS v3+ with JIT mode supports arbitrary values like `[writing-mode:vertical-rl]`.
    If you are on an older version or not using JIT, these inline styles are a safe bet.
    Alternatively, you can add custom utilities to your tailwind.config.js.
  */
  /* For better CJK font rendering, you might want to specify fonts in your tailwind.config.js or global CSS */
  /* For example:
  body {
    font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
  }
  */
  </style>
