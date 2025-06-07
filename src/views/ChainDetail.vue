<template>
  <div class="bg-[#F0F0F0] pt-20">
    <div v-if="!loading" class="py-10 max-w-7xl mx-auto">
      <div class="container mx-auto max-w-6xl">
        <div class="flex gap-x-10">
          <div class="w-1/3">
            <img :src="workDetail.coverUrl" alt="Character" class="h-auto rounded-lg">
          </div>
          <div class="w-2/3">
            <div class="bg-background rounded-lg p-4 space-y-2">
              <h1 class="text-3xl font-bold text-[#9370DB]">
                {{ workDetail.name }}
              </h1>
              <div>
                <h2 class="text-xl text-[#9370DB] font-bold mb-2">
                  简介
                </h2>
                <p class="max-h-100 text-[#333] text-xl  overflow-y-auto">
                  {{ workDetail.description }}
                </p>
              </div>
            </div>
            <div class="bg-background rounded-lg mt-6 p-4 space-y-2">
              <h2 class="text-[#9370DB] text-2xl font-bold">
                相关卡片
              </h2>
              <div class="flex max-w-full gap-x-4 overflow-x-auto">
                <div
                  v-for="item in relationCardList"
                  :key="item.id"
                  class="inline-block"
                >
                  <div class="min-w-32 h-32 rounded">
                    <img :src="item.coverUrl" class="w-full h-full object-cover rounded-lg">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="text-[#9370DB] text-2xl font-bold mt-4">
        高光节点
      </h2>
      <div class="bg-[#FFD700] rounded-3xl p-4">
        <ChainCom
          :chain-list="chainList"
          v-bind="chainInfo"
          :show-tag="false"
        />
      </div>
      <div v-if="relationWorkList.length > 0 || relationGuashiList.length > 0" class="bg-background rounded-3xl p-4 mt-4">
        <h4 class="text-[#9370DB] text-2xl font-bold">
          相关内容
        </h4>
        <div class="flex gap-x-10 justify-center mb-4">
          <div
            class="px-12 py-2 flex items-center justify-center font-bold text-[#926DDE] text-3xl rounded-full border-2 border-[#926DDE] cursor-pointer"
            :class="currentTab === 1 ? 'bg-[#FFD900] border-[#FFD900]' : 'bg-transparent opacity-50 border-[#926DDE]'"
            @click="handleTabClick(1)"
          >
            池 塘
          </div>
          <div
            data-current="2"
            class="px-12 py-2 flex  items-center justify-center font-bold text-[#926DDE] text-3xl rounded-full border-2 border-[#926DDE] cursor-pointer"
            :class="currentTab === 2 ? 'bg-[#FFD900] border-[#FFD900]' : 'bg-transparent opacity-50 border-[#926DDE]'"
            @click="handleTabClick(2)"
          >
            呱 市
          </div>
        </div>
        <div v-if="currentTab === 1" class="flex flex-wrap gap-2">
          <div v-for="item in relationWorkList" :key="item.id" class="flex-1 min-w-1/4">
            <WorkItem :artwork="item" />
          </div>
        </div>
        <div v-if="currentTab === 2" class="flex flex-wrap gap-2">
          <div v-for="item in relationGuashiList" :key="item.id" class="flex-1 min-w-1/4">
            <GuaShiItem :guashi-info="item" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-screen text-3xl">
      loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import ChainCom from '@/components/business-com/ChainCom.vue';
import { getChainDetailApi } from '@/api/work';
import { useRoute } from 'vue-router';
import WorkItem from '@/components/business-com/WorkItem.vue';
import GuaShiItem from '@/components/business-com/GuaShiItem.vue';

const route = useRoute()

const currentTab = ref(1)

const workDetail = ref({});
const chainList = ref([])
const relationCardList = ref([])
const relationWorkList = ref([])
const relationGuashiList = ref([])
const loading = ref(false)


const handleTabClick = (val) => {
  currentTab.value = val
}


const getChainDetail = async (id) => {
  loading.value = true
  const data = await getChainDetailApi(id)
  console.log('getChainDetail', data)
  const { creation, creations, associatedCard, posts, chainData } = data
  workDetail.value = creation
  relationCardList.value = associatedCard || []
  relationWorkList.value = creations || []
  relationGuashiList.value = posts || []
  chainList.value = chainData || []
  loading.value = false
}

const chainInfo = computed(() => {
  if(chainList.value.length === 0) return {}
  const highlightNodes = chainList.value.map(item => item.id)
  console.log('highlightNodes', highlightNodes)
  // TODO:暂时没有当前id, 选最后一位
  const currentNodeId = chainList.value[chainList.value.length - 1].id
  return {
    highlightNodes,
    currentNodeId,
  }
})

watchEffect(() => {
  const id = route.query.id
  console.log('id', id)
  getChainDetail(id)
})
</script>

<style scoped>
/* You can add component-specific styles here if needed,
   though Tailwind aims to minimize this. */
/* For example, if you wanted to ensure the left panel
   has a minimum height on mobile before stacking: */
/*
.md\:w-1\/3 {
  @media (max-width: 767px) {
    min-height: 400px; // Example
  }
}
*/
</style>
