<template>
  <div>
    <button @click="ocFormComRef?.open()">
      OC
    </button>
  </div>
  <OCFormCom ref="ocFormComRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OCFormCom from '@/components/business-com/OCFormCom.vue'
const ocFormComRef = ref<InstanceType<typeof OCFormCom>>()
</script>
