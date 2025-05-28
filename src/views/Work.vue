<template>
  <div class="bg-[#F0F0F0] flex-1 flex flex-col">
    <div class="flex justify-center gap-x-10 my-6">
      <TabsCom key="1" v-model="tag" :tabs="tabsTag" />
      <TabsCom key="2" v-model="isNSFW" :tabs="tabsIsNSFW" />
    </div>
    <div class="flex-1 max-h-200 overflow-auto">
      <!-- TODO: 暂时写200 -->
      <WaterFall :items="tableData">
        <template #default="{ item }">
          <WorkItem :artwork="item" />
        </template>
      </WaterFall>
      <div class="mb-30">
        <Pagination
          v-model:page="pageNum"
          v-slot="{ page }"
          :items-per-page="pageSize"
          :total="totalVal"
          :default-page="1"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrevious />

            <template v-for="(item, index) in items" :key="index">
              <PaginationItem
                v-if="item.type === 'page'"
                :value="item.value"
                :is-active="item.value === page"
              >
                {{ item.value }}
              </PaginationItem>
            </template>

            <PaginationNext />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TabsCom from '@/components/business-com/TabsCom.vue'
import WorkItem from '@/components/business-com/WorkItem.vue'
import { getOC_AU_WorkList_Api } from '@/api/work'
import { ref, watch } from 'vue'
import WaterFall from '@/components/business-com/WaterFall.vue'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'


const tabsTag = ref([
  { value: -1, name: '全部' },
  { value: 2, name: '同人' },
  { value: 3, name: '原创' },
])
const tabsIsNSFW = ref([
  { value: -1, name: '全部' },
  { value: 1, name: 'NSFW' },
  { value: 0, name: 'SFW' },
])
const tag = ref(-1)
const isNSFW = ref(-1)

const tableData = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const totalVal = ref(0)
const getTableData = async () => {
  const res = await getOC_AU_WorkList_Api({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    type: 0,
    isNsfw: isNSFW.value < 0 ? undefined : isNSFW.value,
  })
  const { records, total } = res
  totalVal.value = total
  // TODO: 测试数据
  tableData.value = []
  tableData.value.push(...records)
}

watch(pageNum,  () => { getTableData() }, { immediate: true })
watch(isNSFW, () => { getTableData() })

</script>
