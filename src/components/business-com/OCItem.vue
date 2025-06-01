<template>
  <div class="w-full flex items-center px-4 py-3 rounded-xl bg-[#F7F7F7] overflow-auto">
    <div class="w-20 min-w-20 max-h-20 rounded-full overflow-hidden">
      <img :src="ocInfo.coverFileId" class="w-full h-full rounded-full object-cover">
    </div>

    <div class="flex-1 mx-4">
      <div class="truncate text-black text-2xl">
        {{ ocInfo.name }}
      </div>
      <div class="line-clamp-2 text-[#999] text-base">
        {{ ocInfo.description }}
        22233333332222222222223333
      </div>
    </div>

    <div v-if="ocInfo.worlds.length" class="w-20 min-w-20 pl-4 border-l-1 border-[#999] flex flex-col items-center justify-center">
      <div class="w-15 h-15 min-w-15 min-h-15 rounded-full overflow-hidden">
        <img :src="ocInfo.worlds[0].url" class="w-full h-full rounded-full object-cover">
      </div>
      <div class="truncate text-[#999] text-center text-base mt-2">
        {{ ocInfo.worlds[0].name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  ocInfo: Object,
})
</script>
