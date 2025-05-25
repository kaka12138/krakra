<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogContent class="w-175 grid-rows-[auto_minmax(0,1fr)_auto] p-6 max-h-[90dvh]">
      <DialogHeader>
        <DialogTitle />
        <DialogDescription />
      </DialogHeader>
      <div class="overflow-y-auto">
        <slot />
      </div>
    </DialogContent>
  </Dialog>
</template>
