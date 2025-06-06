<template>
  <div class="pt-20 px-15">
    <h1 class="px-8 py-3 text-xl font-bold bg-[#9370DB] text-white rounded-full my-8 inline-block">
      用户/OC搜索结果
    </h1>
    <div class="bg-[#fff] py-4 px-6 max-h-160 rounded-2xl overflow-y-auto">
      <div class="mb-4">
        <TabsCom key="1" :tabs="tabs" @tab-click="handleGroupClick" />
      </div>
      <div v-for="item in 10" :key="item">
        <UserItemInSearch :item-info="itemInfo" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserItemInSearch from '@/components/business-com/UserItemInSearch.vue';
import TabsCom from '@/components/business-com/TabsCom.vue';
import { ref } from 'vue';
const itemInfo = ref({
  isFollow: false,
})
const tabs = ref([
  { value: undefined, name: '全部' },
  { value: 1, name: '用户' },
  { value: 2, name: 'OC' },
  { value: 3, name: '标签' },
])

const handleGroupClick = (value: string) => {
  console.log(value)
}
</script>
