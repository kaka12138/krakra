<script setup lang="ts">
import { provide } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { Button } from '@/components/ui/button'
import InputCom from './InputCom.vue'
import TextareaCom from './TextareaCom.vue'
import SwitchCom from './SwitchCom.vue'
import RadioGroupCom from './RadioGroupCom.vue'
import AddTagCom from './AddTagCom.vue'
import UploadCom from './UploadCom.vue'
import SelectCom from './SelectCom.vue'
import CombinationInputCom from './CombinationInputCom.vue'
import SeachCardCom from './SeachCardCom.vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

// 定义表单字段配置接口
interface FormFieldConfig {
  comType: string;
  fieldName: string;
  inputOriginType?: string;
  placeholder?: string;
  [key: string]: unknown;
}

// TODO: 注意和componentField的冲突/覆盖
const props = defineProps<{
  formFieldsConfig: FormFieldConfig[],
  formInitialValues: Record<string, unknown>,
  formRules: Record<string, unknown>,
  submitText?: string,
}>()

const emit = defineEmits(['submit'])

// 定义表单验证架构
const formSchema = toTypedSchema(props.formRules)

// 使用 useForm 创建表单控制器
const form = useForm({
  validationSchema: formSchema,
  initialValues: props.formInitialValues,
})


provide('form', form.values)

// 表单提交处理
const onSubmit = form.handleSubmit((values) => {
  console.log('values', values)
  emit('submit', values, props.formInitialValues)
})
</script>

<template>
  <div>
    <!-- TODO: 暂时使用@update:model-value+setFieldValue这种方式同步自定义组件和表单的数据，后续优化 -->
    <form class="space-y-5 sm:space-y-6">
      <template v-for="field in formFieldsConfig" :key="field.fieldName">
        <FormField v-slot="{ componentField, errorMessage='' }" :name="field.fieldName">
          <FormItem>
            <FormControl>
              <template v-if="field.comType === 'input'">
                <InputCom
                  :is-error="errorMessage.length > 0"
                  v-bind="{ ...componentField, ...field }"
                />
              </template>
              <template v-else-if="field.comType === 'textarea'">
                <TextareaCom :is-error="errorMessage.length > 0" v-bind="{ ...componentField, ...field }" />
              </template>
              <template v-else-if="field.comType === 'switch'">
                <SwitchCom v-bind="{ ...componentField, ...field }" />
              </template>
              <template v-else-if="field.comType === 'radio'">
                <RadioGroupCom
                  v-bind="{ ...componentField, ...field }"
                />
              </template>
              <template v-else-if="field.comType === 'add-tag'">
                <AddTagCom
                  v-model="componentField.modelValue"
                  v-bind="field"
                  @update:model-value="(val) => form.setFieldValue(field.fieldName, val)"
                />
              </template>
              <template v-else-if="field.comType === 'select'">
                <SelectCom v-bind="{ ...componentField, ...field }" />
              </template>
              <template v-else-if="field.comType === 'upload'">
                <UploadCom
                  v-model="componentField.modelValue"
                  :upload-id="field.fieldName"
                  v-bind="field"
                  @update:model-value="(val) => form.setFieldValue(field.fieldName, val)"
                />
              </template>
              <template v-else-if="field.comType === 'combination-input'">
                <CombinationInputCom
                  v-model="componentField.modelValue"
                  v-bind="field"
                  @update:model-value="(val) => form.setFieldValue(field.fieldName, val)"
                />
              </template>
              <template v-else-if="field.comType === 'search-card'">
                <SeachCardCom
                  v-model="componentField.modelValue"
                  v-bind="field"
                  @update:model-value="(val) => form.setFieldValue(field.fieldName, val)"
                />
              </template>
            </FormControl>
            <FormMessage class="text-red-500 text-sm font-medium pl-1 mt-1" />
          </FormItem>
        </FormField>
      </template>
      <Button type="button" class="w-full bg-[#9370DB] text-white rounded-3xl text-2xl py-6" @click="onSubmit">
        {{ submitText }}
      </Button>
    </form>
  </div>
</template>
