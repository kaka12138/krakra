<template>
  <div>
    <!-- <h1>Login Form</h1>
    <FormCom
      :form-fields-config="formFieldsConfig"
      :form-initial-values="formInitialValues"
      :form-rules="formRules"
    /> -->
    <h1>OC or AU Form</h1>
    <FormCom
      :form-fields-config="ocFormFieldsConfig"
      :form-initial-values="ocFormInitialValues"
      :form-rules="ocFormRules"
    />
  </div>
</template>
<script setup lang="ts">
import FormCom from '@/components/business-com/FormCom.vue'
import { ref } from 'vue'
import { FORM_FIELDS_MAP } from '@/constant/form-fields'
import { FORM_INITIAL_VALUES_MAP } from '@/constant/form'
import { FORM_RULES_MAP } from '@/constant/form-rules'
// login Form
const formFieldsConfig = ref(FORM_FIELDS_MAP.login_form)
const formInitialValues = ref(FORM_INITIAL_VALUES_MAP.login_form)
const formRules = ref(FORM_RULES_MAP.login_form)

// oc form
const ocFormFieldsConfig = ref(FORM_FIELDS_MAP.oc_form)
const ocFormInitialValues = ref(FORM_INITIAL_VALUES_MAP.oc_form)
const ocFormRules = ref(FORM_RULES_MAP.oc_form)

</script>
