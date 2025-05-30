<template>
  <div v-for="item in tableData" :key="item.id">
    <GUAShiItem :guashi-info="item" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GUAShiItem from '@/components/business-com/GUAShiItem.vue'
import { getGuashiListApi } from '@/api/guashi'

const tableData = ref([])

const getTableData = async () => {
  const res = await getGuashiListApi({
    pageNum: 1,
    pageSize: 9999,
  })
  const { records } = res
  tableData.value = []
  tableData.value.push(...records)
}

getTableData()

// TODO：刷新
defineExpose({
  reload: getTableData,
})
</script>
