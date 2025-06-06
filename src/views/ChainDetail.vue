<template>
  <div class="bg-[#F0F0F0] pt-20">
    <div v-if="!loading" class="py-10 max-w-7xl mx-auto">
      <div class="container mx-auto max-w-6xl">
        <div class="flex gap-x-10">
          <div class="w-1/3">
            <img :src="workDetail.coverFileId" alt="Character" class="h-auto rounded-lg">
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
                    <img :src="item.coverFileId" class="w-full h-full object-cover rounded-lg">
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
      <div v-if="chainList.length > 0" class="bg-[#FFD700] rounded-3xl relative w-full h-20">
        <div class="absolute top-1/2 -translate-y-1/2 w-[95%] left-2 h-full z-2 flex items-center justify-center">
          <ChainCom
            :chain-list="chainList"
            v-bind="chainInfo"
            :show-tag="false"
            :show-line="false"
          />
        </div>
        <div class="absolute top-1/2 -translate-y-1/2 left-2 w-[98%] z-1 flex justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="none"
            viewBox="0 0 894.2508544921875 30.5"
            fill="none"
          >
            <path fill="rgba(147, 112, 219, 1)" d="M3.22461e-05 11.5216M3.22461e-05 11.5216L3.68059e-05 11.5216Q5.44798 10.5865 8.7726 10.0355Q14.5174 9.0834 19.8904 8.26477Q34.3159 6.06686 48.4348 4.4658Q87.816 7.62939e-06 125.754 9.53674e-07L125.754 1.5L125.754 0L125.754 1.5L125.754 0Q135.56 0 146.362 1.03493Q156.024 1.96076 167.167 3.78669Q176.489 5.31425 188.331 7.72871Q193.089 8.69861 199.099 9.98268Q202.711 10.7541 210.018 12.3386Q218.497 14.177 222.8 15.0924Q229.985 16.621 235.84 17.7969Q250.549 20.7513 262.82 22.6657Q277.617 24.9743 291.207 26.161Q306.542 27.5 321.254 27.5L321.254 29L321.254 27.5L321.254 29L321.254 27.5Q333.716 27.5 346.944 26.5347Q358.829 25.6675 372.217 23.9502Q383.465 22.5074 397.623 20.2135Q403.331 19.2886 410.546 18.0596Q414.889 17.3198 423.707 15.7938Q434.585 13.9112 440.159 12.9681Q449.483 11.3902 457.185 10.1711Q476.611 7.09647 493.452 5.09214Q513.831 2.66687 533.484 1.41577Q555.723 1.19209e-07 578.254 0L578.254 1.5L578.254 0L578.254 1.5L578.254 0Q603.756 0 627.348 1.8072Q647.93 3.38376 667.665 6.39027Q683.756 8.84166 700.727 12.4874Q707.358 13.9118 715.011 15.7075Q719.552 16.7729 728.049 18.83Q737.785 21.1872 742.329 22.2286Q749.78 23.9361 755.404 24.984Q762.018 26.2161 767.602 26.8282Q773.731 27.5 779.254 27.5L779.254 29L779.254 27.5L779.254 29L779.254 27.5Q793.719 27.5 811.805 25.0047Q827.3 22.8669 844.696 19.0105Q859.129 15.8112 873.364 11.7787Q879.324 10.0903 884.694 8.40879Q889.524 6.89618 893.257 5.58478L894.251 8.41521Q890.47 9.74356 885.59 11.2717Q880.182 12.9654 874.182 14.6651Q859.863 18.7213 845.346 21.9394Q827.83 25.8221 812.215 27.9765Q793.925 30.5 779.254 30.5L779.254 30.5L779.254 30.5Q773.567 30.5 767.275 29.8103Q761.579 29.186 754.855 27.9332Q749.17 26.874 741.659 25.1527Q737.098 24.1074 727.343 21.7458Q718.858 19.6916 714.326 18.6282Q706.7 16.8389 700.097 15.4204Q683.214 11.7937 667.213 9.35605Q647.589 6.36644 627.119 4.79843Q603.641 3 578.254 3L578.254 3L578.254 3Q555.818 3 533.674 4.40971Q514.104 5.65556 493.807 8.07112Q477.022 10.0686 457.654 13.1342Q449.968 14.3508 440.659 15.9261Q435.093 16.868 424.219 18.7498Q415.397 20.2765 411.05 21.017Q403.824 22.2479 398.103 23.1749Q383.896 25.4768 372.599 26.9258Q359.129 28.6536 347.163 29.5268Q333.826 30.5 321.254 30.5L321.254 30.5L321.254 30.5Q306.411 30.5 290.946 29.1496Q277.255 27.9541 262.357 25.6299Q250.022 23.7055 235.249 20.7382Q229.377 19.5587 222.176 18.0267Q217.868 17.1102 209.383 15.2705Q202.079 13.687 198.473 12.9165Q192.476 11.6353 187.732 10.6682Q175.947 8.26539 166.682 6.7472Q155.638 4.9375 146.075 4.02125Q135.417 3 125.754 3L125.754 3L125.754 3Q87.9856 3 48.7728 7.4467Q34.711 9.04128 20.3422 11.2305Q14.9886 12.0462 9.26311 12.9951Q5.94714 13.5447 0.507541 14.4784L0.507536 14.4784L3.22461e-05 11.5216Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="18.9580078125"
            height="20.404296875"
            viewBox="0 0 18.9580078125 20.404296875"
            fill="none"
            class="-translate-x-1"
          >
            <path fill="#9370DB" d="M18.4337 7.34154L7.78585 19.684C6.73459 20.9025 4.84192 20.5124 4.43626 18.9935L0.0711365 2.64938C-0.334524 1.13049 1.06403 -0.329443 2.54625 0.0656357L17.5593 4.06729C18.9504 4.4381 19.4204 6.19784 18.4337 7.34154Z" />
          </svg>
        </div>
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
