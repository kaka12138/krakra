<template>
  <div class="flex h-4/5 p-10">
    <div class="w-80  h-full mr-10">
      <UserInfoCom />
    </div>
    <div class="flex-1 h-full">
      <div class="w-full mb-2">
        <TabsCom :active="active" :tabs="tabs" @tab-click="handleTabClick" />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInfoCom from '@/components/business-com/UserInfoCom.vue'
import TabsCom from '@/components/business-com/TabsCom.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watchEffect } from 'vue'

const route = useRoute()
console.log(route)
const active = ref('mywork')
const router = useRouter()
const tabs = ref([
  { value: 'mywork', name: 'A池塘' },
  { value: 'myguashi', name: '呱市' },
  { value: 'myorder', name: '委托' },
  { value: 'myoc', name: 'OC' },
  { value: 'myfavorite', name: '喜欢' },
  { value: 'myrecreation', name: '扩单' },
  { value: 'mycollection', name: '合集' },
])

watchEffect(() => {
  active.value = route.name
})

const handleTabClick = (value: string) => {
  active.value = value
  router.push({ name: value })
}

</script>


