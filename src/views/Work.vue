<template>
  <div class="flex justify-center gap-x-10 my-6">
    <TabsCom key="1" :tabs="tabsGroup" @tab-click="handleGroupClick" />
    <TabsCom key="2" :tabs="tabsIsNSFW" @tab-click="handleIsNSFWClick" />
  </div>
  <div class="bg-[#F0F0F0] pb-10">
    <v3-waterfall
      :list="tableData"
      :col-width="280"
      :virtual-time="400"
      :is-mounted="isMounted"
      class="waterfall"
      @scroll-reach-bottom="getNext"
    >
      <template #default="{ item }">
        <div
          @dragover="e => e.preventDefault()"
          @dragenter="e => e.preventDefault()"
          @dragleave="e => e.preventDefault()"
          @drop="handleDrop(item)"
        >
          <WorkItem :artwork="item" />
        </div>
      </template>
    </v3-waterfall>
  </div>
  <BallMenuCom />
</template>

<script setup lang="ts">
import TabsCom from '@/components/business-com/TabsCom.vue'
import WorkItem from '@/components/business-com/WorkItem.vue'
import { getOC_AU_WorkList_Api } from '@/api/work'
import { ref, watch, onMounted } from 'vue'

import BallMenuCom from '@/components/business-com/BallMenuCom.vue'

// waterfall
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

// tabs
const tabsGroup = ref([
  { value: undefined, name: '全部' },
  { value: 1, name: '同人' },
  { value: 2, name: '原创' },
])
const tabsIsNSFW = ref([
  { value: undefined, name: '全部' },
  { value: 1, name: 'NSFW' },
  { value: 0, name: 'SFW' },
])

const groupId = ref(undefined)
const isNSFW = ref(undefined)
const handleGroupClick = (value: string) => {
  groupId.value = value
}
const handleIsNSFWClick = (value: string) => {
  isNSFW.value = value
}

// list
const tableData = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const totalVal = ref(0)
const getTableData = async () => {
  const res = await getOC_AU_WorkList_Api({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    type: 0,
    groupId: groupId.value,
    isNsfw: isNSFW.value,
  })
  const { records, total } = res
  totalVal.value = total
  tableData.value = tableData.value.concat(...records || [])
}

const getNext = () => {
  // TODO:
  console.log('getNext')
  pageNum.value++
  getTableData()
}

const handleDrop = (item) => {
  console.log('handleDrop', item)
}


watch([groupId, isNSFW], () => {
  tableData.value = []
  pageNum.value = 1
  getTableData()
})

</script>
