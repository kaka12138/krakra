
<template>
  <Toaster position="top-right" />

  <main class="app-container bg-[#F0F0F0] w-full h-screen min-h-screen">
    <!-- 搜索 -->
    <div><SearchCom /></div>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import SearchCom from '@/components/business-com/SearchCom.vue'
</script>

