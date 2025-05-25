<template>
  <div>
    <div class="flex items-center justify-between text-sm font-medium text-[#9370DB] mb-1">
      <span v-if="label">{{ label }}</span>
      <span class="text-gray-300">最多5个</span>
    </div>
    <Input
      v-model="inputLabel"
      placeholder="请输入标签"
      class="bg-background h-11 sm:h-12 rounded-lg transition-all duration-300 pr-10"
      @change="handleInputChange"
    />
    <div class="flex flex-wrap mt-2">
      <div v-for="tag in labelList" :key="tag.id" class="flex items-center mr-2 justify-center gap-2 rounded-full bg-[#9370DB] px-3 py-1 text-white font-medium text-lg">
        <span @click="handleDel(tag.id)">X</span>
        <span>{{ tag.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import { ref } from 'vue'
const props = defineProps({
  label: String,
  modelValue: Array,
})
const emit = defineEmits(['update:modelValue'])

const labelList = ref(props.modelValue || [])
const inputLabel = ref('')
const handleInputChange = (e) => {
  const value = e.target.value
  console.log('ss', value)
  if(labelList.value.length >= 5) return
  const exist = labelList.value.find(item => item.desc === value)
  if(exist) {
    toast('标签已存在')
    return
  }
  labelList.value.push({
    desc: value,
    id: Date.now(),
  })
  inputLabel.value = ''
  emit('update:modelValue', labelList.value)
}
const handleDel = (id) => {
  labelList.value = labelList.value.filter(item => item.id!== id)
  emit('update:modelValue', labelList.value)
}
</script>
