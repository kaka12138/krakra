<template>
  <div>
    <div class="flex">
      <Input
        id="upload-file"
        type="file"
        class="hidden"
        @change="handleFileChange"
      />
      <label v-if="fileList.length < limit" for="upload-file" class="cursor-pointer relative">
        <div class="w-30 h-30 flex items-center justify-center rounded-lg bg-gray-200 text-white text-4xl">
          +
        </div>
      </label>
      <div class="flex flex-1 h-36 overflow-x-auto overflow-y-hidden ml-2 gap-x-2">
        <div v-for="item in fileList" :key="item.id" class="group relative">
          <img class="object-cover min-w-30 min-h-30 w-30 h-30 rounded-2xl" :src="item.url">
          <div
            class="hidden group-hover:block cursor-pointer w-full h-30 rounded-2xl absolute z-99 top-0 right-0 bg-black opacity-40 text-white text-center leading-30"
            @click="handleDelete(item.id)"
          >
            删除
          </div>
        </div>
      </div>
    </div>

    <label v-if="label" class="block text-sm font-medium text-[#9370DB] mb-1">{{ label }}</label>
    <p class="text-sm text-gray-500">
      上传 JPG、PNG、WEBP 或 GIF 小于 8mb
    </p>
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { uploadFileApi } from '@/api/common'

const props = defineProps({
  modelValue: Array,
  label: String,
  limit: Number,
})

const fileList = ref(props.modelValue || [])

const emit = defineEmits(['update:modelValue'])

const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  const { type, size } = file
  if (size > 8 * 1024 * 1024) {
    toast('图片大小不能超过 8MB')
    return
  }
  if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/webp' && type !== 'image/gif') {
    toast('请上传 JPG、PNG、WEBP 或 GIF 图片')
    return
  }

  const formData = new FormData()
  formData.append('file', file)
  uploadFileApi(formData).then(res => {
    console.log('res', res)
    const {  id, url, ext } = res
    fileList.value.push({
      id,
      url: `${url}.${ext}`,
    })
    emit('update:modelValue', fileList.value)
  }).finally(() => {
    (e.target as HTMLInputElement).value = ''
  })
}

const handleDelete = (id: number) => {
  fileList.value = fileList.value.filter(item => item.id !== id)
  emit('update:modelValue', fileList.value)
}
</script>
