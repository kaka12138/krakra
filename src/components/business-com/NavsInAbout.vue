<template>
  <div class="bg-[#f0f0f0]">
    <div class="w-full flex items-center justify-center space-x-1 rounded-full">
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.value"
        :class="[
          'px-2 py-1 rounded-full text-xl font-bold cursor-pointer line-clamp-1',
          active === tab.value
            ? 'text-[#926DDE]  bg-background'
            : 'text-[#D6CCEB]',
          idx === 0 ? 'max-w-1/4': 'w-1/8'
        ]"
        @click="handleClick(tab.value)"
      >
        {{ tab.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  tabs: Array,
})
const active = ref(props.tabs[0].value)
const emit = defineEmits(['tab-click'])

const handleClick = (value: string) => {
  active.value = value
  emit('tab-click', value)
}

</script>

<style scoped>
/* 你可以在这里添加一些额外的 scoped CSS，如果 Tailwind 不能完全满足需求的话 */
</style>
