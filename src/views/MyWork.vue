<template>
  <!-- 操作 -->
  <div class="flex items-center space-x-1 rounded-full py-4 sticky -top-4 bg-background z-10" :class="isCreateCollectionMode? 'invisible' : ''">
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
    <div
      v-if="customGroups.length > 0"
      class="hover:flex hidden peer-hover:flex flex-wrap w-80 h-auto absolute top-12 left-[10rem] z-100 bg-background p-4 gap-4 rounded-xl border-1 border-[#926DDE]"
    >
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

    <button class="ml-auto px-4 py-1 rounded-full text-sm font-bold cursor-pointer text-[#926DDE]  bg-background border-1 border-[#926DDE]" @click="isCreateCollectionMode = true">
      创建合集
    </button>
  </div>
  <div :class="isCreateCollectionMode? 'invisible' : ''">
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
          <WorkItem :artwork="item" :is-create-collection-mode="isCreateCollectionMode" />
        </div>
      </template>
    </v3-waterfall>
  </div>
  <!-- 合集选择 -->
  <div v-if="isCreateCollectionMode" class="fixed left-0 right-0 bottom-0 top-0 z-20 bg-[#0000004d]">
    <div class="flex w-8/9 mx-auto h-full py-10 pt-30">
      <div class="w-1/4 min-w-1/4 h-full mr-6" />
      <div class="w-full h-full flex flex-col">
        <div class="h-9" />
        <div class="bg-background rounded-full flex items-center justify-between px-2 py-1 m-2">
          <div class="flex items-center gap-x-2">
            <span class="text-sm font-medium text-[#926DDE]">选择创建合集作品</span>
            <span class="text-sm font-medium text-[#CCCCCC]">已选择{{ selectedCollectionIds.length }}张作品</span>
          </div>
          <div class="flex items-center gap-x-2">
            <button class="text-sm font-medium text-[#E86868] cursor-pointer">
              <span class="text-sm text-[#E86868]" @click="handleCancelSelect">取消选择</span>
            </button>
            <button class="text-sm font-medium text-white bg-[#926DDE] rounded-full px-4 py-1 cursor-pointer" @click="openCreateCollectionForm">
              <span class="text-sm text-white bg-[#926DDE] rounded-full px-4 py-1">确定</span>
            </button>
          </div>
        </div>
        <div class="flex-1 overflow-auto">
          <v3-waterfall
            :list="tableData"
            :col-width="280"
            :virtual-time="400"
            :is-mounted="isMounted"
            class="waterfall"
            @scroll-reach-bottom="getNext"
          >
            <template #default="{ item }">
              <WorkItem
                :artwork="item"
                :is-create-collection-mode="isCreateCollectionMode"
                @handle-select-collection="handleSelectCollection"
              />
            </template>
          </v3-waterfall>
        </div>
      </div>
    </div>
  </div>
  <BallMenuCom />
  <BaseDialogCom
    key="createGroupDialog"
    v-model:open="showCreateGroupDialog"
    :class-arr="['w-100']"
  >
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
  <BaseDialogCom
    key="createCollectionDialog"
    v-model:open="showCreateCollectionDialog"
    :class-arr="['w-100']"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="text-md text-[#926DDE] cursor-pointer" @click="backToSelect">
          返回重新选择
        </div>
        <div class="text-sm bg-[#926DDE] text-white rounded-full px-3 py-1 cursor-pointer" @click="handleCreateCollection">
          完成
        </div>
      </div>
    </template>
    <div class="">
      <h1 class="text-2xl font-bold text-[#926DDE]">
        创建合集
      </h1>
      <UploadCom v-model="collectionCoverFileIdArr" upload-id="createCollection" :limit="1" />
      <div class="text-sm font-medium text-[#926DDE] my-2">
        合集标题
      </div>
      <Input
        v-model="collectionName"
        type="text"
        placeholder="请输入合集名称"
        class="bg-background rounded-full"
      />
    </div>
  </BaseDialogCom>
</template>

<script setup lang="ts">
import UploadCom from '@/components/business-com/UploadCom.vue'
import WorkItem from '@/components/business-com/WorkItem.vue'
import BallMenuCom from '@/components/business-com/BallMenuCom.vue'
import BaseDialogCom from '@/components/business-com/BaseDialogCom.vue'
import { Input } from '@/components/ui/input'
import { getOC_AU_WorkList_Api, getCustomGroupsApi, createCustomGroupApi, createCollectionApi } from '@/api/work'
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

// collection
const isCreateCollectionMode = ref(false)
const selectedCollectionIds = ref([])
const collectionCoverFileIdArr = ref([])
const collectionName = ref('')
const showCreateCollectionDialog = ref(false)
const handleSelectCollection = (item) => {
  item.isSelected = !item.isSelected
  if (item.isSelected) {
    selectedCollectionIds.value.push(item.id)
  } else {
    selectedCollectionIds.value = selectedCollectionIds.value.filter(id => id !== item.id)
  }
}
const openCreateCollectionForm = () => {
  if(!selectedCollectionIds.value.length) return
  showCreateCollectionDialog.value = true
}

const backToSelect = () => {
  showCreateCollectionDialog.value = false
}

const handleCancelSelect = () => {
  selectedCollectionIds.value = []
  collectionCoverFileIdArr.value = []
  collectionName.value = ''
  tableData.value.forEach(item => {
    item.isSelected = false
  })
  isCreateCollectionMode.value = false

}

const handleCreateCollection = () => {
  const data = {
    name: collectionName.value,
    coverFileId: collectionCoverFileIdArr.value[0].id, // TODO:暂时使用id
    creationIds: selectedCollectionIds.value,
  }
  createCollectionApi(data).then((res) => {
    console.log('合集', res)
    toast.success('创建合集成功')
  }).catch(() => {
    toast.error('创建合集失败')
  }).finally(() => {
    handleCancelSelect()
    showCreateCollectionDialog.value = false
  })
}

const showCreateGroupDialog = ref(false)
const groupName = ref('')

const groupTabs = ref([
  { value: undefined, name: '全部' },
  { value: 1, name: '同人' },
  { value: 2, name: '原创' },
  { value: 3, name: '自定义二级分类' },
])
const groupId = ref(undefined)
const handleGroupClick = (value: number) => {

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
  // 注入前端合集选择标识
  tableData.value = tableData.value.concat(records.map(item => ({
    ...item,
    isSelected: false,
  })))
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
