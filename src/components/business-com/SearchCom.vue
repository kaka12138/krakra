<template>
  <div
    class="
    px-10
    flex items-center justify-between
    w-full h-20 bg-[url(@/assets/search-bg-2.png)] bg-cover bg-no-repeat"
  >
    <div class="w-64 h-12 bg-[url(@/assets/logo-h.png)] bg-no-repeat bg-contain" @click="router.push('/')" />
    <div class="flex-1 max-w-2xl">
      <SearchInputCom :search-type="1" />
    </div>
    <div class="flex items-center gap-1">
      <BellIcon class="w-8 h-8 cursor-pointer" color="#9370DB" />
      <div ref="dropdownContainerRef">
        <div v-if="isDropdownVisible" class="absolute top-0 translate-y-[15%] right-0 z-2">
          <NotificationCom />
        </div>
        <div class="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="w-7 h-7"
            viewBox="0 0 20.001708984375 20.001953125"
            fill="none"
            @click.stop="isDropdownVisible = !isDropdownVisible"
          >
            <path d="M1.46 4.8C3.286 1.806 6.548 -0.014 10.06 0C14.214 0.03 17.918 2.614 19.37 6.5C20.822 10.386 19.718 14.77 16.6 17.51C13.482 20.25 8.994 20.782 5.32 18.85L5.26 18.82L4.58 18.43C4.44 18.372 4.19 18.39 4.19 18.39C3.482 18.646 2.756 18.858 2.02 19.02L1.89 19.03C1.08 19.048 0.67 18.526 0.67 17.76L0.69 17.6C0.874 16.84 1.098 16.084 1.36 15.39C1.402 15.26 1.39 15.122 1.32 14.99L1.14 14.63C-0.486 11.522 -0.364 7.794 1.46 4.8ZM10.0499 1.3901C13.6244 1.41764 16.8205 3.6462 18.0699 6.9901C19.3193 10.3323 18.3629 14.1023 15.6799 16.4601L15.4599 16.6401C12.8629 18.7724 9.26542 19.1995 6.2399 17.7401L5.9499 17.6001L5.9599 17.6001L5.9399 17.5901L5.5199 17.3501C5.36673 17.264 5.1499 17.1501 5.1499 17.1501C4.68695 16.9591 4.2122 16.9396 3.7699 17.0601L3.3599 17.2001C3.08282 17.2913 2.8101 17.3761 2.5399 17.4501L2.14431 17.549C2.29772 16.9703 2.47854 16.399 2.6899 15.8401C2.85339 15.3118 2.80084 14.791 2.5599 14.3401L2.3799 13.9801C0.979006 11.3022 1.09035 8.09472 2.6599 5.5201C4.18126 3.02465 6.85625 1.48271 9.7699 1.4001L10.0499 1.3901ZM2.14431 17.549C2.11161 17.6724 2.08014 17.7961 2.0499 17.9201L2.1399 17.5501L2.14431 17.549ZM6.75 9.9999C6.75 9.36994 6.23928 8.8599 5.61 8.8599C4.98072 8.8599 4.47 9.36994 4.47 9.9999C4.47 10.6299 4.98072 11.1399 5.61 11.1399C6.23928 11.1399 6.75 10.6299 6.75 9.9999ZM11.1899 9.9999C11.1899 9.36994 10.6792 8.8599 10.0499 8.8599C9.42062 8.8599 8.9099 9.36994 8.9099 9.9999C8.9099 10.6299 9.42062 11.1399 10.0499 11.1399C10.6792 11.1399 11.1899 10.6299 11.1899 9.9999ZM14.4801 8.8599C15.1094 8.8599 15.6201 9.36994 15.6201 9.9999C15.6201 10.6299 15.1094 11.1399 14.4801 11.1399C13.8508 11.1399 13.3401 10.6299 13.3401 9.9999C13.3401 9.36994 13.8508 8.8599 14.4801 8.8599Z" fill-rule="evenodd" fill="#9370DB" />
          </svg>
        </div>
      </div>
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
import {  computed, ref, watch, onBeforeUnmount } from 'vue'
import { UserIcon, BellIcon, AlignJustifyIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import SearchInputCom from './SearchInputCom.vue'
import NotificationCom from './NotificationCom.vue'

import { useLoginSignin } from '@/hooks/useLoginSignin'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const { open } = useLoginSignin()

const router = useRouter()
const isLogin = computed(() => userStore.token)
const toMyHome = () => {
  router.push(`/about/${userStore.userInfo.userId}/mywork`)
}

const dropdownContainerRef = ref(null)
const isDropdownVisible = ref(false)

const handleClickOutside = (event) => {
  if (dropdownContainerRef.value && !dropdownContainerRef.value.contains(event.target)) {
    isDropdownVisible.value = false
  }
};

watch(isDropdownVisible, (newValue) => {
  if (newValue) {
    // Using 'mousedown' is often preferred over 'click' for "click outside"
    // as it fires before blur events, which can sometimes interfere.
    document.addEventListener('mousedown', handleClickOutside);
  } else {
    document.removeEventListener('mousedown', handleClickOutside);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

</script>
