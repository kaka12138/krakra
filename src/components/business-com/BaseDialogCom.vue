<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { VisuallyHidden } from 'reka-ui'

defineProps({
  classArr: Array,
})
</script>

<template>
  <Dialog>
    <DialogContent class="p-6 " :class="classArr">
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
      </VisuallyHidden>
      <slot name="header" />
      <slot />
    </DialogContent>
  </Dialog>
</template>
