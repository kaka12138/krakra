<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-purple-500 mb-1">{{ label }}</label>
    <Textarea
      v-bind="componentField"
      :placeholder="placeholder"
      class="w-full h-24 rounded-lg border border-gray-300 p-2"
      :class="isError ? 'border-red-500 ring-1 ring-red-500/30' : 'focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'"
    />
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
import { useAttrs } from 'vue'

defineProps<{
  isError: boolean,
  placeholder: string,
  label?: string,
}>()

const componentField = useAttrs()
</script>
