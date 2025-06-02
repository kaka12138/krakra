<template>
  <div ref="dropdownContainerRef" class="relative">
    <div class="absolute left-2 top-1/2 -translate-y-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="20"
        height="20"
        viewBox="0 0 14.99755859375 15.00018310546875"
        fill="none"
      >
        <path d="M1.26641 3.06802C3.28391 0.191019 7.15239 -0.815482 10.3639 0.705519C13.5754 2.22502 15.1684 5.81002 14.1139 9.14302C14.0494 9.34552 13.8739 9.50002 13.6639 9.54803C13.4524 9.59452 13.2349 9.53002 13.0864 9.37552C12.9394 9.21952 12.8869 9.00052 12.9514 8.79802C13.8334 5.99002 12.4459 2.97502 9.71138 1.75552C6.97839 0.536019 3.7489 1.49002 2.15891 3.98302C0.568916 6.47602 1.11191 9.73102 3.43391 11.5955C5.7559 13.46 9.13388 13.3505 11.3239 11.3405C11.4364 11.228 11.5909 11.168 11.7514 11.168C11.9104 11.168 12.0664 11.228 12.1789 11.3405L12.2389 11.438L14.8189 13.958C15.0604 14.2235 15.0544 14.5955 14.8189 14.828C14.5834 15.0575 14.2069 15.0575 13.9714 14.828L11.6839 12.593C8.88338 14.7545 4.8919 14.5925 2.28641 12.2105C-0.31758 9.82702 -0.752579 5.94352 1.26641 3.06802Z" fill="#957EAB" />
      </svg>
    </div>
    <Input
      v-model="searchValue"
      type="text"
      placeholder="搜索"
      class="w-full bg-background rounded-full px-8"
    />
    <div class="absolute right-2 top-1/2 -translate-y-1/2">
      <button class="bg-[#9370DB] text-white rounded-full text-sm px-3 py-1 cursor-pointer" @click="handleSearch">
        确认
      </button>
    </div>
    <div v-if="isDropdownVisible" class="px-6 py-2 absolute left-0 top-10 w-full h-100 overflow-y-auto max-h-100 bg-red z-9999 bg-background rounded-lg">
      <div class="truncate text-md text-[#B0B0B0] mb-2">
        "{{ searchValue }}"相关内容
      </div>
      <!-- 内容列表 -->
      <div class="space-y-2">
        <div
          v-for="item in contentList"
          :key="item"
          class="flex gap-x-1 items-center hover:bg-[#F5F5F5] rounded-lg"
          @click="handleChooseItem(item)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="18"
            height="18"
            viewBox="0 0 14.99755859375 15.00018310546875"
            fill="none"
          >
            <path d="M1.26641 3.06802C3.28391 0.191019 7.15239 -0.815482 10.3639 0.705519C13.5754 2.22502 15.1684 5.81002 14.1139 9.14302C14.0494 9.34552 13.8739 9.50002 13.6639 9.54803C13.4524 9.59452 13.2349 9.53002 13.0864 9.37552C12.9394 9.21952 12.8869 9.00052 12.9514 8.79802C13.8334 5.99002 12.4459 2.97502 9.71138 1.75552C6.97839 0.536019 3.7489 1.49002 2.15891 3.98302C0.568916 6.47602 1.11191 9.73102 3.43391 11.5955C5.7559 13.46 9.13388 13.3505 11.3239 11.3405C11.4364 11.228 11.5909 11.168 11.7514 11.168C11.9104 11.168 12.0664 11.228 12.1789 11.3405L12.2389 11.438L14.8189 13.958C15.0604 14.2235 15.0544 14.5955 14.8189 14.828C14.5834 15.0575 14.2069 15.0575 13.9714 14.828L11.6839 12.593C8.88338 14.7545 4.8919 14.5925 2.28641 12.2105C-0.31758 9.82702 -0.752579 5.94352 1.26641 3.06802Z" fill="#B0B0B0" />
          </svg>
          <div class="truncate text-md text-[#B0B0B0]">
            {{ item }}
          </div>
        </div>
      </div>
      <hr class="border-0.5 border-[#B0B0B0] my-2">
      <div class="truncate text-md text-[#B0B0B0] mb-2">
        "{{ searchValue }}"相关用户
      </div>
      <!-- 用户列表 -->
      <div class="space-y-2">
        <div
          v-for="item in userList"
          :key="item"
          class="flex gap-x-1 items-center hover:bg-[#F5F5F5] rounded-lg"
          @click="handleChooseItem(item)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="18"
            height="18"
            viewBox="0 0 14.99755859375 15.00018310546875"
            fill="none"
          >
            <path d="M1.26641 3.06802C3.28391 0.191019 7.15239 -0.815482 10.3639 0.705519C13.5754 2.22502 15.1684 5.81002 14.1139 9.14302C14.0494 9.34552 13.8739 9.50002 13.6639 9.54803C13.4524 9.59452 13.2349 9.53002 13.0864 9.37552C12.9394 9.21952 12.8869 9.00052 12.9514 8.79802C13.8334 5.99002 12.4459 2.97502 9.71138 1.75552C6.97839 0.536019 3.7489 1.49002 2.15891 3.98302C0.568916 6.47602 1.11191 9.73102 3.43391 11.5955C5.7559 13.46 9.13388 13.3505 11.3239 11.3405C11.4364 11.228 11.5909 11.168 11.7514 11.168C11.9104 11.168 12.0664 11.228 12.1789 11.3405L12.2389 11.438L14.8189 13.958C15.0604 14.2235 15.0544 14.5955 14.8189 14.828C14.5834 15.0575 14.2069 15.0575 13.9714 14.828L11.6839 12.593C8.88338 14.7545 4.8919 14.5925 2.28641 12.2105C-0.31758 9.82702 -0.752579 5.94352 1.26641 3.06802Z" fill="#B0B0B0" />
          </svg>
          <div class="truncate text-md text-[#B0B0B0]">
            {{ item }}
          </div>
        </div>
        <div />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Input } from '@/components/ui/input'
import { ref, watch, onBeforeUnmount } from 'vue'
import { searchApi } from '@/api/work'
const searchValue = ref('')
const contentList = ref([])
const userList = ref([])
const dropdownContainerRef = ref(null)
const isDropdownVisible = ref(false)

const handleClickOutside = (event) => {
  // Check if the click is outside the dropdown container
  if (dropdownContainerRef.value && !dropdownContainerRef.value.contains(event.target)) {
    isDropdownVisible.value = false
  }
};

const handleChooseItem = (item) => {
  isDropdownVisible.value = false
}

const handleSearch = () => {
  if (!searchValue.value) {
    toast.error('请输入搜索内容')
    return
  }
  searchApi({
    q: searchValue.value,
    offset: 0,
    limit: 10,
  }).then((res) => {
    console.log(res)
    // contentList.value = res.data.contentList
    // userList.value = res.data.userList
    isDropdownVisible.value = true
  })
}

watch(isDropdownVisible, (newValue) => {
  if (newValue) {
    // Using 'mousedown' is often preferred over 'click' for "click outside"
    // as it fires before blur events, which can sometimes interfere.
    document.addEventListener('mousedown', handleClickOutside);
  } else {
    document.removeEventListener('mousedown', handleClickOutside);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
