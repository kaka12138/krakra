<template>
  <div class="h-full flex justify-between bg-[#F0F0F0] p-10 max-w-7xl mx-auto space-x-10">
    <!-- content -->
    <div class="min-w-1/4 overflow-y-auto">
      <HotCardList :hot-card-list="hotCardList" @click-card="handleClickCard" />
    </div>

    <div class="overflow-auto flex flex-col gap-10">
      <GUAShiItem v-for="item in list" :key="item.id" :guashi-info="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HotCardList from '@/components/business-com/HotCardList.vue'
import GUAShiItem from '@/components/business-com/GUAShiItem.vue'
import { getHotCardListApi } from '@/api/card'
import { getGuashiListApi } from '@/api/guashi'


const hotCardList = ref([])
const list = ref([])


const handleClickCard = (id: number) => {
  console.log(id)
}

const getGuashiList = async () => {
  const res = await getGuashiListApi({
    pageNum: 1,
    // TODO: 分页
    pageSize: 9999,
  })
  // 前端注入点赞标识
  list.value = res.records.map(item => ({
    ...item,
    isThumbsUp: false,
  }))
}

getHotCardListApi().then(data => {
  hotCardList.value = data || []
})

getGuashiList()
</script>
