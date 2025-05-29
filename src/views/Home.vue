<template>
  <div class="flex-1 flex flex-col py-10 bg-[#F0F0F0]">
    <div class="flex gap-x-10 justify-center">
      <div
        class="w-62 h-14  flex  items-center justify-center text-[#926DDE] text-4xl rounded-4xl border-2 border-[#926DDE] cursor-pointer"
        :class="currentTab === 1 ? 'bg-[#FFD900] border-[#FFD900]' : 'bg-transparent opacity-50 border-[#926DDE]'"
        @click="handleTabClick('work', 1)"
      >
        池 塘
      </div>
      <div
        data-current="2"
        class="w-62 h-14 flex  items-center justify-center text-[#926DDE] text-4xl rounded-4xl border-2 border-[#926DDE] cursor-pointer"
        :class="currentTab === 2 ? 'bg-[#FFD900] border-[#FFD900]' : 'bg-transparent opacity-50 border-[#926DDE]'"
        @click="handleTabClick('guashi', 2)"
      >
        呱 市
      </div>
    </div>
    <div>
      <Work />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Work from './Work.vue'
const router = useRouter()

const currentTab = ref(1)

const handleTabClick = (tab: string, val) => {
  currentTab.value = val
  router.push({
    path: tab,
  })
}

</script>
