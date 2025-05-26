<template>
  <div class="w-full flex justify-between bg-[#F0F0F0]">
    <div class="min-100 w-100 mr-10">
      <HotCardList />
    </div>
    <div class="flex-1 py-10">
      <div class="flex flex-col gap-10 overflow-y-auto h-176">
        <GUAShiItem :images="displayImages" />
        <GUAShiItem :images="displayImages" />
        <GUAShiItem :images="displayImages" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HotCardList from '@/components/business-com/HotCardList.vue'
import GUAShiItem from '@/components/business-com/GUAShiItem.vue'
const displayImages = ref([
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
  'https://picsum.photos/200/300',
])
</script>
