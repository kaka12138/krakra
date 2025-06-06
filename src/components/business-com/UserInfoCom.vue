<template>
  <div class="w-full h-full bg-white rounded-3xl">
    <!-- 用户头像和操作按钮 -->
    <div class="relative p-6">
      <div class="flex justify-between items-start mb-4">
        <div class="w-32 h-32 min-w-32 min-h-32 rounded-full overflow-hidden transform -translate-y-15">
          <!-- TODO:更换 -->
          <img :src="userStore.userInfo.avatarUrl" alt="用户头像" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col gap-2 items-start">
          <button class="bg-[#9370DB] text-white px-3 py-0.5 rounded-full text-sm cursor-pointer">
            {{ isOwner ? '编辑个人资料' : '编辑个人资料' }}
          </button>
          <div v-if="isOwner" class="rounded-full p-1 bg-[#f0f0f0] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="w-6 h-6"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path d="M9 1.5C10.2135 1.5 11.426 1.8045 12.5 2.37C16.157 4.299 17.5675 8.843 15.64 12.5C14.3245 14.9945 11.7345 16.5 9 16.5C8.4645 16.5 7.927 16.44 7.39 16.32C7.087 16.2525 6.894 15.9515 6.96 15.65C7.0275 15.347 7.3255 15.1655 7.63 15.23C10.423 15.851 13.3035 14.505 14.64 11.97C16.278 8.8605 15.088 5.001 11.98 3.36C11.0665 2.8785 10.0395 2.62 9 2.62C5.4855 2.62 2.62 5.4855 2.62 9C2.62 10.0245 2.866 11.044 3.34 11.95L3.49 12.23C3.6655 12.56 3.704 12.968 3.59 13.34C3.4325 13.7555 3.298 14.1665 3.19 14.57C3.6115 14.4425 4.128 14.2565 4.5 14.12L4.65 14.06C4.938 13.952 5.2635 14.109 5.37 14.4C5.475 14.6925 5.321 15.015 5.03 15.12L4.88 15.17C4.3235 15.371 3.5645 15.6545 3.05 15.77C3.05 15.77 2.9635 15.78 2.92 15.78C2.575 15.78 2.3655 15.637 2.25 15.52C2.073 15.3385 1.986 15.089 2.01 14.66C2.1435 14.0915 2.32 13.529 2.53 12.98C2.545 12.926 2.5335 12.8225 2.49 12.74L2.35 12.46C1.7965 11.3995 1.5 10.203 1.5 9C1.5 4.8645 4.8585 1.5 9 1.5ZM5.6898 8.1074C6.18228 8.1074 6.5798 8.50474 6.5798 8.9974C6.5798 9.48935 6.18228 9.8874 5.6898 9.8874C5.19732 9.8874 4.7998 9.48935 4.7998 8.9974C4.7998 8.50474 5.19732 8.1074 5.6898 8.1074ZM8.9974 8.1074C9.48988 8.1074 9.8874 8.50545 9.8874 8.9974C9.8874 9.48935 9.48988 9.8874 8.9974 9.8874C8.50492 9.8874 8.1074 9.48935 8.1074 8.9974C8.1074 8.50545 8.50492 8.1074 8.9974 8.1074ZM12.2972 8.1074C12.7897 8.1074 13.1872 8.50545 13.1872 8.9974C13.1872 9.48935 12.7897 9.8874 12.2972 9.8874C11.8047 9.8874 11.4072 9.48935 11.4072 8.9974C11.4072 8.50545 11.8047 8.1074 12.2972 8.1074Z" fill-rule="evenodd" fill="#957EAB" />
            </svg>
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
