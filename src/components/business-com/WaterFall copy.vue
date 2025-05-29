<template>
  <div class="grid" :style="gridContainerStyle">
    <div
      v-for="(columnItems, columnIndex) in distributedItems"
      :key="`column-${columnIndex}`"
      class="flex flex-col"
      :style="{ gap: `${gap / 4}rem` }"
    >
      <div
        v-for="item in columnItems"
        :key="item.id"
        class=" rounded-lg shadow-md overflow-hidden break-inside-avoid-column"
      >
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, toRefs, watch } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Number,
    default: 5,
    validator: (val) => val > 0,
  },
  gap: { // Tailwind spacing unit (e.g., 4 = 1rem, 6 = 1.5rem)
    type: Number,
    default: 4, // 默认 1rem
  },
});

const { items, columns, gap } = toRefs(props);

// 响应式地存储带有实际或估算高度的 items
// 在实际场景中，图片加载后，其高度可能会更新
const processedItems = ref([]);



watch(
  items,
  (newItems) => {
    processedItems.value = newItems.map(item => ({
      ...item,
      _displayHeight: item.height,
    }));
  },
  { immediate: true, deep: true },
);


const gridContainerStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columns.value}, minmax(0, 1fr))`, // `minmax(0, 1fr)` 防止内容溢出
  gap: `${gap.value / 4}rem`,
}));

const distributedItems = computed(() => {
  if (!processedItems.value.length || columns.value <= 0) {
    return [];
  }

  const newDistributedItems = Array.from({ length: columns.value }, () => []);
  const columnHeights = Array(columns.value).fill(0);

  processedItems.value.forEach((item) => {
    // 找到当前高度最小的列
    let shortestColumnIndex = 0;
    for (let i = 1; i < columns.value; i++) {
      if (columnHeights[i] < columnHeights[shortestColumnIndex]) {
        shortestColumnIndex = i;
      }
    }

    // 将 item 放入该列
    newDistributedItems[shortestColumnIndex].push(item);
    // 更新该列的高度 (使用 item._displayHeight)
    columnHeights[shortestColumnIndex] += item._displayHeight;
  });
  console.log('111', newDistributedItems)
  return newDistributedItems;
});


</script>

  <style scoped>
  /* Tailwind CSS v4 不需要显式的 @tailwind 指令在 style 标签中 */
  /* `break-inside-avoid-column` 是一个标准的 CSS 属性，有助于防止元素在打印或多列布局中跨列断开。
     虽然我们这里是JS控制列内容，但加上也无妨，某些边缘情况可能有益。
     对于纯JS控制的Grid布局，这个属性可能不是严格必需的。*/
  .break-inside-avoid-column {
    break-inside: avoid-column;
    -webkit-column-break-inside: avoid; /* Safari & Chrome old versions */
            page-break-inside: avoid; /* Firefox old versions */
  }
  </style>
