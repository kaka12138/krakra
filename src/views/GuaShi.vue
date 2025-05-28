<template>
  <div class="w-full flex justify-between bg-[#F0F0F0] px-10">
    <div class="flex gap-x-10 justify-center">
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
    <!-- content -->
    <div class="min-100 w-100 mr-10">
      <HotCardList :hot-card-list="hotCardList" @click-card="handleClickCard" />
    </div>
    <div class="flex-1 py-10">
      <div class="flex flex-col gap-10 overflow-y-auto h-180">
        <!-- <GUAShiItem v-for="item in list" :key="item.id" :guashi-info="item" /> -->
        <GUAShiItem :guashi-info="guashiInfo" />
        <GUAShiItem :guashi-info="guashiInfo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  reactive, ref } from 'vue'
import HotCardList from '@/components/business-com/HotCardList.vue'
import GUAShiItem from '@/components/business-com/GUAShiItem.vue'
import { getHotCardList_Api } from '@/api/work'


import { useRouter } from 'vue-router'

const router = useRouter()

const currentTab = ref(1)

const handleTabClick = (tab: string, val) => {
  currentTab.value = val
  router.push({
    path: tab,
  })
}

const hotCardList = ref([])
const list = ref([])

const guashiInfo = reactive({
  avatar: 'https://picsum.photos/200/300',
  username: '张三',
  name: '张三',
  description: '这是一个测试内容',
  tag: ['#测试', '#测试2'],
  imageFileIds: [
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
  ],
  comments: 10,
  likes: 10,
})

const handleClickCard = (id: number) => {
  console.log(id)
}

getHotCardList_Api().then(res => {
  console.log(res)
  hotCardList.value = []
  hotCardList.value = res
})
</script>
