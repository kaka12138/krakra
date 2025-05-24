<template>
  <div class="p-6 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-6">
      选择来源
    </h2>

    <FormCom
      :form-fields-config="formFieldsConfig"
      :form-initial-values="formInitialValues"
      :form-rules="formRules"
    />
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import FormCom from '@/components/business-com/FormCom.vue'

const formFieldsConfig = [
  {
    comType: 'radio',
    fieldName: 'source',
    label: '允许来自以下来源的同人扩链作品提交',
    options: [
      {
        desc1: '所有Krakra用户',
        desc2: '需要创建者验证',
        value: 'all_users',
      },
      {
        desc1: '仅限 Krakra 优质创作者',
        desc2: '需要创建者验证',
        value: 'quality_creators',
      },
      {
        desc1: '仅限 Krakra 已验证艺术家',
        desc2: '需要创建者验证',
        value: 'verified_artists',
      },
      {
        desc1: '仅限创建者',
        desc2: '包含编辑者和管理员',
        value: 'creators_only',
      },
    ],
  },
]

const formInitialValues = {
  source: 'all_users',
}

const formRules = z.object({
  source: z.string().min(1, '请选择来源'),
})
</script>
