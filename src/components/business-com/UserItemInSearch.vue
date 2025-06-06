<template>
  <div class="flex items  w-full border-t-1 border-[#eee] rounded-2xl p-4">
    <img src="@/assets/logo-h.png" alt="" class="w-16 h-16 rounded-2xl">
    <div class="ml-3">
      <p class="truncate text-md text-[#333] font-bold mb-2">
        名称名称名称名称名称
      </p>
      <p class="truncate text-sm text-[#999]">
        ID
      </p>
    </div>
    <div
      class="cursor-pointer ml-auto self-center px-4 py-1 border-1 rounded-full text-sm"
      :class="itemInfo.isFollow ? 'bg-background text-[#FFD700] border-[#FFD700]' : 'bg-[#FFD700] text-white border-[#FFD700]'"
    >
      {{ itemInfo.isFollow ? '已关注' : '+关注' }}
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  itemInfo: Object,
})
</script>
