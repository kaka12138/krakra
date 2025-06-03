<template>
  <div class="space-y-2 pt-3">
    <div class="flex">
      <img src="@/assets/logo-h.png" alt="logo" class="w-10 h-10 rounded-full mr-2">
      <div class="border-b-1 border-[#9470DB] pb-4 flex-1">
        <div class="flex items-center gap-x-1">
          <div class="truncate">
            用户名
          </div>
          <div class="w-3 h-3 bg-[#9370DB] rounded-full" />
          <div class="w-3 h-3 bg-[#FFD700] rounded-full" />
        </div>
        <div class="text-sm text-[#999]">
          评论了你的作品
        </div>
        <!-- 回复 -->
        <div class="truncate text-[#333] text-md">
          画成这样也是神人了
        </div>
        <!-- 原消息 -->
        <div class="flex items-center gap-x-1">
          <div class="bg-[#999] w-0.5 h-3 rounded-full" />
          <div class="truncate text-[#999] text-xs">
            画成这样也是神人了
          </div>
        </div>
        <!-- 操作 -->
        <div class="flex gap-x-3 mt-2">
          <div class="flex gap-x-1 rounded-full border-1 border-[#9470DB] px-4 opacity-50 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="w-5.5 h-5.5 self-center"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path d="M12.4667 4.9565C11.6197 2.68967 9.45991 1.184 7.03675 1.1665C4.98808 1.1665 3.08191 2.22 2.01675 3.9665C0.952748 5.713 0.878248 7.8835 1.82675 9.6965L1.93675 9.9065C1.97758 9.9835 1.99125 10.0707 1.96675 10.1465C1.81391 10.5513 1.67408 10.9832 1.56675 11.4265L1.55675 11.5265C1.55675 11.9733 1.79425 12.277 2.26675 12.2665L2.34675 12.2565C2.77608 12.162 3.20375 12.0458 3.61675 11.8965C3.61675 11.8965 3.75508 11.8827 3.83675 11.9165L4.23675 12.1465L4.26675 12.1565C6.40991 13.2835 9.02792 12.9748 10.8467 11.3765C12.6656 9.77817 13.3137 7.22334 12.4667 4.9565ZM11.7031 5.2475C10.9743 3.29689 9.11828 1.99357 7.03315 1.9775L6.86315 1.9775C5.16352 2.02569 3.60061 2.93182 2.71315 4.3875C1.79758 5.88936 1.73596 7.76541 2.55315 9.3275L2.66315 9.5275C2.8037 9.79053 2.82852 10.0993 2.73315 10.4075C2.6092 10.7353 2.50555 11.068 2.41655 11.4066L2.41315 11.4075L2.36315 11.6175C2.38036 11.547 2.39814 11.4767 2.41655 11.4066L2.64315 11.3475C2.80076 11.3043 2.96152 11.2507 3.12315 11.1975L3.37315 11.1175C3.63115 11.0472 3.90309 11.0661 4.17315 11.1775C4.17315 11.1775 4.2938 11.2373 4.38315 11.2875L4.63315 11.4275L4.80315 11.5175C6.56803 12.3688 8.66824 12.1214 10.1831 10.8775L10.3131 10.7675C11.8783 9.39214 12.432 7.19711 11.7031 5.2475Z" fill-rule="evenodd" fill="#9470DB" />
            </svg>

            <div class="text-[#9470DB] text-sm self-center">
              回复
            </div>
          </div>
          <div class="rounded-full border-1 border-[#9470DB] p-1.5 opacity-50 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="14.333251953125"
              height="12.4423828125"
              viewBox="0 0 14.333251953125 12.4423828125"
              fill="none"
              class="w-5.5 h-5.5"
            >
              <path
                d="M4.16667 0.5C2.14162 0.5 0.5 2.14163 0.5 4.16667C0.5 7.83333 4.83333 11.1667 7.16667 11.9421C9.5 11.1667 13.8333 7.83333 13.8333 4.16667C13.8333 2.14163 12.1917 0.5 10.1667 0.5C8.92657 0.5 7.83023 1.11563 7.16667 2.05793C6.5031 1.11563 5.40677 0.5 4.16667 0.5Z"
                stroke="rgba(148, 112, 219, 1)"
                stroke-width="1"
                stroke-linejoin="round"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="ml-auto">
        <img src="@/assets/logo-h.png" alt="logo" class="w-10 h-10 rounded-lg ">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
