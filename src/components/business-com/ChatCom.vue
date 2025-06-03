<template>
  <div class="max-w-4xl mx-auto bg-[#F0F0F0] mt-30 border-1 border-red-500 h-4/5">
    <div class="flex rounded-2xl h-full">
      <!-- left -->
      <div class="w-1/3 max-w-1/ h-full">
        <div class="flex items-center gap-x-2 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="w-7 h-7"
            viewBox="0 0 20.001708984375 20.001953125"
            fill="none"
          >
            <path d="M1.46 4.8C3.286 1.806 6.548 -0.014 10.06 0C14.214 0.03 17.918 2.614 19.37 6.5C20.822 10.386 19.718 14.77 16.6 17.51C13.482 20.25 8.994 20.782 5.32 18.85L5.26 18.82L4.58 18.43C4.44 18.372 4.19 18.39 4.19 18.39C3.482 18.646 2.756 18.858 2.02 19.02L1.89 19.03C1.08 19.048 0.67 18.526 0.67 17.76L0.69 17.6C0.874 16.84 1.098 16.084 1.36 15.39C1.402 15.26 1.39 15.122 1.32 14.99L1.14 14.63C-0.486 11.522 -0.364 7.794 1.46 4.8ZM10.0499 1.3901C13.6244 1.41764 16.8205 3.6462 18.0699 6.9901C19.3193 10.3323 18.3629 14.1023 15.6799 16.4601L15.4599 16.6401C12.8629 18.7724 9.26542 19.1995 6.2399 17.7401L5.9499 17.6001L5.9599 17.6001L5.9399 17.5901L5.5199 17.3501C5.36673 17.264 5.1499 17.1501 5.1499 17.1501C4.68695 16.9591 4.2122 16.9396 3.7699 17.0601L3.3599 17.2001C3.08282 17.2913 2.8101 17.3761 2.5399 17.4501L2.14431 17.549C2.29772 16.9703 2.47854 16.399 2.6899 15.8401C2.85339 15.3118 2.80084 14.791 2.5599 14.3401L2.3799 13.9801C0.979006 11.3022 1.09035 8.09472 2.6599 5.5201C4.18126 3.02465 6.85625 1.48271 9.7699 1.4001L10.0499 1.3901ZM2.14431 17.549C2.11161 17.6724 2.08014 17.7961 2.0499 17.9201L2.1399 17.5501L2.14431 17.549ZM6.75 9.9999C6.75 9.36994 6.23928 8.8599 5.61 8.8599C4.98072 8.8599 4.47 9.36994 4.47 9.9999C4.47 10.6299 4.98072 11.1399 5.61 11.1399C6.23928 11.1399 6.75 10.6299 6.75 9.9999ZM11.1899 9.9999C11.1899 9.36994 10.6792 8.8599 10.0499 8.8599C9.42062 8.8599 8.9099 9.36994 8.9099 9.9999C8.9099 10.6299 9.42062 11.1399 10.0499 11.1399C10.6792 11.1399 11.1899 10.6299 11.1899 9.9999ZM14.4801 8.8599C15.1094 8.8599 15.6201 9.36994 15.6201 9.9999C15.6201 10.6299 15.1094 11.1399 14.4801 11.1399C13.8508 11.1399 13.3401 10.6299 13.3401 9.9999C13.3401 9.36994 13.8508 8.8599 14.4801 8.8599Z" fill-rule="evenodd" fill="#9370DB" />
          </svg>
          <span class="font-bold text-2xl text-[#9370DB]">私信</span>
        </div>
        <div class="relative px-4 mb-2">
          <div class="absolute left-7 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="16"
              height="16"
              viewBox="0 0 14.99755859375 15.00018310546875"
              fill="none"
            >
              <path d="M1.26641 3.06802C3.28391 0.191019 7.15239 -0.815482 10.3639 0.705519C13.5754 2.22502 15.1684 5.81002 14.1139 9.14302C14.0494 9.34552 13.8739 9.50002 13.6639 9.54803C13.4524 9.59452 13.2349 9.53002 13.0864 9.37552C12.9394 9.21952 12.8869 9.00052 12.9514 8.79802C13.8334 5.99002 12.4459 2.97502 9.71138 1.75552C6.97839 0.536019 3.7489 1.49002 2.15891 3.98302C0.568916 6.47602 1.11191 9.73102 3.43391 11.5955C5.7559 13.46 9.13388 13.3505 11.3239 11.3405C11.4364 11.228 11.5909 11.168 11.7514 11.168C11.9104 11.168 12.0664 11.228 12.1789 11.3405L12.2389 11.438L14.8189 13.958C15.0604 14.2235 15.0544 14.5955 14.8189 14.828C14.5834 15.0575 14.2069 15.0575 13.9714 14.828L11.6839 12.593C8.88338 14.7545 4.8919 14.5925 2.28641 12.2105C-0.31758 9.82702 -0.752579 5.94352 1.26641 3.06802Z" fill="#957EAB" />
            </svg>
          </div>
          <Input type="text" placeholder="搜索用户" class="bg-background rounded-full px-9 placeholder:font-bold placeholder:text-[#D6CCEB] text-md" />
        </div>
        <div class="h-4/5 overflow-y-auto overflow-x-hidden">
          <div v-for="item in 2" :key="item" class="flex group hover:bg-[#D9D9D9] cursor-pointer p-2">
            <div class="hidden group-hover:flex items-center justify-center">
              <XIcon :size="20" color="#999" />
            </div>
            <div class="w-full flex-1">
              <div class="flex items-center gap-x-2">
                <img src="@/assets/logo-h.png" class="w-10 h-10 rounded-full ml-2">
                <div class="w-2/3">
                  <div class="truncate font-medium text-black text-md">
                    用户名测试
                  </div>
                  <div class="truncate text-xs text-[#666]">
                    用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- right -->
      <div class="h-full flex-1 border-l-2 border-[#ccc] flex flex-col max-w-2/3">
        <div class="truncate font-medium text-black text-md text-center max-w-1/2 mx-auto mt-4 mb-6">
          用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试
        </div>
        <div class="text-sm text-[#999] text-center mb-4">
          2025年5月12日 22:33
        </div>
        <div class="flex-1 overflow-y-auto px-4 space-y-6 pb-4">
          <div class="flex gap-x-2">
            <img src="@/assets/logo-h.png" alt="" class="w-10 h-10 rounded-full">
            <p class="text-sm text-black max-w-2/3 p-2 bg-background rounded-lg rounded-tr-none">
              用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试
            </p>
          </div>
          <div class="flex gap-x-2 justify-end">
            <p class="text-sm max-w-2/3 p-2 bg-[#9370DB] text-white rounded-lg rounded-tr-none">
              测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试
            </p>
            <img src="@/assets/logo-h.png" alt="" class="w-10 h-10 rounded-full">
          </div>
          <div class="flex gap-x-2 justify-end">
            <p class="text-sm max-w-2/3 p-2 bg-[#9370DB] text-white rounded-lg rounded-tr-none">
              测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试
            </p>
            <img src="@/assets/logo-h.png" alt="" class="w-10 h-10 rounded-full">
          </div>
          <div class="flex gap-x-2 justify-end">
            <p class="text-sm max-w-2/3 p-2 bg-[#9370DB] text-white rounded-lg rounded-tr-none">
              测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试
            </p>
            <img src="@/assets/logo-h.png" alt="" class="w-10 h-10 rounded-full">
          </div>
          <div class="flex gap-x-2 justify-end">
            <p class="text-sm max-w-2/3 p-2 bg-[#9370DB] text-white rounded-lg rounded-tr-none">
              测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试用户名测试
            </p>
            <img src="@/assets/logo-h.png" alt="" class="w-10 h-10 rounded-full">
          </div>
        </div>
        <div class="h-[18%] flex flex-col justify-between border-t-2 border-[#ccc] pt-2">
          <Textarea
            v-model="message"
            type="text"
            placeholder="请输入消息内容"
            class="resize-none h-20 border-none shadow-none placeholder:text-[#999] placeholder:text-sm"
          />
          <div class="flex justify-end pb-4 pr-4 items-center">
            <span class="text-sm text-[#999]">{{ messageLen }}/500</span>
            <button class="bg-[#9370DB] text-white px-8 py-1 rounded-full ml-2 cursor-pointer">
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { XIcon } from 'lucide-vue-next'
import { ref, computed } from 'vue'

const message = ref('')
const messageLen = computed(() => message.value.length)
</script>
