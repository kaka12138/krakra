<template>
  <div class="flex h-4/5 p-10">
    <div class="w-80  h-full mr-10">
      <UserInfoCom />
    </div>
    <div class="flex-1 h-full relative">
      <div class="w-full mb-2">
        <TabsCom v-model="currentTab" :tabs="tabs" class-str="max-w-none" />
      </div>
      <div class="m-4 bg-background">
        <!-- 池塘 -->
        <div v-if="currentTab === -1">
          <Waterfall :list="tableData">
            <template #default="{ item }">
              <div class="card">
                <WorkItem :artwork="item" />
              </div>
            </template>
          </Waterfall>

          <div class="w-full absolute bottom-0 left-0">
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
        <template v-if="currentTab === 2">
          <MyOCList />
        </template>
        <!-- OC -->
        <!-- 瓜市 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInfoCom from '@/components/business-com/UserInfoCom.vue'
import TabsCom from '@/components/business-com/TabsCom.vue'
// import AUItem from '@/components/business-com/AUItem.vue'
import MyOCList from '@/components/business-com/MyOCList.vue'

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

const tabs = ref([
  { value: -1, name: 'A池塘' },
  { value: 0, name: '瓜市' },
  { value: 1, name: '委托' },
  { value: 2, name: 'OC' },
  { value: 3, name: '喜欢' },
  { value: 4, name: '扩单' },
])

const currentTab = ref(-1)

const tableData = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const totalVal = ref(0)

const tag = ref(-1)
const isNSFW = ref(-1)

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


