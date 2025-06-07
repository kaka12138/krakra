<template>
  <div>
    <BaseDialogCom v-model:open="isOpen" :class-arr="['max-w-[40%] max-h-[80%]']">
      <h2 class="text-6xl font-bold text-[#9370DB] mb-1">
        创建
      </h2>
      <p class="text-6xl font-semibold text-[#9370DB] mb-6">
        <span class="text-[#FFC300]">{{ formTitle }}</span> 
      </p>
      <FormCom
        :form-type="formType"
        :form-fields-config="formFieldsConfig"
        :form-initial-values="formInitialValues"
        :form-rules="formRules"
        submit-text="完成"
        @submit="handleSubmit"
      />
    </BaseDialogCom>
  </div>
</template>
<script setup lang="ts">
import FormCom from '@/components/business-com/FormCom.vue'
import BaseDialogCom from '@/components/business-com/BaseDialogCom.vue'
import { createOC_AU_Work_Api  } from '@/api/work'
import { createGuashiApi } from '@/api/guashi'
import { toast } from 'vue-sonner'
import { ref, computed, watch } from 'vue'
import { FORM_FIELDS_MAP } from '@/constant/form-fields'
import { FORM_INITIAL_VALUES_MAP, FORM_TITLE_MAP } from '@/constant/form'
import { FORM_RULES_MAP } from '@/constant/form-rules'

const props = defineProps({
  formType: String,
  open: Boolean,
})

const emit = defineEmits(['createFormSuccess', 'closed'])

const isOpen = ref(props.open)

// oc Form
const formFieldsConfig = ref(FORM_FIELDS_MAP[props.formType])
const formInitialValues = ref(FORM_INITIAL_VALUES_MAP[props.formType])
const formRules = ref(FORM_RULES_MAP[props.formType])

const formTitle = computed(() => FORM_TITLE_MAP[props.formType])


const handleSubmit = (values: Record<string, unknown>, initialValues: Record<string, unknown>) => {
  const data = Object.assign({}, initialValues, values)
  if(Array.isArray(data.coverUrl) && data.coverUrl.length) {
    data.coverUrl = (data.coverUrl as { url: string }[])[0].url
  }

  // 处理content.imageUrls字段，将UploadCom返回的{id, url}格式转换为url数组
  if (data.content && typeof data.content === 'object' && data.content !== null) {
    const content = data.content as Record<string, unknown>
    if (Array.isArray(content.imageUrls)) {
      if (content.imageUrls.length > 0) {
        // 如果有数据，转换格式
        content.imageUrls = (content.imageUrls as { url: string }[]).map((item: { url: string }) => item.url)
      }
      // 如果是空数组，保持空数组
    } else {
      // 如果imageUrls不存在或不是数组，设置为空数组
      content.imageUrls = []
    }
  }

  // 兼容处理旧的imageFileIds字段（如果存在）
  if(Array.isArray(data.imageFileIds) && data.imageFileIds.length) {
    data.imageFileIds = data.imageFileIds.map((item: { url: string }) => item.url)
  }
  const apiFunc = props.formType === 'guashi_form' ? createGuashiApi : createOC_AU_Work_Api

  apiFunc(data).then(res => {
    console.log('res', res)
    toast.success('创建成功')
    isOpen.value = false
    emit('createFormSuccess')
  })
}

// TODO:暂时的，去了解shadcn-vue, 优化传递方式
watch(isOpen, (newVal) => {
  if(!newVal) {
    emit('closed')
  }
})

</script>
