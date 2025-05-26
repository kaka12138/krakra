<template>
  <div
    class="
    px-10
    flex items-center justify-between
    w-full h-20 bg-[url(/imgs/search-bg-2.png)] bg-cover bg-no-repeat"
  >
    <div class="w-64 h-12 bg-[url(/imgs/logo-h.png)] bg-no-repeat bg-contain" />
    <div class="flex-1 max-w-175 relative items-center overflow-hidden">
      <SearchCombobox />
    </div>
    <div class="flex items-center gap-1">
      <div class="w-9 h-9 bg-[url(/imgs/no-notification.png)] bg-no-repeat bg-contain " />
      <div class="w-8 h-8 bg-[url(/imgs/no-chat.png)] bg-no-repeat bg-contain " />
      <div class="w-8 h-8 bg-[url(/imgs/no-message.png)] bg-no-repeat bg-contain " />
      <div class="w-26 h-10 flex items-center justify-between p-2 bg-[#FFD700] rounded-full cursor-pointer">
        <div
          v-if="!isLogin"
          class="w-8 h-8 rounded-full text-center text-2xl"
          @click="loginSigninComRef?.open()"
        >
          <UserIcon />
        </div>
        <img
          v-else
          class="w-8 h-8 rounded-full"
          :src="userStore.userInfo.avatarUrl"
          @click="toMyHome"
        >
        <img class="w-6 h-6" src="/imgs/more-user.png">
      </div>
    </div>
  </div>
  <LoginSigninCom ref="loginSigninComRef" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { UserIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import SearchCombobox from './SearchCombobox.vue'
import LoginSigninCom from './LoginSigninCom.vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const loginSigninComRef = ref<InstanceType<typeof LoginSigninCom>>()
const router = useRouter()
const isLogin = computed(() => userStore.token)
const toMyHome = () => {
  router.push('/about')
}
</script>
