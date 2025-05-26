<template>
  <div class="bg-[#F0F0F0]">
    <div class="flex justify-center gap-x-10 my-10">
      <TabsCom key="1" v-model="tag" :tabs="tabsTag" />
      <TabsCom key="2" v-model="isNSFW" :tabs="tabsIsNSFW" />
    </div>
    <Waterfall :list="tableData" background-color="#F0F0F0">
      <template #default="{ item }">
        <div class="card">
          <!-- <LazyImg :url="coverFileId" /> -->
          <WorkItem :artwork="item" />
        </div>
      </template>
    </Waterfall>

    <div class="p y-10">
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
</template>

<script setup lang="ts">
import TabsCom from '@/components/business-com/TabsCom.vue'
import WorkItem from '@/components/business-com/WorkItem.vue'
import { getOC_AU_WorkList_Api } from '@/api/work'
import { ref, watch } from 'vue'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import {Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

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
    isNsfw: isNSFW.value,
  })
  // console.log(res)
  const { records, total } = res
  totalVal.value = total
  // TODO: 测试数据
  records[0].coverFileId = 'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960'
  tableData.value.push(...records)
}

watch(pageNum,  () => { getTableData() }, { immediate: true })
watch(isNSFW, () => { getTableData() })

</script>
