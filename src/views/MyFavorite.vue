<template>
  <div class="h-full overflow-auto flex flex-col gap-10">
    <v3-waterfall
      :list="tableData"
      :col-width="300"
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
          <WorkItem :artwork="item" @click-chain="handleClickChain" />
        </div>
      </template>
    </v3-waterfall>
  </div>
  <BallMenuCom />
</template>

<script setup lang="ts">
import WorkItem from '@/components/business-com/WorkItem.vue'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { getMyFavoriteListApi } from '@/api/work';
import { addToMyRecreationApi } from '@/api/work';
import BallMenuCom from '@/components/business-com/BallMenuCom.vue'
import { toast } from 'vue-sonner'
const router = useRouter()
const route = useRoute()

// waterfall
const isMounted = ref(false)
onMounted(() => {
  isMounted.value = true
})


// list
const tableData = ref([])
const pageNum = ref(0) // TODO:可能bug
const pageSize = ref(10)
const totalVal = ref(0)
const getTableData = async () => {
  const res = await getMyFavoriteListApi({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    creatorId: route.params.id,
  })
  const { records, total } = res
  totalVal.value = total
  tableData.value = tableData.value.concat(records)
}

const getNext = () => {
  console.log('isMounted', isMounted.value)
  // TODO:
  console.log('getNext')
  pageNum.value++
  getTableData()
}

const handleClickChain = (id: string) => {
  router.push(`/chaindetail?id=${id}`)
}

const handleDrop = (item) => {
  const { id } = item
  addToMyRecreationApi({ creationId: id }).then((res) => {
    console.log('res', res)
    toast.success('添加二创成功')
  })
}

</script>
