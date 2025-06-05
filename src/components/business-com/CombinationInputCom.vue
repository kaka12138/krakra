<template>
  <div>
    <div class="flex items-center justify-between gap-x-2 mb-1">
      <label class="block text-sm font-medium text-[#9370DB]">{{ componentField.label }}</label>
      <PlusIcon class="w-5 h-5 cursor-pointer" color="#9370DB" @click="handleAddItem" />
    </div>
    <div class="space-y-2">
      <div v-for="item in items" :key="item.id" class="space-y-2 border-1 border-[#9370DB] rounded-lg p-2">
        <div class="flex items-center justify-between">
          <span class="text-sm text-[#9370DB]">标签名: </span>
          <XIcon class="w-5 h-5 cursor-pointer" color="#9370DB" @click="handleRemoveItem(item.id)" />
        </div>
        <Input
          type="text"
          class="w-full bg-background"
          placeholder="可填写性别、年龄、种族、职业等等"
          @update:model-value="handleUpdateItem(item.id, 'name', $event)"
        />

        <div>
          <span class="text-sm text-[#9370DB]">标签描述:</span>
          <Textarea
            class="w-full bg-background h-24"
            placeholder="请输入标签描述"
            @update:model-value="handleUpdateItem(item.id, 'description', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAttrs } from 'vue'
import { PlusIcon, XIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps({
  placeholder: String,
  modelValue: Array,
})
const emit = defineEmits(['update:modelValue'])

const componentField = useAttrs()

const items = ref(props.modelValue || [])

const handleAddItem = () => {
  items.value.push({
    id: Date.now(),
    name: '',
    description: '',
  })
  emit('update:modelValue', items.value)
}
const handleRemoveItem = (id: number) => {
  items.value = items.value.filter(item => item.id !== id)
  console.log('items.value', items.value)
  emit('update:modelValue', items.value)
}

const handleUpdateItem = (id: number, key: string, value: string) => {
  items.value = items.value.map(item => item.id === id ? { ...item, [key]: value } : item)
  emit('update:modelValue', items.value)
}
</script>
