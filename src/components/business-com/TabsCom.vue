<template>
  <div class="max-w-80 w-full flex items-center justify-center space-x-1 rounded-full p-1 border-1 border-[#D6CCEB]">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="[
        'flex-1 py-0.5 rounded-full text-md tracking-[4px] font-bold cursor-pointer',
        active === tab.value
          ? 'bg-[#926DDE]  text-white'
          : 'text-[#D6CCEB]',
      ]"
      @click="handleClick(tab.value)"
    >
      {{ tab.name }}
    </button>
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
