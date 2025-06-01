<template>
  <div class="w-full flex px-4 py-2 rounded-xl bg-[#F7F7F7]">
    <div class="w-1/3 flex items-center">
      <img :src="auInfo.coverFileId " class="min-w-22 max-w-22 w-22 h-22 rounded-xl object-cover">
      <div class="w-full max-w-3/5 flex flex-col justify-center mx-4">
        <div class="truncate text-black text-2xl">
          {{ auInfo.name }}
        </div>
        <p class="line-clamp-2 text-[#999] text-base">
          {{ auInfo.description }}
        </p>
      </div>
    </div>
    <div class="p-2 border-l-1 overflow-x-auto">
      <p class="text-[#999] text-xl mb-2">
        从属角色
      </p>
      <div class="flex-1 flex gap-1 items-center">
        <div v-for="url in auInfo.imageFileIds" :key="url">
          <img :src="url" class="min-w-22 max-w-22 w-22 h-22 rounded-xl object-cover">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  auInfo: Object,
})
</script>
