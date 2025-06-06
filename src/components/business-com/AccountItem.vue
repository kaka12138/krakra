<template>
  <div
    class="flex border-2 border-[#9370DB] p-2 rounded-full shadow-md"
    :class="itemInfo.isActive ? 'border-[#9470DB]' : 'border-transparent'"
  >
    <div class="relative w-12 h-12 mr-2" @click="handleAccountClick">
      <img src="@/assets/logo-h.png" alt="avatar" class="w-10 h-10 object-cover">
      <div
        class="absolute bottom-0 right-0 z-1 border-1 border-white rounded-full bg-[#9470DB] text-white text-[8px] px-1.5 py-0.5"
        :class="itemInfo.type == 1 ? 'bg-[#9470DB] text-white' : 'bg-[#FFD900] text-[#9470DB]'"
      >
        {{ itemInfo.type == 1 ? '用户' : 'OC' }}
      </div>
    </div>
    <div class="flex flex-col justify-center">
      <p class="truncate font-bold text-md">
        用户名
      </p>
      <p class="text-sm text-[#9470DB] truncate">
        {{ itemInfo.type == 1 ? 'ID: 1234567890' : '简介简介简介简介简介' }}
      </p>
    </div>
    <div class="relative ml-auto self-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="M3.46 6.8C5.286 3.806 8.548 1.986 12.06 2C16.214 2.03 19.918 4.614 21.37 8.5C22.822 12.386 21.718 16.77 18.6 19.51C15.482 22.25 10.994 22.782 7.32 20.85L7.26 20.82L6.58 20.43C6.44 20.372 6.19 20.39 6.19 20.39C5.482 20.646 4.756 20.858 4.02 21.02L3.89 21.03C3.08 21.048 2.67 20.526 2.67 19.76L2.69 19.6C2.874 18.84 3.098 18.084 3.36 17.39C3.402 17.26 3.39 17.122 3.32 16.99L3.14 16.63C1.514 13.522 1.636 9.794 3.46 6.8ZM12.0499 3.3901C15.6244 3.41764 18.8205 5.6462 20.0699 8.9901C21.3193 12.3323 20.3629 16.1023 17.6799 18.4601L17.4599 18.6401C14.8629 20.7724 11.2654 21.1995 8.2399 19.7401L7.9499 19.6001L7.9599 19.6001L7.9399 19.5901L7.5199 19.3501C7.36673 19.264 7.1499 19.1501 7.1499 19.1501C6.68695 18.9591 6.2122 18.9396 5.7699 19.0601L5.3599 19.2001C5.08282 19.2913 4.8101 19.3761 4.5399 19.4501L4.14431 19.549C4.29772 18.9703 4.47854 18.399 4.6899 17.8401C4.85339 17.3118 4.80084 16.791 4.5599 16.3401L4.3799 15.9801C2.97901 13.3022 3.09035 10.0947 4.6599 7.5201C6.18126 5.02465 8.85625 3.48271 11.7699 3.4001L12.0499 3.3901ZM4.14431 19.549C4.11161 19.6724 4.08014 19.7961 4.0499 19.9201L4.1399 19.5501L4.14431 19.549ZM8.75 11.9999C8.75 11.3699 8.23928 10.8599 7.61 10.8599C6.98072 10.8599 6.47 11.3699 6.47 11.9999C6.47 12.6299 6.98072 13.1399 7.61 13.1399C8.23928 13.1399 8.75 12.6299 8.75 11.9999ZM13.1899 11.9999C13.1899 11.3699 12.6792 10.8599 12.0499 10.8599C11.4206 10.8599 10.9099 11.3699 10.9099 11.9999C10.9099 12.6299 11.4206 13.1399 12.0499 13.1399C12.6792 13.1399 13.1899 12.6299 13.1899 11.9999ZM16.4801 10.8599C17.1094 10.8599 17.6201 11.3699 17.6201 11.9999C17.6201 12.6299 17.1094 13.1399 16.4801 13.1399C15.8508 13.1399 15.3401 12.6299 15.3401 11.9999C15.3401 11.3699 15.8508 10.8599 16.4801 10.8599Z" fill-rule="evenodd" fill="#CCCCCC" />
      </svg>
      <div v-if="itemInfo.existMsg" class="w-2 h-2 rounded-full bg-[#FF5454] absolute top-1 right-0" @click="handleMsgClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleAccountClick = () => {
  console.log('handleAccountClick')
}

const handleMsgClick = () => {
  console.log('handleMsgClick')
}

defineProps({
  itemInfo: {
    type: Object,
    default: () => ({}),
  },
})
</script>
