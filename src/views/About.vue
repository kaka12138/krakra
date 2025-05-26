<template>
  <div class="flex h-4/5 p-10">
    <div class="w-80  h-full mr-10">
      <UserInfoCom @create-work="handleCreateWork" @create-gua-shi="handleCreateGuaShi" />
    </div>
    <div class="flex-1 h-full">
      <div class="w-full mb-2">
        <TabsCom v-model="currentTab" :tabs="tabs" class-str="max-w-none" />
      </div>
      <div class="m-4 p-6 bg-background relative">
        <!-- 池塘 -->
        <div v-if="currentTab === -1">
          <Waterfall :list="tableData">
            <template #default="{ item }">
              <div class="card">
                <WorkItem :artwork="item" />
              </div>
            </template>
          </Waterfall>

          <div class="py-4 w-full absolute bottom-0 left-0">
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
        <!-- 瓜市 -->
        <template v-else-if="currentTab === 0">
          <MyGuaShiList ref="myGuaShiListRef" />
        </template>
        <!-- OC -->
        <template v-else-if="currentTab === 2">
          <MyOCList />
        </template>
      </div>
    </div>
  </div>
  <GenFormCom
    key="1"
    ref="genFormComRef"
    form-type="work_form"
    @create-form-success="handleCreateSuccess"
  />
  <GenFormCom
    key="2"
    ref="guashiFormComRef"
    form-type="guashi_form"
    @create-form-success="handleCreateSuccess"
  />
</template>

<script setup lang="ts">
import UserInfoCom from '@/components/business-com/UserInfoCom.vue'
import TabsCom from '@/components/business-com/TabsCom.vue'
import MyOCList from '@/components/business-com/MyOCList.vue'
import MyGuaShiList from '@/components/business-com/MyGuaShiList.vue'

import WorkItem from '@/components/business-com/WorkItem.vue'
import GenFormCom from '@/components/business-com/GenFormCom.vue'
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
  tableData.value = []
  tableData.value.push(...records)
}

const genFormComRef = ref<InstanceType<typeof GenFormCom>>()
const guashiFormComRef = ref<InstanceType<typeof GenFormCom>>()
const myGuaShiListRef = ref<InstanceType<typeof MyGuaShiList>>()

const handleCreateWork = () => {
  genFormComRef.value?.open()
}

const handleCreateGuaShi = () => {
  guashiFormComRef.value?.open()
}

const handleCreateSuccess = () => {
  if (currentTab.value === -1 ) {
    getTableData()
  } else if (currentTab.value === 0) {
    myGuaShiListRef.value?.reload()
  }
}

watch(pageNum,  () => { getTableData() }, { immediate: true })
watch(isNSFW, () => { getTableData() })

</script>


