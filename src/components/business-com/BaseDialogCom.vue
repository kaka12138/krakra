<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

defineProps({
  classArr: Array,
})
</script>

<template>
  <Dialog>
    <DialogContent class="p-6 " :class="classArr">
      <DialogHeader>
        <DialogTitle />
        <DialogDescription />
      </DialogHeader>
      <slot />
    </DialogContent>
  </Dialog>
</template>
