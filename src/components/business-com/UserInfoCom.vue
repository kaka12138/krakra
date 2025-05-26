<template>
  <div class="h-full">
    <div class="w-full h-full bg-white rounded-3xl shadow-lg overflow-hidden">
      <!-- 用户头像和操作按钮 -->
      <div class="relative p-6">
        <div class="flex justify-between items-start mb-4">
          <div class="w-24 h-24 rounded-full overflow-hidden">
            <img :src="userInfo.avatarUrl" alt="用户头像" class="w-full h-full object-cover">
          </div>
          <div class="flex flex-col items-end gap-2">
            <button class="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-1 rounded-full font-medium">
              +关注
            </button>
            <div class="flex gap-2">
              <button class="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
              <button class="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 用户信息 -->
        <div class="mb-4">
          <h1 class="text-2xl font-bold text-gray-800">
            {{ userInfo.nickname || '默认昵称' }}
          </h1>
          <p class="text-gray-600 text-sm">
            ID:{{ userInfo.userId }} IP属地：未知
          </p>

          <!-- 颜色标签 -->
          <div class="flex gap-1 mt-2">
            <span class="w-6 h-6 rounded-full bg-purple-400" />
            <span class="w-6 h-6 rounded-full bg-pink-300" />
            <span class="w-6 h-6 rounded-full bg-pink-200" />
            <span class="w-6 h-6 rounded-full bg-blue-300" />
            <span class="w-6 h-6 rounded-full bg-blue-200" />
            <span class="w-6 h-6 rounded-full bg-blue-100" />
          </div>
        </div>

        <!-- 统计数据 -->
        <div class="flex gap-4 text-sm text-gray-600 mb-6">
          <div class="flex items-center">
            <span class="font-semibold text-gray-800">1</span>
            <span class="ml-1">关注</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-800">2</span>
            <span class="ml-1">粉丝</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-800">5</span>
            <span class="ml-1">获赞与收藏</span>
          </div>
        </div>

        <!-- 个人简介 -->
        <div class="mb-6">
          <h2 class="text-gray-600 mb-2">
            个人简介：
          </h2>
          {{ userInfo.description || '暂无简介' }}
        </div>

        <!-- 社交链接 -->
        <div class="flex flex-col gap-3">
          <a href="#" class="flex items-center gap-2 text-gray-700">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.813 4.653h.854c.87 0 1.583.7 1.583 1.566v12.167c0 .862-.713 1.566-1.583 1.566h-12.54c-.87 0-1.583-.704-1.583-1.566V6.22c0-.867.713-1.567 1.582-1.567h9.688zm-8.557 12.83l2.034-4.61c.23-.52.498-.52.727 0l2.033 4.61h5.033V6.22c0-.87-.7-1.583-1.567-1.583H7.566c-.867 0-1.567.714-1.567 1.583v11.262h3.257z" />
            </svg>
            <span>Bilibili</span>
          </a>
          <a href="#" class="flex items-center gap-2 text-gray-700">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm7 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            <span>Pixiv</span>
          </a>
        </div>

        <div class="space-x-4">
          <button class="cursor-pointer bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-1 rounded-full font-medium mt-10" @click="() => { emit('createWork') }">
            创建作品
          </button>
          <button class="cursor-pointer bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-1 rounded-full font-medium mt-10" @click="() => { emit('createGuaShi') }">
            创建瓜市
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const emit = defineEmits(['createWork', 'createGuaShi'])


</script>
