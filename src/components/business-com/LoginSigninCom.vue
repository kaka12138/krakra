<template>
  <BaseDialogCom v-model:open="isOpen" :class-arr="['max-w-[40%] max-h-[60%]']">
    <h2 class="text-6xl font-bold text-[#9370DB] mb-1">
      {{ textMap.title }}
    </h2>
    <p class="text-6xl font-semibold text-[#9370DB] mb-6">
      Kra<span class="text-[#FFC300]">Kra</span>
    </p>
    <FormCom
      v-if="!isSigin"
      key="1"
      :form-fields-config="formFieldsConfig"
      :form-initial-values="formInitialValues"
      :form-rules="formRules"
      :submit-text="textMap.submitText"
      @submit="handleLogin"
    />
    <FormCom
      v-else
      key="2"
      :form-fields-config="signinFormFieldsConfig"
      :form-initial-values="signinFormInitialValues"
      :form-rules="signinFormRules"
      :submit-text="textMap.submitText"
      @submit="handleSignin"
    />
    <div class="mt-6 flex justify-between text-sm">
      <a href="#" class="text-[#9370DB]">忘记密码?</a>
      <a href="#" class="text-[#FFC300] underline" @click="isSigin = !isSigin">{{ textMap.goText }}</a>
    </div>
  </BaseDialogCom>
</template>
<script setup lang="ts">
import FormCom from '@/components/business-com/FormCom.vue'
import BaseDialogCom from '@/components/business-com/BaseDialogCom.vue'
import { signinApi, loginApi, getUserInfoApi } from '@/api/user'
import { toast } from 'vue-sonner'
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { FORM_FIELDS_MAP } from '@/constant/form-fields'
import { FORM_INITIAL_VALUES_MAP } from '@/constant/form'
import { FORM_RULES_MAP } from '@/constant/form-rules'
// login Form
const formFieldsConfig = ref(FORM_FIELDS_MAP.login_form)
const formInitialValues = ref(FORM_INITIAL_VALUES_MAP.login_form)
const formRules = ref(FORM_RULES_MAP.login_form)

const signinFormFieldsConfig = ref(FORM_FIELDS_MAP.signin_form)
const signinFormInitialValues = ref(FORM_INITIAL_VALUES_MAP.signin_form)
const signinFormRules = ref(FORM_RULES_MAP.signin_form)

const props = defineProps({
  open: Boolean,
})

const emit = defineEmits(['closed'])

const isOpen = ref(props.open)
const isSigin = ref(false)

const userStore = useUserStore()

const textMap = computed(() => {
  if(isSigin.value) {
    return {
      title: '加入',
      submitText: '注册',
      goText: '去登录',
    }
  }
  return {
    title: '欢迎回来',
    submitText: '登录',
    goText: '注册账号',
  }
})


const handleLogin = (values: Record<string, unknown>) => {
  console.log('values', values)
  loginApi(values).then(res => {
    console.log('登录', res)
    const { token, userId } = res
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    userStore.setToken(token)
    userStore.setUserId(userId)
    getUserInfoApi(userId).then(info => {
      localStorage.setItem('userInfo', JSON.stringify(info))
      userStore.setUserInfo(info)
      isOpen.value = false
    })
  })
}
const handleSignin = (values: Record<string, unknown>) => {
  signinApi(values).then(res => {
    console.log('注册', res)
    toast.success('注册成功')
    isOpen.value = false
    // TODO: 尝试登录
    loginApi({
      username: values.username,
      password: values.password,
    }).then(res1 => {
      console.log('登录', res1)
    })
  })
}

// TODO:暂时的，去了解shadcn-vue, 优化传递方式
watch(isOpen, (newVal) => {
  if(!newVal) {
    emit('closed')
  }
})
</script>
