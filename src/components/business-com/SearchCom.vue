<template>
  <div
    class="
    px-10
    flex items-center justify-between
    w-full h-20 bg-[url(@/assets/search-bg-2.png)] bg-cover bg-no-repeat"
  >
    <div class="w-64 h-12 bg-[url(@/assets/logo-h.png)] bg-no-repeat bg-contain" @click="router.push('/')" />
    <div class="flex-1">
      <SearchInputCom />
    </div>
    <div class="flex items-center gap-1">
      <BellIcon class="w-8 h-8 cursor-pointer" color="#9370DB" />
      <MessageCircleMoreIcon class="w-8 h-8 cursor-pointer" color="#9370DB" />
      <div class="w-26 h-10 flex items-center justify-between p-2 bg-[#FFD700] rounded-full cursor-pointer">
        <div
          v-if="!isLogin"
          class="flex items-center justify-center w-8 h-8 rounded-full text-center text-2xl bg-[#9370DB]"
          @click="open()"
        >
          <UserIcon color="#fff" />
        </div>
        <img
          v-else
          class="w-8 h-8 rounded-full"
          :src="userStore.userInfo.avatarUrl"
          @click="toMyHome"
        >
        <AlignJustifyIcon class="w-8 h-8" color="#9370DB" />
      </div>
    </div>
  </div>
  <!-- <LoginSigninCom ref="loginSigninComRef" /> -->
</template>

<script setup lang="ts">
import {  computed } from 'vue'
import { UserIcon, BellIcon, MessageCircleMoreIcon, AlignJustifyIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import SearchInputCom from './SearchInputCom.vue'

import { useLoginSignin } from '@/hooks/useLoginSignin'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const { open } = useLoginSignin()

const router = useRouter()
const isLogin = computed(() => userStore.token)
const toMyHome = () => {
  router.push(`/about/${userStore.userInfo.userId}/mywork`)
}
</script>
