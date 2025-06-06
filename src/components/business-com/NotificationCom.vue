<template>
  <div class="w-100 box-border bg-background rounded-lg p-6 shadow-lg">
    <div class="flex gap-x-2 pb-4 border-b-1 border-[rgba(148,112,219,0.5)] ">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="activeTab.id === tab.id ? 'bg-[#9470DB] text-white' : 'bg-transparent text-[#9470DB] opacity-80'"
        class="text-sm border-1 border-[rgba(148,112,219,0.5)] rounded-full px-3 py-1 cursor-pointer relative"
        @click="handleTabClick(tab.id)"
      >
        <span>{{ tab.name }}</span>
        <div class="w-2 h-2 bg-[#FF5454] rounded-full absolute top-0 right-0" />
      </div>
    </div>
    <!-- list -->
    <div ref="listRef" class="h-100 overflow-y-auto">
      <!-- <NotificationItem v-for="item in 10" :key="item" /> -->
      <!-- -没有更多消息了- -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import NotificationItem from './NotificationItem.vue'
import { getUserMessageApi } from '@/api/user'
import { useScrollToBottom } from '@/hooks/useScrollBottom'
import { MsgType } from '@/constant/common'

const listRef = ref(null)
const { isBottom } = useScrollToBottom(listRef)
const tabs = ref([
  {
    id: 1,
    name: '评论和@',
    values: [MsgType.COMMENT, MsgType.AT],
  },
  {
    id: 2,
    name: '赞和收藏',
    values: [MsgType.LIKE, MsgType.COLLECT],
  },
  {
    id: 3,
    name: '新增关注',
    values: [MsgType.FOLLOW],
  },
])
const activeTab = ref(tabs.value[0])
const handleTabClick = (tab: any) => {
  activeTab.value = tab
}
const pageNum = ref(1)
const pageSize = ref(10)
const getList = async () => {
  const res = await getUserMessageApi({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    type: activeTab.value.values,
  })
  console.log(res)
}

watch(isBottom, () => {
  if (isBottom.value) {
    pageNum.value++
    getList()
  }
})
getList()
</script>
