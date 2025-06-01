<template>
  <div
    :draggable="userInfo.userId ? true : false"
    class="fixed bottom-10 left-10"
    @dragover="() => {}"
    @dragenter="() => {}"
    @dragleave="() => {}"
    @drop="() => {}"
  >
    <div class="relative flex items-center">
      <button
        :class="[
          'w-16 h-16 rounded-full flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ease-in-out',
          isMenuOpen
            ? 'bg-gradient-to-br from-purple-500 to-indigo-600 focus:ring-indigo-400'
            : 'bg-gradient-to-br from-purple-400 to-purple-600 focus:ring-purple-400'
        ]"
        aria-label="Toggle menu"
        :aria-expanded="isMenuOpen.toString()"
        @click="toggleMenu"
      >
        <transition name="icon-fade" mode="out-in">
          <svg
            v-if="!isMenuOpen"
            key="plus"
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
          </svg>
          <svg
            v-else
            key="divide"
            class="w-8 h-8 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="7.5" r="1.8" />
            <rect
              x="5"
              y="11"
              width="14"
              height="2.5"
              rx="1"
            />
            <circle cx="12" cy="16.5" r="1.8" />
          </svg>
        </transition>
      </button>

      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 transform scale-90 -translate-x-2"
        enter-to-class="opacity-100 transform scale-100 translate-x-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 transform scale-100 translate-x-0"
        leave-to-class="opacity-0 transform scale-90 -translate-x-2"
      >
        <div
          v-if="isMenuOpen"
          class="absolute left-full bottom-0 ml-3 origin-left bg-white rounded-2xl shadow-xl p-3.5 space-y-2.5 z-10 w-max"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <button
            v-for="item in menuItems"
            :key="item.text"
            role="menuitem"
            class="cursor-pointer block w-full text-center px-6 py-1 text-sm font-medium text-[#C0B1DE] border-2 border-[#C0B1DE] rounded-full"
            @click="handleItemClick(item)"
          >
            {{ item.text }}
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router';
import { useGenForm } from '@/hooks/useGenForm';

const { open: createWork } = useGenForm('work_form');
const { open: createGuaShi } = useGenForm('guashi_form');


const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const isMenuOpen = ref(false);
const router = useRouter();

const menuItems = ref([
  { id: 1, text: '待扩清单', path: 'myrecreation' },
  { id: 2, text: '发布池塘', path: '' },
  { id: 3, text: '发布呱市', path: '' },
]);

const toggleMenu = () => {
  if (!userInfo.value.userId) {
    toast.error('请先登录');
    return;
  }
  isMenuOpen.value = !isMenuOpen.value;
};

const handleItemClick = (item) => {
  if (item.path) {
    router.push(`/about/${userInfo.value.userId}/${item.path}`);
  } else if (item.id === 2) {
    createWork();
  } else if (item.id === 3) {
    createGuaShi();
  }
  isMenuOpen.value = false; // Optionally close menu on item click
};

</script>

