<template>
  <div>
    <div>
      <span v-if="label">{{ label }}</span>
      <span>最多5个</span>
    </div>
    <Input
      v-model="inputLabel"
      placeholder="请输入标签"
      class="h-11 sm:h-12 rounded-lg transition-all duration-300 pr-10"
      @change="handleInputChange"
    />
    <div>
      <div v-for="tag in labelList" :key="tag.id">
        <span @click="handleDel(tag.id)">X</span>
        <span>{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
const props = defineProps({
  prop: String,
  label: String,
  modelValue: Array,
})

const labelList = ref(props.modelValue || [])
const inputLabel = ref('')
const handleInputChange = (e) => {
  const value = e.target.value
  console.log('ss', value)
  if(labelList.value.length >= 5) return
  const exist = labelList.value.find(item => item.desc === value)
  if(exist) {
    console.log('标签已存在')
    return
  }
  labelList.value.push({
    desc: value,
    id: Date.now(),
  })
  inputLabel.value = ''
}
const handleDel = (id) => {
  labelList.value = labelList.value.filter(item => item.id!== id)
}
</script>
