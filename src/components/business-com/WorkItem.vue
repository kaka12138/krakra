<template>
  <div
    v-if="artwork"
    class="w-full max-w-sm overflow-hidden"
    @click="handleClick"
  >
    <div
      class="relative rounded-lg overflow-hidden"
      :class="[isCreateCollectionMode ? 'border-2' : 'border-0', isCreateCollectionMode && artwork.isSelected ? 'border-[#926DDE] z-9999' : ' border-[#ccc]']"
      @click="handleSelectCollection"
    >
      <img
        :src="artwork.coverFileId"
        alt="Artwork Image"
        class="w-full h-auto"
        :class="[isCreateCollectionMode && artwork.isSelected ? 'brightness-125' : '', viewNsfw ? 'blur-sm' : '']"
      >
      <div v-if="isCreateCollectionMode && artwork.isSelected" class="absolute top-1 left-1 p-0.5 bg-[#926DDE] rounded-full flex items-center justify-center">
        <CheckIcon :size="18" color="white" />
      </div>
      <!-- 18+ -->
      <div v-if="viewNsfw" class="w-full h-full absolute top-0 left-0 z-88 flex flex-col items-center justify-center gap-y-1" @click.stop="() => {}">
        <img src="@/assets/18+.png" alt="18+" class="w-16 h-16">
        <p class="text-[#ccc] text-lg font-medium">
          敏感内容
        </p>
        <p class="text-[#ccc] text-sm">
          这个作品包含敏感内容
        </p>
        <button class="px-3 py-1 text-xs rounded-full bg-[#ccc] mix-blend-overlay text-black cursor-pointer" @click.stop="viewNsfw =false">
          查 看
        </button>
      </div>
    </div>
    <!-- class="w-full h-auto aspect-[3/4] object-cover" -->
    <div>
      <h2 class="text-lg font-semibold text-gray-800 mb-1">
        {{ artwork.name }}
      </h2>
      <div class="flex items-center text-sm text-gray-500 mb-3 gap-x-1">
        <span>作品ID: {{ artwork.creatorId }}</span>
        <CopyIcon :size="16" />
        <span>{{ artwork.extendCount ? `已衍生${artwork.extendCount}次创作` : '欢迎参与创作！' }}</span>
      </div>

      <!-- chain -->
      <div class="flex" @click.stop="handleClickChain">
        <!-- zero -->
        <div class="flex flex-col items-center justify-center">
          <img class="w-10 h-10 rounded-full border-2 border-[#FFD700]" :src="chainInfo.zeroNode.coverFileId" alt="chain">
          <div class="text-xs bg-[#FFD700] text-[#9370DB] px-1 py-0.5 rounded-full mt-1 scale-90">
            零号位
          </div>
        </div>
        <!-- other -->
        <div class="flex gap-x-1">
          <div v-for="item in chainInfo.middleNodes.slice(0, 2)" :key="item.id" class="h-10 flex items-center">
            <img class="w-8 h-8 rounded-full opacity-50" :src="item.coverFileId" alt="chain">
          </div>
          <div v-if="artwork.chainData.length > 5" class="h-10 flex items-center gap-x-0.5">
            <div v-for="i in 3" :key="i" class="w-1.5 h-1.5 bg-[#ccc] rounded-full opacity-50" />
          </div>
          <div v-if="chainInfo.middleNodes.length >2 " class="h-10 flex items-center">
            <img class="w-8 h-8 rounded-full opacity-50" :src="chainInfo.middleNodes[chainInfo.middleNodes.length - 1].coverFileId" alt="chain">
          </div>
        </div>
        <!-- current -->
        <div v-if="chainInfo.currentNode.coverFileId" class="flex flex-col items-center justify-center">
          <img class="w-10 h-10 rounded-full border-2 border-[#FFD700]" :src="chainInfo.currentNode.coverFileId" alt="chain">
          <div class="text-xs bg-[#9370DB] text-white px-1 py-0.5 rounded-full mt-1 scale-90">
            当前创作
          </div>
        </div>
        <!-- join -->
        <!-- TODO: 使用extendCount判断 -->
        <div v-if="artwork.chainData.length === 1" class="flex flex-col items-center justify-center">
          <div class="w-10 h-10 rounded-full bg-[#9370DB] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="9.005859375"
              height="8.94427490234375"
              viewBox="0 0 9.005859375 8.94427490234375"
              fill="none"
              class="w-4 h-4"
            >
              <path d="M4.46822 0.0625711C4.37512 0.0218654 4.27394 0 4.17 0C3.74767 0 3.4 0.34794 3.4 0.77L3.4 3.17L0.76 3.17C0.557581 3.17 0.362443 3.24618 0.22 3.39C0.07839 3.53382 0 3.72743 0 3.93C0 4.26449 0.220096 4.55741 0.52233 4.66054C0.605505 4.69248 0.695635 4.71 0.7898 4.71L7.5998 4.71C8.0158 4.71 8.3498 4.35595 8.3498 3.94C8.3498 3.73743 8.27207 3.54382 8.1298 3.4C8.0575 3.32648 7.97083 3.27063 7.87637 3.2336C7.77718 3.19156 7.66891 3.17 7.56 3.17L4.9598 3.17L4.9598 0.78C4.9598 0.455063 4.75484 0.174973 4.46822 0.0625711ZM4.2002 5.7901C4.40384 5.7901 4.60112 5.88085 4.7402 6.0301C4.87912 6.1791 4.9402 6.37635 4.9402 6.5801L4.9402 7.5501C4.9402 7.75335 4.84861 7.9416 4.7002 8.0801C4.55194 8.21885 4.35293 8.2901 4.1502 8.2901C3.73006 8.2711 3.4102 7.92135 3.4102 7.5001L3.4102 6.5301C3.4102 6.32685 3.50179 6.1386 3.6502 6.0001C3.79846 5.86135 3.99748 5.7901 4.2002 5.7901Z" fill-rule="evenodd" fill="#F5F5F5" />
            </svg>
          </div>
          <div class="text-xs bg-[#9370DB] text-white px-1 py-0.5 rounded-full mt-1 scale-90">
            参与创作
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {CopyIcon, CheckIcon } from 'lucide-vue-next';
import { useWorkDetail } from '@/hooks/useWorkDetial';


// TODO:不能在这个组件重复导入路由，跨app路由会警告，将方法放到该组件的父级
// const router = useRouter()

const props = defineProps({
  isCreateCollectionMode: {
    type: Boolean,
    default: false,
  },
  artwork: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['handleSelectCollection', 'addLike', 'clickChain'])

// TODO:后端判断
const viewNsfw = ref(props.artwork.isNsfw)

const chainInfo = computed(() => {
  const { chainData } = props.artwork
  if(!chainData) return {}
  const zeroNode = chainData[0] || {}
  const middleNodes = chainData.slice(1, -1)
  console.log('middleNodes', middleNodes)
  const currentNode = chainData.length > 1 ? chainData[chainData.length - 1] : {}
  return {
    zeroNode,
    currentNode,
    middleNodes,
  }
})

const { open } = useWorkDetail()



const handleSelectCollection = (e: Event) => {
  if (props.isCreateCollectionMode) {
    e.stopPropagation()
    emit('handleSelectCollection', props.artwork)
  }
}

const handleClick = () => {
  console.log('handleClick')
  if (!props.artwork.id) return
  open(props.artwork.id)
}

const handleClickChain = () => {
  // router.push(`/chaindetail?id=${chainInfo.value.highlightNodes}`)
  emit('clickChain', chainInfo.value.highlightNodes)
}

// const toMyWorkPage = (id: string | number) => {}
</script>
