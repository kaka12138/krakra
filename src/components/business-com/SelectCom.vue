<template>
  <div>
    <label class="block text-sm font-medium text-[#9370DB] mb-1">{{ componentField.label }}</label>
    <Select v-bind="componentField">
      <SelectTrigger class="w-[180px] bg-background">
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <!-- TODO: 这里需要添加错误样式 -->
      <SelectContent>
        <SelectGroup class="max-h-60">
          <SelectItem v-for="option in options" :key="option.value" :value="option.value">
            {{ option.label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAttrs, computed } from 'vue'

const props = defineProps({
  placeholder: String,
  isError: Boolean,
})

const isError1 = computed(() => {
  console.log('props.isError', props.isError)
  return props.isError
})

const componentField = useAttrs()

const options = componentField.options;
</script>
