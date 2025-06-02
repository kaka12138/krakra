<template>
  <div ref="guashiListRef" class="h-full overflow-auto flex flex-col gap-10">
    <GuaShiItem v-for="item in list" :key="item.id" :guashi-info="item" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import GuaShiItem from '@/components/business-com/GUAShiItem.vue'
import { getMyGuashiListApi } from '@/api/about'
import { useScrollToBottom } from '@/hooks/useScrollBottom'
import { useRoute } from 'vue-router'

const route = useRoute()


const list = ref([])
const pageSize = ref(2)
const pageNum = ref(1)
const guashiListRef = ref(null)
const { isBottom } = useScrollToBottom(guashiListRef)

const getGuashiList = async () => {
  const res = await getMyGuashiListApi({
    pageNum: pageNum.value,
    // TODO: 分页
    pageSize: pageSize.value,
    creatorId: route.params.id,
  })
  list.value.push(...res.records)
}

watch(() => isBottom.value, (newVal) => {
  if (newVal) {
    getGuashiList()
    pageNum.value++
  }
})
</script>
