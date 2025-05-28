
<template>
  <Toaster position="top-right" />

  <main class="app-container bg-[#F0F0F0] w-full h-screen min-h-screen">
    <div class="fixed top-0 left-0 right-0 z-999">
      <SearchCom />
    </div>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import SearchCom from '@/components/business-com/SearchCom.vue'
</script>

