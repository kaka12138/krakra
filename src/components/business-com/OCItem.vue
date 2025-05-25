<template>
  <div class="flex items-center bg-background w-[600px] h-[180px] rounded-3xl p-4">
    <!-- 左侧头像 -->
    <div class="flex-shrink-0 w-[120px] h-[120px] rounded-full overflow-hidden">
      <img src="..." alt="头像" class="w-full h-full object-cover">
    </div>

    <!-- 中间文本内容 -->
    <div class="flex flex-col ml-6 flex-grow">
      <h2 class="text-2xl font-bold mb-2">
        桃桃子
      </h2>
      <p class="text-gray-500 text-lg">
        当"好猫"在静定谧的纸箱里
      </p>
      <p class="text-gray-500 text-lg">
        进行光合午休时墨动
      </p>
    </div>

    <!-- 右侧图片 -->
    <div class="flex flex-col items-end ml-4">
      <div class="w-[120px] h-[120px] rounded-xl overflow-hidden">
        <img src="..." alt="世界观名称" class="w-full h-full object-cover">
      </div>
      <p class="text-gray-500 mt-2 text-lg">
        世界观名称
      </p>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑可以在这里添加
</script>

<style scoped>
/* 额外样式可以在这里添加 */
</style>
