<template>
  <div class="py-20 px-15">
    <h1 class="px-8 py-3 text-xl font-bold bg-[#9370DB] text-white rounded-full my-8 inline-block">
      卡 片 搜 索 结 果
    </h1>
    <div class="flex flex-wrap items-center gap-x-4 bg-[#fff] py-4 px-6 max-h-60 rounded-2xl overflow-y-auto">
      <div v-for="item in 10" :key="item" class="w-[32.5%] max-w-[32.5%] mb-4">
        <CardItem />
      </div>
    </div>
    <h1 class="px-8 py-3 text-xl font-bold bg-[#9370DB] text-white rounded-full my-8 inline-block">
      内 容 搜 索 结 果
    </h1>
  </div>
</template>
<script setup lang="ts">
import CardItem from '@/components/business-com/CardItem.vue';
</script>
