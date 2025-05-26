<template>
  <div class="w-160 bg-gray-200 h-200">
    <HotTagItem :tag="hotTags" />
  </div>
  <UserInfoCom />
  <div class="w-200 bg-background h-200">
    <OCItem />
    <AUItem />
  </div>
  <div class="w-160 bg-background h-200">
    <GUAShiItem :images="displayImages" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserInfoCom from '@/components/business-com/UserInfoCom.vue'
import OCItem from '@/components/business-com/OCItem.vue'
import AUItem from '@/components/business-com/AUItem.vue'
import GUAShiItem from '@/components/business-com/GUAShiItem.vue'
import HotTagItem from '@/components/business-com/HotTagItem.vue'
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
const hotTags = ref(
  {
    name: '标签1',
    articleCount: 100,
    viewCount: 100,
  })
</script>


