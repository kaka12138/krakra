<template>
  <div class="rounded-lg bg-background p-4 w-90">
    <div class="flex justify-between">
      <span class="text-md font-bold text-[#9470DB]">当前账户</span>
      <span class="text-sm text-[#9470DB]">1234567890</span>
    </div>
    <AccountItem />
    <div class="flex justify-between">
      <span class="text-md font-bold text-[#9470DB]">OC</span>
    </div>
    <div class="space-y-2 h-60 overflow-y-auto">
      <AccountItem />
      <AccountItem />
      <AccountItem />
      <AccountItem />
      <AccountItem />
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountItem from './AccountItem.vue'

</script>
