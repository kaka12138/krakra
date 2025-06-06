<template>
  <div class="flex w-8/9 mx-auto h-full py-10 pt-30">
    <div class="w-[20%] min-w-[20%] mt-9 mr-6">
      <UserInfoCom :user-info-from-request="userInfoFromRequest" />
    </div>
    <div class="flex-1 h-full flex flex-col">
      <div class="w-full">
        <NavsInAbout :active="active" :tabs="tabs" @tab-click="handleTabClick" />
      </div>
      <div class="flex-1 max-h-full overflow-auto bg-background rounded-lg">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserInfoCom from '@/components/business-com/UserInfoCom.vue'
import NavsInAbout from '@/components/business-com/NavsInAbout.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watchEffect, watch } from 'vue'
import { getUserInfoApi } from '@/api/user'
import type { UserInfo } from '@/api/user'

const route = useRoute()
const active = ref('mywork')
const router = useRouter()
const tabs = ref([
  { value: 'mywork', name: '池塘' },
  { value: 'myguashi', name: '呱市' },
  { value: 'myorder', name: '委托' },
  { value: 'myroles', name: 'OC' },
  { value: 'myfavorite', name: '喜欢' },
  { value: 'myrecreation', name: '扩单' },
  { value: 'mycollection', name: '合集' },
])

const userInfoFromRequest = ref<UserInfo>({})

const getUserInfo = async (id: string) => {
  userInfoFromRequest.value = await getUserInfoApi(id)
  const nickname = userInfoFromRequest.value.nickname || ''
  tabs.value[0].name = nickname ? `${nickname}的池塘` : '池塘'
}

watch(() => route.params.id, (newVal) => {
  if (newVal) {
    getUserInfo(newVal)
  }
}, {
  immediate: true,
})

watchEffect(() => {
  const { name } = route
  console.log('name', name)
  active.value = name as string
})


const handleTabClick = (value: string) => {
  active.value = value
  router.push({ name: value })
}

</script>


