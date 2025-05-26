<template>
  <div class="h-155 overflow-y-auto">
    <TabsCom
      key="1"
      v-model="currentTab"
      :tabs="tabs"
      class="mb-6"
    />
    <div v-if="currentTab === -1" class="flex flex-wrap gap-x-10 gap-y-10">
      <div v-for="item in list" :key="item.id" class="flex-1 max-w-1/3">
        <OCItem :item="item" />
      </div>
      <div class="flex-1 max-w-1/3 flex items-center justify-center border-1 border-gray rounded-lg" @click="handleCreate('oc_form')">
        <CirclePlusIcon :size="100" color="#999" />
      </div>
    </div>
    <div v-if="currentTab === 0" class="flex flex-col gap-y-10">
      <div v-for="item in list" :key="item.id">
        <AUItem :item="item" />
      </div>
      <div class="flex-1 py-10 flex items-center justify-center border-1 border-gray rounded-lg" @click="handleCreate('au_form')">
        <CirclePlusIcon :size="100" color="#999" />
      </div>
    </div>
  </div>
  <GenFormCom ref="ocFormComRef" form-type="oc_form" />
  <GenFormCom ref="auFormComRef" form-type="au_form" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OCItem from '@/components/business-com/OCItem.vue'
import AUItem from '@/components/business-com/AUItem.vue'
import { CirclePlusIcon } from 'lucide-vue-next'
import TabsCom from '@/components/business-com/TabsCom.vue'
import GenFormCom from '@/components/business-com/GenFormCom.vue'
const ocFormComRef = ref<InstanceType<typeof GenFormCom>>()
const auFormComRef = ref<InstanceType<typeof GenFormCom>>()

const list = ref([
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
])

const tabs = ref([
  { value: -1, name: '角色' },
  { value: 0, name: '世界观' },
])
const currentTab = ref(-1)

const handleCreate = (formType: string) => {
  ocFormComRef.value?.open()
// TODO:创建完成刷新列表
}
</script>
