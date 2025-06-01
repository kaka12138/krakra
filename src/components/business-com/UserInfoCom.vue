<template>
  <div class="w-full h-full bg-white rounded-3xl">
    <!-- 用户头像和操作按钮 -->
    <div class="relative p-6">
      <div class="flex justify-between items-start mb-4">
        <div class="w-36 h-36 rounded-full overflow-hidden transform -translate-y-[3 rem]">
          <!-- TODO:更换 -->
          <img :src="userStore.userInfo.avatarUrl" alt="用户头像" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col gap-2 items-start">
          <button class="bg-[#9370DB] text-white px-3 py-0.5 rounded-full text-md cursor-pointer">
            {{ isOwner ? '编辑个人资料' : '编辑个人资料' }}
          </button>
          <div v-if="!isOwner" class="rounded-full p-2 bg-[#f0f0f0]">
            <MessageCircleMore :size="24" color="#9370DB" />
          </div>
        </div>
      </div>

      <!-- 用户信息 -->
      <div class="mb-4">
        <h1 class="text-2xl font-bold text-gray-800">
          {{ userInfoFromRequest.nickname || '默认昵称' }}
        </h1>
        <p class="text-gray-600 text-sm">
          ID:{{ userInfoFromRequest.userId }} IP属地：{{ userInfoFromRequest.nationalityId }}
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
          <span class="font-semibold text-gray-800">{{ userInfoFromRequest.followings }}</span>
          <span class="ml-1">关注</span>
        </div>
        <div class="flex items-center">
          <span class="font-semibold text-gray-800">{{ userInfoFromRequest.followers }}</span>
          <span class="ml-1">粉丝</span>
        </div>
        <div class="flex items-center">
          <span class="font-semibold text-gray-800">{{ userInfoFromRequest.likes }}</span>
          <span class="ml-1">获赞与收藏</span>
        </div>
      </div>

      <!-- 个人简介 -->
      <div class="mb-6">
        <h2 class="text-gray-600 mb-2">
          个人简介：
        </h2>
        {{ userInfoFromRequest.description || '暂无简介' }}
      </div>

      <!-- 社交链接 -->
      <div class="flex flex-col gap-3">
        <a
          v-for="item in userInfoFromRequest.urls"
          :key="item.url"
          :href="'https://' + item.url"
          target="_blank"
          class="flex items-center gap-2 text-gray-700"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.813 4.653h.854c.87 0 1.583.7 1.583 1.566v12.167c0 .862-.713 1.566-1.583 1.566h-12.54c-.87 0-1.583-.704-1.583-1.566V6.22c0-.867.713-1.567 1.582-1.567h9.688zm-8.557 12.83l2.034-4.61c.23-.52.498-.52.727 0l2.033 4.61h5.033V6.22c0-.87-.7-1.583-1.567-1.583H7.566c-.867 0-1.567.714-1.567 1.583v11.262h3.257z" />
          </svg>
          <span>{{ item.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  computed, type PropType } from 'vue'
import { useUserStore } from '@/stores/user'
import { MessageCircleMore } from 'lucide-vue-next'
import { useRoute } from 'vue-router'

import type { UserInfo } from '@/api/user'

defineProps({
  userInfoFromRequest: {
    type: Object as PropType<UserInfo>,
    default: () => ({}),
  },
})

const userStore = useUserStore()
const route = useRoute()


const isOwner = computed(() => userStore.userInfo?.userId == route.params.id)


</script>
