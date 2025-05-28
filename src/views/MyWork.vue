<template>
  <div>
    work
    <Waterfall :list="tableData">
      <template #default="{ item }">
        <div class="card">
          <WorkItem :artwork="item" />
        </div>
      </template>
    </Waterfall>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import WorkItem from '@/components/business-com/WorkItem.vue'
import { Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import { getOC_AU_WorkList_Api } from '@/api/work'

const tableData = ref([])
const pageNum = ref(1)
const pageSize = ref(999)
const totalVal = ref(0)

const getTableData = async () => {
  const res = await getOC_AU_WorkList_Api({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    type: 0,
  })
  // console.log(res)
  const { records, total } = res
  totalVal.value = total
  // TODO: 测试数据
  tableData.value = []
  tableData.value.push(...records)
}


watch(pageNum,  () => { getTableData() }, { immediate: true })
</script>
