<template>
  <div class="w-100 box-border bg-background rounded-lg p-6">
    <div class="flex gap-x-2 pb-4 border-b-1 border-[#9470DB] ">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="activeTab === tab.id ? 'bg-[#9470DB] text-white' : 'bg-transparent text-[#9470DB] opacity-80'"
        class="text-sm border-1 border-[#9470DB] rounded-full px-3 py-1 cursor-pointer relative"
        @click="handleTabClick(tab.id)"
      >
        <span>{{ tab.name }}</span>
        <div class="w-2 h-2 bg-[#FF5454] rounded-full absolute top-0 right-0" />
      </div>
    </div>
    <!-- list -->
    <div class="h-100 overflow-y-auto">
      <NotificationItem v-for="item in 10" :key="item" />
      <!-- -没有更多消息了- -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NotificationItem from './NotificationItem.vue'
const tabs = ref([
  {
    id: 1,
    name: '评论和@',
  },
  {
    id: 2,
    name: '赞和收藏',
  },
  {
    id: 3,
    name: '新增关注',
  },
])
const activeTab = ref(1)
const handleTabClick = (id: number) => {
  activeTab.value = id
}
</script>
