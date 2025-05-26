<template>
  <div class="flex items-center justify-between bg-white rounded-full py-4 px-6 shadow-sm">
    <div>
      <h3 class="text-[#8a70e8] text-3xl font-medium">
        {{ tag.name }}
      </h3>
      <div class="text-gray-400 text-xl mt-1">
        {{ formatCount(tag.articleCount) }}篇内容·{{ formatCount(tag.viewCount) }}浏览
      </div>
    </div>
    <div class="bg-[#ffe86e] rounded-full w-14 h-14 flex items-center justify-center">
      <div class="w-8 h-8 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-full h-full text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v14m-7-7h14"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Tag {
  id: string | number;
  name: string;
  articleCount: number;
  viewCount: number;
}

defineProps<{
  tag: Tag;
}>();

/**
 * 格式化数字为带单位的字符串
 * 例如：10000 -> 10万
 */
const formatCount = (count: number): string => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万';
  }
  return count.toString();
};
</script>
