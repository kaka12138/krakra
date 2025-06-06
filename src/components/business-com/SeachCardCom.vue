<template>
  <div>
    <label class="block text-sm font-medium text-[#9370DB]">{{ componentField.label }}</label>
    <div class="flex items-center gap-x-2">
      <span>
        已选卡片:
      </span>
      <div v-if="currentCard" class="flex items-center gap-x-2">
        <span>{{ currentCard.name }}</span>
        <XIcon class="w-5 h-5 cursor-pointer" color="#9370DB" @click="handleRemoveItem" />
      </div>
    </div>
    <SearchInputCom ref="searchInputRef" :search-type="2">
      <template #dropdown="{ searchRes }">
        <div>
          <div v-for="item in searchRes" :key="item.id" @click="handleChooseItem(item)" />
        </div>
      </template>
    </SearchInputCom>
  </div>
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue'
import { XIcon } from 'lucide-vue-next'
import SearchInputCom from './SearchInputCom.vue'

const props = defineProps({
  modelValue: [String, Number],
})

const emit = defineEmits(['update:modelValue'])
const componentField = useAttrs()

const searchInputRef = ref()
const currentCard = ref()

const handleChooseItem = (item) => {
  currentCard.value = item
  searchInputRef.value.closeDropdown()
}

const handleRemoveItem = () => {
  currentCard.value = null
}
</script>
