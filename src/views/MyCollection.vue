<template>
  <div ref="collectionListRef" class="h-full max-h-full overflow-auto">
    <div v-if="!isViewCollection" class="py-2 px-4 sticky top-0 bg-white z-10 flex items-center justify-between">
      <span class="text-[#9370DB] text-sm cursor-pointer border-1 border-[#9370DB] rounded-full px-4 py-0.5" @click="backToCollection">返回</span>
    </div>
    <div v-if="isViewCollection" class="h-full items-start justify-center flex flex-wrap gap-4 px-4 py-8">
      <!-- 合集 -->
      <div
        v-for="item in list"
        :key="item.id"
        class="w-[22%] max-w-[22%] border-1 border-gray-200 rounded-lg p-2 cursor-pointer"
        @click="handleViewCollection(item)"
      >
        <div class="w-full h-auto bg-gray-200 rounded-lg overflow-hidden">
          <img :src="item.coverFileId" alt="" class="w-full h-full object-cover">
        </div>
        <p class="truncate text-lg font-medium text-[#9370DB]">
          {{ item.name }}
        </p>
        <p class="truncate text-sm text-[#666]">
          共{{ item.workCount || 0 }}个作品
        </p>
      </div>
    </div>

    <!-- 作品 -->
    <div v-if="!isViewCollection" class="p-4">
      <v3-waterfall
        :list="list"
        :col-width="280"
        :virtual-time="400"
        :is-mounted="isMounted"
        class="waterfall"
        @scroll-reach-bottom="getNext"
      >
        <template #default="{ item }">
          <WorkItem :artwork="item" />
        </template>
      </v3-waterfall>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WorkItem from '@/components/business-com/WorkItem.vue'
import { getCollectionListApi, getCollectionDetailApi } from '@/api/work'
import { ref, watch, onMounted } from 'vue'
import { useScrollToBottom } from '@/hooks/useScrollBottom'
import { useRoute } from 'vue-router'

// TODO: 验证通过点击合集，进入时的列表分页

const route = useRoute()

const isViewCollection = ref(true)

const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

const list = ref([])
const pageSize = ref(10)
const pageNum = ref(0)
const currentCollectionId = ref()
const collectionListRef = ref(null)
const { isBottom } = useScrollToBottom(collectionListRef)

const handleViewCollection = (item: any) => {
  // TODO:切换有两次请求，需要优化
  currentCollectionId.value = item.id
  isViewCollection.value = false
  list.value = []
  pageNum.value = 1
}

const backToCollection = () => {
  isViewCollection.value = true
  currentCollectionId.value = undefined
  list.value = []
  pageNum.value = 1
  getList()
}

const getList = async () => {
  const apiFunc = isViewCollection.value ? getCollectionListApi : getCollectionDetailApi
  const res = await apiFunc({
    pageNum: pageNum.value,
    // TODO: 分页
    pageSize: pageSize.value,
    creatorId: route.params.id,
    collectionId: currentCollectionId.value,
  })
  list.value = list.value.concat(...res.records)
}

const getNext = () => {
  console.log('getNext')
  pageNum.value++
  getList()
}

watch(() => isBottom.value, (newVal) => {
  console.log('isBottom', newVal)
  if (newVal && isViewCollection.value) {
    getList()
    pageNum.value++
  }
})
</script>
