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
  if(data.coverFileId?.length) {
    data.coverFileId = data.coverFileId[0].url
  }

  data.tags = data.tags.map(t => t.desc)

  if(data.imageFileIds?.length) {
    data.imageFileIds = data.imageFileIds.map(item => item.url)
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
