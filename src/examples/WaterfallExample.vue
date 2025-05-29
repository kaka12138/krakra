<script setup>
import { ref, onMounted } from 'vue';
import WaterFall from '../components/business-com/WaterFall.vue';

// 模拟数据
const items = ref([]);
const page = ref(1);
const loading = ref(false);

// 生成随机高度的图片数据
const generateItems = (count = 10) => {
  const newItems = [];
  for (let i = 0; i < count; i++) {
    const id = items.value.length + i + 1;
    const height = Math.floor(Math.random() * 200) + 200; // 200-400px 随机高度
    newItems.push({
      id,
      title: `项目 ${id}`,
      description: `这是第 ${id} 个瀑布流项目的描述文本`,
      image: `https://picsum.photos/400/${height}?random=${id}`,
      height
    });
  }
  return newItems;
};

// 加载更多数据
const loadMore = async () => {
  if (loading.value) return;
  
  loading.value = true;
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newItems = generateItems();
  items.value = [...items.value, ...newItems];
  
  page.value++;
  loading.value = false;
};

// 改变列数
const columns = ref(2);
const changeColumns = (num) => {
  columns.value = num;
};

onMounted(() => {
  // 初始加载
  loadMore();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">瀑布流组件示例</h1>
    
    <div class="mb-6">
      <p class="mb-2 font-medium">选择列数：</p>
      <div class="flex gap-2">
        <button 
          v-for="col in [2, 3, 4]" 
          :key="col"
          @click="changeColumns(col)"
          class="px-4 py-2 rounded"
          :class="columns === col ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'"
        >
          {{ col }} 列
        </button>
      </div>
    </div>
    
    <WaterFall
      :list="items"
      :columns="columns"
      :column-gap="16"
      :row-gap="16"
      :infinite-scroll="true"
      @load-more="loadMore"
    >
      <template #default="{ item }">
        <div class="rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div class="w-full">
            <img 
              :src="item.image" 
              :alt="item.title" 
              class="w-full object-cover"
              :style="{ height: `${item.height}px` }"
              loading="lazy"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-900">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
          </div>
        </div>
      </template>
    </WaterFall>
  </div>
</template> 