<template>
  <div class="w-full space-y-2">
    <div class="flex relative items-center justify-between overflow-hidden">
      <div
        v-for="item in chainListComputed"
        :key="item.id"
        class="rounded-full border-3 relative overflow-hidden"
        :class="[item.isHighlight? 'border-[#FFD700] w-16 h-16 opacity-100' : 'h-10 w-10 border-[#9370DB] opacity-50', item.isCurrent ? 'w-16 h-16 opacity-100' : '']"
      >
        <img :src="item.coverFileId" class="w-full h-full object-cover">
      </div>
      <div class="w-full h-1 absolute z-[-1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#9370DB] opacity-50" />
    </div>
    <div v-if="showTag" class="flex items-center justify-between">
      <div
        v-for="(item, idx) in firstAndLastChain"
        :key="item.id"
        class="px-2 py-1 rounded-2xl font-medium text-sm"
        :class="[ idx === 0 ? 'bg-[#FFD700] text-[#9370DB]' : 'bg-[#9370DB] text-white']"
      >
        {{ idx === 0 ? "零号位" : "当前创作" }}
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
  highlightNodes: {
    type: Array,
    default: () => ([]),
  },
  currentNodeId: {
    type: Number,
  },
  showTag: {
    type: Boolean,
    default: true,
  },
})

console.log('props.chainList', props.chainList)

const chainListComputed = computed(() => {
  return props.chainList.map(item => ({
    ...item,
    isHighlight: props.highlightNodes.includes(item.id),
    isCurrent: item.id === props.currentNodeId,
  }))
})

const firstAndLastChain = computed(() => {
  console.log('props.showTag', props.showTag)
  if(props.chainList.length === 0) return []
  if(!props.showTag) return []
  return [props.chainList[0], props.chainList[props.chainList.length - 1]]
})
</script>

