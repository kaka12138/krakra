
<template>
  <Toaster position="top-right" />
  <div class="app-container">
    <main>
      <!-- 搜索 -->
      <div><SearchCom /></div>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
import SearchCom from '@/components/business-com/SearchCom.vue'
</script>

