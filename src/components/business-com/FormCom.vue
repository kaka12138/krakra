<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { Button } from '@/components/ui/button'
import InputCom from './InputCom.vue'
import TextareaCom from './TextareaCom.vue'
import SwitchCom from './SwitchCom.vue'
import RadioGroupCom from './RadioGroupCom.vue'
import AddTagCom from './AddTagCom.vue'
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
}>()


// 定义表单验证架构
const formSchema = toTypedSchema(props.formRules)

// 使用 useForm 创建表单控制器
const form = useForm({
  validationSchema: formSchema,
  initialValues: props.formInitialValues,
})


// 表单提交处理
const onSubmit = form.handleSubmit((values) => {
  console.log('submit', values)
})
</script>

<template>
  <div>
    <form class="space-y-5 sm:space-y-6" @submit="onSubmit">
      <template v-for="field in formFieldsConfig" :key="field.fieldName">
        <FormField v-slot="{ componentField, errorMessage='' }" :name="field.fieldName">
          <FormItem>
            <FormControl>
              <template v-if="field.comType === 'input'">
                <InputCom :is-error="errorMessage.length > 0" v-bind="{ ...componentField, ...field }" />
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
                {{ componentField }}
                <AddTagCom v-model="componentField.modelValue" />
              </template>
            </FormControl>
            <FormMessage class="text-red-500 text-sm font-medium pl-1 mt-1" />
          </FormItem>
        </FormField>
      </template>
      <Button type="submit">
        提交
      </Button>
    </form>
  </div>
</template>
