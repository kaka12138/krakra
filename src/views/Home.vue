<template>
  <div class="flex gap-x-10 justify-center mt-10">
    <div
      class="w-62 h-14  flex  items-center justify-center text-[#926DDE] text-4xl rounded-4xl border-2 border-[#926DDE] cursor-pointer"
      :class="currentTab === 1 ? 'bg-[#FFD900] border-[#FFD900]' : 'bg-transparent opacity-50 border-[#926DDE]'"
      @click="handleTabClick('work', 1)"
    >
      池 塘
    </div>
    <div
      class="w-62 h-14 flex  items-center justify-center text-[#926DDE] text-4xl rounded-4xl border-2 border-[#926DDE] cursor-pointer"
      :class="currentTab === 2 ? 'bg-[#FFD900] border-[#FFD900]' : 'bg-transparent opacity-50 border-[#926DDE]'"
      @click="handleTabClick('guashi', 2)"
    >
      呱 市
    </div>
  </div>
  <div class="max-w-7xl mx-auto">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const currentTab = ref(1)

const handleTabClick = (tab: string, val) => {
  currentTab.value = val
  router.push({
    path: tab,
  })
}

console.log(router, route)


</script>
