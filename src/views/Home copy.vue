<template>
  <div>
    <button @click="ocFormComRef?.open()">
      OC
    </button>
    <button @click="auFormComRef?.open()">
      AU
    </button>
    <button @click="workFormComRef?.open()">
      WORK
    </button>
    <button @click="guashiFormComRef?.open()">
      GUASHI
    </button>
  </div>
  <GenFormCom ref="ocFormComRef" form-type="oc_form" />
  <GenFormCom ref="auFormComRef" form-type="au_form" />
  <GenFormCom ref="workFormComRef" form-type="work_form" />
  <GenFormCom ref="guashiFormComRef" form-type="guashi_form" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GenFormCom from '@/components/business-com/GenFormCom.vue'
const ocFormComRef = ref<InstanceType<typeof GenFormCom>>()
const auFormComRef = ref<InstanceType<typeof GenFormCom>>()
const workFormComRef = ref<InstanceType<typeof GenFormCom>>()
const guashiFormComRef = ref<InstanceType<typeof GenFormCom>>()
</script>
