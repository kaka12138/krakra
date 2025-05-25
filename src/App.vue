
<template>
  <Toaster />
  <div class="app-container">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

