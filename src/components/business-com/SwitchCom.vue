<template>
  <div class="flex items-center justify-between">
    <label v-if="label" class="block text-sm font-medium text-purple-500 mb-1">{{ label }}</label>
    <!-- TODO:暂时处理switch类型+UI -->
    <Switch
      class="data-[state=checked]:bg-purple-500 data-[state=unchecked]:bg-gray-200 "
      :model-value="Boolean(componentField.modelValue) "
      @update:model-value="componentField.onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
import { useAttrs } from 'vue'

defineProps<{
  label?: string,
}>()

const componentField = useAttrs()
</script>
