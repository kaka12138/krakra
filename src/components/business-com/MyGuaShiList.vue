<template>
  <div class="h-150 overflow-y-auto">
    <div v-for="item in tableData" :key="item.id" class="mx-5 my-4">
      <GUAShiItem :guashi-info="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GUAShiItem from '@/components/business-com/GUAShiItem.vue'
import { getGuashiList_Api } from '@/api/work'

const tableData = ref([])

const getTableData = async () => {
  const res = await getGuashiList_Api({
    pageNum: 1,
    pageSize: 9999,
  })
  const { records } = res
  tableData.value = []
  tableData.value.push(...records)
}

getTableData()

defineExpose({
  reload: getTableData,
})
</script>
