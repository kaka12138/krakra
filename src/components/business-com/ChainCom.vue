<template>
  <div class="w-full space-y-2">
    <div class="flex relative items-center justify-between overflow-hidden">
      <div
        v-for="(item, idx) in chainList"
        :key="item.id"
        class="rounded-full border-4 relative"
        :class="[idx === 0 ? 'border-[#FFD700]' : 'border-[#9370DB]', idx == 0 || idx === chainList.length - 1 ? 'w-16 h-16 opacity-100' : 'w-10 h-10 opacity-50']"
      />
      <div class="w-full h-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#9370DB] opacity-50" />
    </div>
    <div class="flex items-center justify-between">
      <div
        v-for="(item, idx) in firstAndLastChain"
        :key="item.id"
        class="px-4 py-1 rounded-2xl font-bold"
        :class="[ idx === 0 ? 'bg-[#FFD700] text-[#9370DB]' : 'bg-[#9370DB] text-white']"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  chainList: {
    type: Array,
    default: () => ([]),
  },
})

const firstAndLastChain = computed(() => {
  if (props.chainList.length > 0) {
    return [props.chainList[0], props.chainList[props.chainList.length - 1]]
  }
  return []
})
</script>

