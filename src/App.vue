
<template>
  <Toaster position="top-right" />
  <main class="h-full bg-[#F0F0F0] box-border">
    <div class="fixed top-0 left-0 right-0 z-999">
      <SearchCom />
    </div>
    <router-view />
  </main>
  <BallMenuCom />
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import SearchCom from '@/components/business-com/SearchCom.vue'
import BallMenuCom from '@/components/business-com/BallMenuCom.vue'
</script>


