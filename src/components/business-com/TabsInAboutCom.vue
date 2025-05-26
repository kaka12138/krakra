<template>
  <div class="bg-gray-100 rounded-t-lg p-1">
    <div class="flex space-x-1">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'py-2 px-4 text-sm font-medium focus:outline-none transition-colors duration-150 ease-in-out rounded-t-xl',
          activeTab === tab.id
            ? 'bg-white text-purple-600 shadow-sm'
            : 'text-slate-400 hover:text-purple-500 hover:bg-gray-200',
        ]"
        @click="selectTab(tab.id)"
      >
        {{ tab.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义 props，允许父组件传入自定义的标签和默认选中的标签
const props = defineProps({
  initialTabs: {
    type: Array,
    default: () => [
      { id: 'pond', name: 'Aminuos的池塘' },
      { id: 'market', name: '吧市' },
      { id: 'commission', name: '委托' },
      { id: 'oc', name: 'OC' },
      { id: 'artgroup', name: '画联' },
      { id: 'draft', name: '约草' },
    ],
  },
  initialActiveTab: {
    type: String,
    default: 'pond', // 默认选中 "Aminuos的池塘"
  },
});

// 定义事件，当标签页切换时通知父组件
const emit = defineEmits(['tab-change']);

// 响应式变量，存储所有标签页和当前选中的标签页ID
const tabs = ref(props.initialTabs);
const activeTab = ref(props.initialActiveTab);

// 方法：选中标签页
const selectTab = (tabId) => {
  activeTab.value = tabId;
  emit('tab-change', tabId); // 触发事件，传递当前选中的 tabId
};
</script>

<style scoped>
/* 通常不需要额外的 CSS，Tailwind 已足够。但如果需要微调，可在此添加。*/
button {
  flex-shrink: 0; /* 防止标签文字过长时按钮被过度压缩 */
}
</style>
