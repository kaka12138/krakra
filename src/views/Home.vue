<template>
  <div class="h-full pt-30 bg-[#F0F0F0] box-border flex flex-col">
    <div class="flex gap-x-10 justify-center">
      <div
        class="w-62 h-14  flex  items-center justify-center text-[#926DDE] text-4xl rounded-4xl border-2 border-[#926DDE] cursor-pointer"
        :class="currentPath === '/work' ? 'bg-[#FFD900] border-[#FFD900]' : 'bg-transparent opacity-50 border-[#926DDE]'"
        @click="handleTabClick('/work')"
      >
        池 塘
      </div>
      <div
        data-current="2"
        class="w-62 h-14 flex  items-center justify-center text-[#926DDE] text-4xl rounded-4xl border-2 border-[#926DDE] cursor-pointer"
        :class="currentPath === '/guashi' ? 'bg-[#FFD900] border-[#FFD900]' : 'bg-transparent opacity-50 border-[#926DDE]'"
        @click="handleTabClick('/guashi')"
      >
        呱 市
      </div>
    </div>
    <div class="h-[calc(100vh-12rem)] flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const currentPath = ref(route.path)

const handleTabClick = (path) => {
  currentPath.value = path
  router.push({
    path: currentPath.value,
  })
}

</script>
