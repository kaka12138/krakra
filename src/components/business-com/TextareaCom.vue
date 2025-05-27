<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-[#9370DB] mb-1">{{ label }}</label>
    <Textarea
      v-bind="componentField"
      :placeholder="placeholder"
      class="bg-background w-full h-24 rounded-lg border border-gray-300 p-2"
      :class="isError ? 'border-red-500 ring-1 ring-red-500/30' : 'focus:border-[#9370DB]'"
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
