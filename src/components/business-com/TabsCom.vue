<template>
  <div class="w-full flex items-center justify-center space-x-1 rounded-full bg-gray-200 p-1">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="[
        'flex-1 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none cursor-pointer',
        active === tab.value
          ? 'bg-[#926DDE] text-white shadow-md'
          : 'text-[#926DDE] hover:bg-purple-100 hover:text-purple-600',
      ]"
      @click="handleClick(tab.value)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tabs: Array,
  active: String || Number,
})

console.log(props.active)

const emit = defineEmits(['tab-click'])

const handleClick = (value: string) => {
  emit('tab-click', value)
}

</script>

<style scoped>
/* 你可以在这里添加一些额外的 scoped CSS，如果 Tailwind 不能完全满足需求的话 */
</style>
