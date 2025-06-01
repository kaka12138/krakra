<template>
  <div class="h-full flex justify-between bg-[#F0F0F0] p-10 max-w-7xl mx-auto space-x-10">
    <!-- content -->
    <div class="min-w-1/4 overflow-y-auto">
      <HotCardList :hot-card-list="hotCardList" @click-card="handleClickCard" />
    </div>

    <div ref="guashiListRef" class="overflow-auto flex flex-col gap-10">
      <GuaShiItem v-for="item in list" :key="item.id" :guashi-info="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import HotCardList from '@/components/business-com/HotCardList.vue'
import GuaShiItem from '@/components/business-com/GuaShiItem.vue'
import { getHotCardListApi } from '@/api/card'
import { getGuashiListApi } from '@/api/guashi'
import { useScrollToBottom } from '@/hooks/useScrollBottom'

const hotCardList = ref([])
const list = ref([])
const pageSize = ref(10)
const pageNum = ref(1)
const guashiListRef = ref(null)

const { isBottom } = useScrollToBottom(guashiListRef)

const handleClickCard = (id: number) => {
  console.log(id)
}

const getGuashiList = async () => {
  const res = await getGuashiListApi({
    pageNum: pageNum.value,
    // TODO: 分页
    pageSize: pageSize.value,
  })
  list.value.push(...res.records)
}

getHotCardListApi().then(data => {
  hotCardList.value = data || []
})


watch(() => isBottom.value, (newVal) => {
  if (newVal) {
    getGuashiList()
    pageNum.value++
  }
})

</script>
