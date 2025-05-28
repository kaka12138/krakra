<template>
  <div>
    <TabsCom
      key="1"
      v-model="currentTab"
      :tabs="tabs"
    />
    <div v-if="currentTab === -1" class="flex flex-wrap gap-x-10 gap-y-10">
      <div v-for="item in tableData" :key="item.id" class="flex-1 max-w-1/3">
        <OCItem :oc-info="item" />
      </div>
      <div class="flex-1 max-w-1/3 flex items-center justify-center border-1 border-gray rounded-lg">
        <CirclePlusIcon :size="100" color="#999" />
      </div>
    </div>
    <div v-if="currentTab === 0" class="flex flex-col gap-y-10">
      <div v-for="item in tableData" :key="item.id">
        <AUItem :au-info="item" />
      </div>
      <div class="flex-1 py-10 flex items-center justify-center border-1 border-gray rounded-lg">
        <CirclePlusIcon :size="100" color="#999" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import OCItem from '@/components/business-com/OCItem.vue'
import AUItem from '@/components/business-com/AUItem.vue'
import { CirclePlusIcon } from 'lucide-vue-next'
import { getOC_AU_WorkList_Api } from '@/api/work'
import TabsCom from '@/components/business-com/TabsCom.vue'

const tableData = ref()

const tabs = ref([
  { value: -1, name: '角色' },
  { value: 0, name: '世界观' },
])
const currentTab = ref(-1)

const getTableData = async () => {
  const res = await getOC_AU_WorkList_Api({
    pageNum: 1,
    pageSize: 9999,
    type: currentTab.value === -1 ? 1 : 2,
  })

  const { records } = res
  tableData.value.push(...records)
}

watch(currentTab, () => {
  tableData.value = []
  getTableData()
}, { immediate: true })


</script>
