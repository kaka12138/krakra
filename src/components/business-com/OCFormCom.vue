<template>
  <div>
    <BaseDialogCom v-model:open="isOpen">
      <h2 class="text-6xl font-bold text-[#9370DB] mb-1">
        创建
      </h2>
      <p class="text-6xl font-semibold text-[#9370DB] mb-6">
        <span class="text-[#FFC300]">新角色</span>
      </p>
      <FormCom
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
import { createOC_AU_Work_Api } from '@/api/work'
import { toast } from 'vue-sonner'
import { ref } from 'vue'
import { FORM_FIELDS_MAP } from '@/constant/form-fields'
import { FORM_INITIAL_VALUES_MAP } from '@/constant/form'
import { FORM_RULES_MAP } from '@/constant/form-rules'
// oc Form
const formFieldsConfig = ref(FORM_FIELDS_MAP.oc_form)
const formInitialValues = ref(FORM_INITIAL_VALUES_MAP.oc_form)
const formRules = ref(FORM_RULES_MAP.oc_form)


const isOpen = ref(false)

const handleSubmit = (values: Record<string, unknown>) => {

  values.coverFileId = values.coverFileId[0].url
  values.tags = values.tags.map(t => t.desc)
  console.log('values', values)
  // createOC_AU_Work_Api()
}

defineExpose({
  open: () => {
    isOpen.value = true
  },
  close: () => {
    isOpen.value = false
  },
})


</script>
