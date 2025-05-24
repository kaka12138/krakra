<template>
  <div>
    <h1>Home</h1>
    <FormCom
      :form-fields-config="formFieldsConfig"
      :form-initial-values="formInitialValues"
      :form-rules="formRules"
    />
  </div>
</template>
<script setup lang="ts">
import FormCom from '@/components/business-com/FormCom.vue'
import { ref } from 'vue'
import { FORM_FIELDS_MAP } from '@/constant/form-fields'
import { FORM_INITIAL_VALUES_MAP } from '@/constant/form'
import { FORM_RULES_MAP } from '@/constant/form-rules'

const formFieldsConfig = ref(FORM_FIELDS_MAP.login_form)
const formInitialValues = ref(FORM_INITIAL_VALUES_MAP.login_form)
const formRules = ref(FORM_RULES_MAP.login_form)
</script>
