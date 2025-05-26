<template>
  <div class="w-full flex p-6 rounded-xl bg-[#F7F7F7]">
    <img :src="userInfo.avatarUrl" class="min-w-30 max-w-30 w-30 h-30 rounded-full object-cover">
    <div class="flex-1 flex flex-col justify-center mx-4">
      <p class="line-clamp-1 text-black text-2xl">
        桃子桃子桃子桃子桃子桃子桃子
      </p>
      <p class="line-clamp-3 text-[#999999] text-base">
        当"好猫"在薛定谔的纸箱里进行光合午休时墨动当"好猫"在薛定谔的纸箱里进行光合午休时墨动当"好猫"在薛定谔的纸箱里进行光合午休时墨动当"好猫"在薛定谔的纸箱里进行光合午休时墨动当"好猫"在薛定谔的纸箱里进行光合午休时墨动当"好猫"在薛定谔的纸箱里进行光合午休时墨动当"好猫"在薛定谔的纸箱里进行光合午休时墨动
      </p>
    </div>
    <div>
      <div class="border-l-1 p-2">
        <img :src="userInfo.avatarUrl" class="min-w-22 max-w-22 w-22 h-22 rounded-xl object-cover">
        <p class="line-clamp-1 text-[#999999] text-center text-base">
          世界观名称
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
</script>
