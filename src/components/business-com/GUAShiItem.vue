<template>
  <div class="w-full bg-white rounded-xl p-4">
    <!-- 用户信息区域 -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img :src="avatar" alt="用户头像" class="w-full h-full object-cover">
        </div>
        <div>
          <div class="flex items-center gap-1">
            <span class="font-medium text-sm">{{ username }}</span>
            <div v-if="isVerified" class="w-4 h-4 rounded-full bg-purple-500" />
            <div class="w-4 h-4 rounded-full bg-yellow-400" />
          </div>
          <div class="text-xs text-gray-500">
            {{ timeAgo }} · {{ description }}
          </div>
        </div>
      </div>
      <button class="text-sm px-3 py-1 rounded-full border border-yellow-400 text-yellow-500">
        + 关注
      </button>
    </div>

    <!-- 内容区域 -->
    <div class="mb-3">
      <p class="text-sm text-gray-800 mb-2">
        {{ content }}
      </p>
      <p class="text-sm text-gray-800">
        {{ content }}
      </p>
    </div>

    <!-- 标签区域 -->
    <div class="flex gap-2 mb-3">
      <span v-for="(tag, index) in tags" :key="index" class="text-xs text-purple-500">#{{ tag }}</span>
      <span class="ml-auto text-xs text-gray-500">收回</span>
    </div>

    <!-- 图片网格 -->
    <div class="grid grid-cols-3 gap-1 mb-3">
      <div v-for="(image, index) in displayImages" :key="index" class="relative aspect-square rounded-md overflow-hidden">
        <img :src="image" class="w-full h-full object-cover">
      </div>
      <div v-if="hasMoreImages" class="relative aspect-square rounded-md overflow-hidden">
        <img :src="images[8]" class="w-full h-full object-cover brightness-50">
        <div class="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
          +{{ images.length - 8 }}
        </div>
      </div>
    </div>

    <!-- 互动区域 -->
    <div class="flex items-center justify-between text-gray-500">
      <div class="flex items-center gap-1">
        <MessageCircleMoreIcon />
        <span class="text-sm">{{ likes }}</span>
      </div>
      <div class="flex items-center gap-1">
        <ExternalLinkIcon />
        <span class="text-sm">{{ comments }}</span>
      </div>
      <div class="flex items-center gap-1">
        <ThumbsUpIcon />
        <span class="text-sm">{{ shares }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { MessageCircleMoreIcon, ExternalLinkIcon, ThumbsUpIcon } from 'lucide-vue-next'

const props = defineProps({
  avatar: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '豪毫不咬人',
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  timeAgo: {
    type: String,
    default: '6分钟前',
  },
  description: {
    type: String,
    default: '描述描述描述描述描述描述描述描述',
  },
  content: {
    type: String,
    default: '当"好猫"在薛定谔的纸箱里进行光合午休时，它的胡须正发射着概率波纹。而"不好猫"正用反物质爪尖在平行宇宙间刻写涂鸦，尾巴甩出的墨汁凝结成克莱因瓶状的毛线球。每当黄昏的时刻，它们便在事件视界边缘跳起双人探戈，摇动时空腰泛起橘色涟漪。',
  },
  tags: {
    type: Array,
    default: () => ['tag', 'tag'],
  },
  images: {
    type: Array,
    default: () => [],
  },
  likes: {
    type: [Number, String],
    default: '2333',
  },
  comments: {
    type: [Number, String],
    default: '2333',
  },
  shares: {
    type: [Number, String],
    default: '2333',
  },
});

// 计算属性：显示的图片（最多9张，超过9张则最后一张显示+N）
const displayImages = computed(() => {
  if (props.images.length <= 8) {
    return props.images;
  }
  return props.images.slice(0, 8);
});

// 是否有更多图片
const hasMoreImages = computed(() => {
  return props.images.length > 8;
});
</script>
