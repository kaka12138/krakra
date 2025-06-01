<template>
  <div class="">
    <!-- 操作 -->
    <div class="flex items-center space-x-1 rounded-full py-4 relative">
      <button
        v-for="(tab, idx) in groupTabs"
        :key="tab.value"
        :class="[
          'max-w-20 px-4 py-1 rounded-full text-sm font-bold cursor-pointer',
          groupId === tab.value
            ? 'bg-[#926DDE]  text-white'
            : 'text-[#926DDE]',
          idx === groupTabs.length - 1 ? 'max-w-40 peer' : 'max-w-20',
        ]"
        @click="handleGroupClick(tab.value)"
      >
        {{ tab.name }}
      </button>
      <!--  -->
      <div v-if="customGroups.length > 0" class="hover:flex hidden peer-hover:flex flex-wrap w-80 h-auto absolute top-12 left-[10rem] z-100 bg-background p-4 gap-4 rounded-xl border-1 border-[#926DDE]">
        <div
          v-for="item in customGroups"
          :key="item.id"
          class="self-baseline px-2 py-1 border-1 border-[#926DDE] rounded-full text-md font-bold  cursor-pointer text-[#926DDE]"
          :class="[
            groupId === item.id
              ? 'bg-[#926DDE]  text-white'
              : 'text-[#926DDE]',
          ]"
          @click="handleCustomGroupClick(item.id)"
        >
          {{ item.name }}
        </div>
      </div>

      <button class="ml-auto px-4 py-1 rounded-full text-sm font-bold cursor-pointer text-[#926DDE]  bg-background border-1 border-[#926DDE]">
        创建合集
      </button>
    </div>
    <v3-waterfall
      :list="tableData"
      :col-width="280"
      :virtual-time="400"
      :is-mounted="isMounted"
      class="waterfall"
      @scroll-reach-bottom="getNext"
    >
      <template #default="{ item }">
        <div
          @dragover="e => e.preventDefault()"
          @dragenter="e => e.preventDefault()"
          @dragleave="e => e.preventDefault()"
          @drop="handleDrop(item)"
        >
          <WorkItem :artwork="item" />
        </div>
      </template>
    </v3-waterfall>
  </div>
  <BallMenuCom />
  <BaseDialogCom v-model:open="showCreateGroupDialog" :class-arr="['w-100']" title="创建分类/分组">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="text-md text-[#926DDE] cursor-pointer" @click="showCreateGroupDialog = false; groupName = '';">
          返回
        </div>
        <div class="text-sm bg-[#926DDE] text-white rounded-full px-3 py-1 cursor-pointer" @click="handleCreateGroup">
          完成
        </div>
      </div>
    </template>
    <div class="flex flex-col gap-4 ">
      <Input
        v-model="groupName"
        type="text"
        placeholder="请输入分类名称"
        class="bg-background rounded-full"
      />
    </div>
  </BaseDialogCom>
</template>

<script setup lang="ts">
import WorkItem from '@/components/business-com/WorkItem.vue'
import BallMenuCom from '@/components/business-com/BallMenuCom.vue'
import BaseDialogCom from '@/components/business-com/BaseDialogCom.vue'
import { Input } from '@/components/ui/input'
import { getOC_AU_WorkList_Api, getCustomGroupsApi, createCustomGroupApi } from '@/api/work'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { toast } from 'vue-sonner'

const route = useRoute()
const userStore = useUserStore()

// waterfall
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})

const showCreateGroupDialog = ref(false)
const groupName = ref('')

const groupTabs = ref([
  { value: undefined, name: '全部' },
  { value: 1, name: '同人' },
  { value: 2, name: '原创' },
  { value: 3, name: '自定义二级分类' },
])
const groupId = ref(undefined)
const handleGroupClick = (value: string) => {

  if (value === 3) {
    if (!userStore.userId) {
      toast.error('请先登录,才能创建分类')
      return
    }
    // 自定义二级分类
    showCreateGroupDialog.value = true
    return
  }
  groupId.value = value
}

const customGroups = ref([])
const handleCustomGroupClick = (value: string) => {
  groupId.value = value
}
const getCustomGroups = async () => {
  const res = await getCustomGroupsApi(route.params.id || undefined)
  // TODO:后端过滤
  customGroups.value = res.records.filter(item => item.creatorId && item.name)
}

const handleCreateGroup = () => {
  if (!groupName.value) {
    toast.error('请输入分类名称')
    return
  }
  createCustomGroupApi({
    name: groupName.value,
  }).then((res) => {
    console.log('res', res)
    // TODO:分组id
    getCustomGroups()
  }).finally(() => {
    showCreateGroupDialog.value = false
    groupName.value = ''
  })
}

// list
const tableData = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const totalVal = ref(0)
const getTableData = async () => {
  const res = await getOC_AU_WorkList_Api({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    type: 0,
    groupId: groupId.value,
    creatorId: route.params.id,
  })
  const { records, total } = res
  totalVal.value = total
  tableData.value = tableData.value.concat(records)
}

const getNext = () => {
  // TODO:
  console.log('getNext')
  getTableData()
  pageNum.value++
}

const handleDrop = (item) => {
  console.log('handleDrop', item)
}

getCustomGroups()

watch(() => route.params.id, () => {
  console.log('route.params.id', route.params.id)
  if (route.params.id) {
    tableData.value = []
    pageNum.value = 1
    getTableData()
  }
})

watch([groupId], () => {
  tableData.value = []
  pageNum.value = 1
  getTableData()
})

</script>
