<template>
  <label v-if="label" class="block text-sm font-medium text-[#9370DB] mb-1">{{ label }}</label>
  <div class="relative">
    <Input
      v-bind="componentField"
      :type="inputOriginTypeComputed"
      :placeholder="placeholder"
      class="bg-background h-11 sm:h-12 rounded-lg transition-all duration-300 pr-10"
      :class="isError ? 'border-red-500 ring-1 ring-red-500/30' :'focus:border-[#9370DB]'"
    />
    <template v-if="inputOriginType === 'password'">
      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        @click="togglePasswordVisibility"
      >
        <svg
          v-if="showPassword"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </template>
    <template v-if="inputOriginType === 'code'">
      <div
        class="
        absolute right-0 top-1 text-white bg-[#FFC300] rounded-3xl px-4 py-2 cursor-pointer
        "
        :class="isSendCode ? 'bg-gray-400' : 'bg-[#FFC300]'"
        @click="handleSendCode"
      >
        {{ isSendCode ? `${countDown}秒后重新发送` : '发送验证码' }}
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Input } from '../ui/input'
import { toast } from 'vue-sonner'
import { useAttrs, ref, computed, onUnmounted, inject } from 'vue'
import { sendSmsCode } from '@/api/common'

const props = defineProps<{
  isError: boolean,
  inputOriginType: string, // TODO: 配置
  placeholder: string,
  label?: string,
}>()
const formData = inject('form')
const componentField = useAttrs()


const isSendCode = ref(false)
const countDown = ref(0)
const timer = ref(null)


const showPassword = ref(false)
// 切换密码显示状态
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const inputOriginTypeComputed = computed(() => {
  const type = props.inputOriginType
  if(type === 'password' && showPassword.value) {
    return 'text'
  }
  return type
})

const handleSendCode = () => {
  if(countDown.value > 0) return
  const { email } = formData
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!emailRegex.test(email)) {
    toast('请输入正确的邮箱')
    return
  }
  sendSmsCode(email).then(res => {
    console.log('发送成功', res)
    toast.success('发送成功')
    isSendCode.value = true
    countDown.value = 60
    const timerId = setInterval(() => {
      countDown.value--
      if(countDown.value <= 0) {
        clearInterval(timerId)
        isSendCode.value = false
      }
    }, 1000)
    timer.value = timerId
  }).catch(err => {
    console.log('发送失败', err)
  })
}

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>
