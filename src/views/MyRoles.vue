<template>
  <div class="max-h-full flex flex-col box-border px-4">
    <div class="flex gap-x-4 py-4 sticky top-0 z-10 bg-white">
      <div
        v-for="item in tabs"
        :key="item.value"
        class="rounded-full px-6 py-1 text-sm font-bold cursor-pointer"
        :class="currentTab === item.value ? 'bg-[#926DDE] text-white' : 'bg-white text-[#926DDE]'"
        @click="handleTabClick(item.value)"
      >
        {{ item.name }}
      </div>
    </div>
    <div ref="listRef" class="flex flex-wrap gap-4 pb-4  overflow-auto">
      <div v-for="item in list" :key="item.id" :class="currentTab === 1 ? 'w-[49%]' : 'w-full'">
        <OCItem v-if="currentTab === 1" :oc-info="item" />
        <AUItem v-else-if="currentTab === 2" :au-info="item" />
      </div>
      <div v-if="isOwner" class="py-3.5 w-[49%] flex items-center justify-center bg-[#F7F7F7] rounded-xl" @click="handleCreate">
        <CirclePlusIcon :size="80" class="text-[#999] cursor-pointer" stroke-width="1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import OCItem from '@/components/business-com/OCItem.vue'
import AUItem from '@/components/business-com/AUItem.vue'
import { getMyWork_OC_AU_ListApi } from '@/api/about'
import { useRoute } from 'vue-router'
import { useScrollToBottom } from '@/hooks/useScrollBottom'
import { CirclePlusIcon } from 'lucide-vue-next'
import { useGenForm } from '@/hooks/useGenForm'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()
console.log('route', route, userStore.userInfo)
const isOwner = computed(() => userStore.userInfo?.userId == route.params.id)


const handleFormSuccess = () => {
  list.value = []
  pageNum.value = 1
  getTableData()
}

const { open: createOC } = useGenForm('oc_form', handleFormSuccess);
const { open: createAU } = useGenForm('au_form', handleFormSuccess);



const listRef = ref(null)
const { isBottom } = useScrollToBottom(listRef)

const tabs = ref([
  { value: 1, name: '角色' },
  { value: 2, name: '世界观' },
])
const currentTab = ref(1)


const handleTabClick = (value: number) => {
  currentTab.value = value
}

const list = ref([])
const pageSize = ref(10)
const pageNum = ref(1)



const getTableData = async () => {
  const res = await getMyWork_OC_AU_ListApi({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    type: currentTab.value,
    creatorId: route.params.id,
  })

  const { records } = res
  list.value.push(...records)
}


const handleCreate = () => {
  const { name } = route
  if(name !== 'myroles') return

  if(currentTab.value === 1) {
    createOC()
  } else if(currentTab.value === 2) {
    createAU()
  }
}

watch(currentTab, () => {
  list.value = []
  pageNum.value = 1
  getTableData()
})

watch(() => isBottom.value, (newVal) => {
  if (newVal) {
    getTableData()
    pageNum.value++
  }
})


</script>
