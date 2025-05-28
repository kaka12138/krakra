<template>
  <div class="p-10">
    <div class="container mx-auto max-w-6xl">
      <div class="flex">
        <div class="md:w-1/3 bg-gradient-to-br from-blue-400 to-purple-500 relative flex flex-col items-center justify-center">
          <div class="mt-10 md:mt-0">
            <img :src="characterData.imageUrl" alt="Character" class="max-w-xs w-full h-auto object-contain drop-shadow-2xl">
          </div>
        </div>

        <div class="w-2/3 p-6 space-y-6">
          <div>
            <h1 class="text-3xl font-bold text-[#9370DB]">
              {{ characterData.name }}
            </h1>
          </div>

          <div>
            <h2 class="text-xl text-[#9370DB] font-bold mb-2">
              简介
            </h2>
            <div class="max-h-100 text-[#333] text-xl  overflow-y-auto">
              {{ characterData.bioParagraphs }}
            </div>
          </div>


          <div>
            <h2 class="text-[#9370DB] text-2xl font-bold">
              相关卡片
            </h2>
            <div class="flex max-w-full gap-x-4 overflow-x-auto">
              <div
                v-for="item in characterData.relatedItems"
                :key="item.id"
                class="inline-block"
              >
                <div class="min-w-32 h-32 rounded">
                  <img :src="item.imageUrl" :alt="item.name" class="w-full h-full object-cover">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-10">
      <h2 class="text-[#9370DB] text-2xl font-bold">
        高光节点
      </h2>
      <div class="">
        <ChainCom :chain-list="chainList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChainCom from '@/components/business-com/ChainCom.vue';

const characterData = ref({
  name: '神里绫华',
  imageUrl: 'https://i.imgur.com/sY6b47N.png', // Replace with actual Ayaka image URL
  source: '神里绫华是米哈游研发的游戏《原神》及其衍生作品的登场角色。',
  bioTitle: '简介',
  bioParagraphs: '稻妻「社奉行」神里家的大小姐。容姿端丽，品行高洁与出任家主的哥哥神里绫人一同打点家族，兄妹分工，哥哥掌管政务，妹妹则主理家族内外事宜。绫华性情善良仁厚，待人礼貌得体，常常亲自出面处理民间事务，与民众距离很近。她个性认真，追求将每一件事都办得尽善尽美。人们为这份心意所感动，亲近于她，还赠予她「白鹭公主」的雅称。街坊邻里说起她，总会露出真心实意的赞叹之色。',
  relatedTitle: '相关卡片',
  relatedItems: [
    { id: 1, name: '八重神子', imageUrl: 'https://i.imgur.com/lV809G1.png' }, // Replace with actual Yae Miko image URL
    { id: 2, name: '神里绫人', imageUrl: 'https://i.imgur.com/AEZZx2V.png' }, // Replace with actual Ayato image URL
    { id: 3, name: '?', imageUrl: 'https://i.imgur.com/lV809G1.png' },
    { id: 4, name: '?', imageUrl: 'https://i.imgur.com/lV809G1.png' },
    { id: 5, name: '?', imageUrl: 'https://i.imgur.com/lV809G1.png' },
    { id: 6, name: '?', imageUrl: 'https://i.imgur.com/lV809G1.png' },
    { id: 7, name: '?', imageUrl: 'https://i.imgur.com/lV809G1.png' },
    { id: 8, name: '?', imageUrl: 'https://i.imgur.com/lV809G1.png' },
  ],
});
const chainList = ref([{
  id: 1,
  name: '零号位',
},
{
  id: 2,
  name: '',
},
{
  id: 3,
  name: '',
},
{
  id: 4,
  name: '',
},
{
  id: 5,
  name: '当前创作',
}])
</script>

<style scoped>
/* You can add component-specific styles here if needed,
   though Tailwind aims to minimize this. */
/* For example, if you wanted to ensure the left panel
   has a minimum height on mobile before stacking: */
/*
.md\:w-1\/3 {
  @media (max-width: 767px) {
    min-height: 400px; // Example
  }
}
*/
</style>
