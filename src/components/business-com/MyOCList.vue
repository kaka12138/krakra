<template>
  <div class="h-155 overflow-y-auto">
    <TabsCom
      key="1"
      v-model="currentTab"
      :tabs="tabs"
      class="mb-6"
    />
    <div v-if="currentTab === -1" class="flex flex-wrap gap-x-10 gap-y-10">
      <div v-for="item in tableData" :key="item.id" class="flex-1 max-w-1/3">
        <OCItem :oc-info="item" />
      </div>
      <div class="flex-1 max-w-1/3 flex items-center justify-center border-1 border-gray rounded-lg" @click="handleCreate('oc_form')">
        <CirclePlusIcon :size="100" color="#999" />
      </div>
    </div>
    <div v-if="currentTab === 0" class="flex flex-col gap-y-10">
      <div v-for="item in tableData" :key="item.id">
        <AUItem :au-info="item" />
      </div>
      <div class="flex-1 py-10 flex items-center justify-center border-1 border-gray rounded-lg" @click="handleCreate('au_form')">
        <CirclePlusIcon :size="100" color="#999" />
      </div>
    </div>
  </div>
  <GenFormCom ref="ocFormComRef" form-type="oc_form" @create-form-success="handleCreateSuccess" />
  <GenFormCom ref="auFormComRef" form-type="au_form" @create-form-success="handleCreateSuccess" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import OCItem from '@/components/business-com/OCItem.vue'
import AUItem from '@/components/business-com/AUItem.vue'
import { CirclePlusIcon } from 'lucide-vue-next'
import { getOC_AU_WorkList_Api } from '@/api/work'
import TabsCom from '@/components/business-com/TabsCom.vue'
import GenFormCom from '@/components/business-com/GenFormCom.vue'
const ocFormComRef = ref<InstanceType<typeof GenFormCom>>()
const auFormComRef = ref<InstanceType<typeof GenFormCom>>()

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
  console.log('oc', records)

  // TODO: 测试数据
  // records[0].coverFileId = 'http://gips2.baidu.com/it/u=195724436,3554684702&fm=3028&app=3028&f=JPEG&fmt=auto?w=1280&h=960'
  console.log('oc', JSON.stringify(records[0]))
  tableData.value.push(...records)
}

watch(currentTab, () => {
  tableData.value = []
  getTableData()
}, { immediate: true })

const handleCreate = (formType: string) => {
  if (formType === 'oc_form') {
    ocFormComRef.value?.open()
  } else {
    auFormComRef.value?.open()
  }
}

const handleCreateSuccess = () => {
  tableData.value = []
  getTableData()
}

</script>
