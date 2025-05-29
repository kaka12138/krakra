<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps({
  // 列数
  columns: {
    type: Number,
    default: 2,
  },
  // 列间距
  columnGap: {
    type: Number,
    default: 20,
  },
  // 行间距
  rowGap: {
    type: Number,
    default: 20,
  },
  // 数据列表
  list: {
    type: Array,
    default: () => [],
  },
  // 是否需要无限滚动
  infiniteScroll: {
    type: Boolean,
    default: false,
  },
  // 距离底部多少像素触发加载更多
  threshold: {
    type: Number,
    default: 200,
  },
});

const emit = defineEmits(['loadMore']);

// 瀑布流容器元素
const waterfall = ref(null);
// 各列高度
const columnHeights = ref([]);
// 各列元素
const columnItems = ref([]);
// 是否正在加载
const loading = ref(false);

// 初始化列数据
const initColumns = () => {
  columnHeights.value = new Array(props.columns).fill(0);
  columnItems.value = new Array(props.columns).fill(null).map(() => []);
};

// 布局瀑布流
const layout = () => {
  if (!props.list.length) return;

  initColumns();

  props.list.forEach((item) => {
    // debugger
    // 找出高度最小的列
    const minHeightIndex = columnHeights.value.indexOf(Math.min(...columnHeights.value));
    console.log(minHeightIndex)
    // 将元素添加到高度最小的列
    columnItems.value[minHeightIndex].push(item);
    // 更新列高度
    columnHeights.value[minHeightIndex] += item.height || 0;
  });
};

// 处理滚动事件
const handleScroll = () => {
  if (!props.infiniteScroll || loading.value) return;

  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;

  if (scrollHeight - scrollTop - clientHeight < props.threshold) {
    loading.value = true;
    emit('loadMore');
  }
};

// 监听数据变化
watch(() => props.list, () => {
  nextTick(() => {
    layout();
    loading.value = false;
  });
}, { deep: true });

// 监听列数变化
watch(() => props.columns, () => {
  nextTick(layout);
});

onMounted(() => {
  layout();
  if (props.infiniteScroll) {
    window.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (props.infiniteScroll) {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <div
    ref="waterfall"
    class="relative w-full"
  >
    <div class="flex w-full">
      <div
        v-for="(column, columnIndex) in columnItems"
        :key="columnIndex"
        class="flex-1"
        :style="{
          marginRight: columnIndex < props.columns - 1 ? `${props.columnGap}px` : '0'
        }"
      >
        <div
          v-for="(item, itemIndex) in column"
          :key="item.id || itemIndex"
          class="w-full overflow-hidden"
          :style="{ marginBottom: `${props.rowGap}px` }"
        >
          <slot :item="item" :column-index="columnIndex" :item-index="itemIndex" />
        </div>
      </div>
    </div>

    <!-- 加载更多提示 -->
    <div v-if="props.infiniteScroll && loading" class="w-full py-4 text-center">
      <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-blue-600 motion-reduce:animate-[spin_1.5s_linear_infinite]" />
    </div>
  </div>
</template>
