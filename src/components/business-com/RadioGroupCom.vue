<template>
  <div class="space-y-2">
    <label v-if="label" class="block text-sm font-medium text-neutral-700 dark:text-neutral-200">{{ label }}</label>
    <RadioGroup
      :model-value="componentField.modelValue"
      class="space-y-2"
      @update:model-value="componentField.onChange"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="flex items-center rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 cursor-pointer transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
        :class="{'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800': componentField.modelValue === option.value}"
      >
        <div class="mr-3">
          <RadioGroupItem
            :value="option.value"
            class="size-6 data-[state=checked]:border-purple-500 data-[state=checked]:text-purple-500"
          />
        </div>
        <div>
          <p class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            {{ option.desc1 }}
          </p>
          <p v-if="option.desc2" class="text-xs text-neutral-500 dark:text-neutral-400">
            {{ option.desc2 }}
          </p>
        </div>
      </div>
    </RadioGroup>
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface RadioOption {
  desc1: string
  desc2?: string
  value: string | number
}

defineProps<{
  label?: string
  options: RadioOption[]
}>()

const componentField = useAttrs()
</script>
