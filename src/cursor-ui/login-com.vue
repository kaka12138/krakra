<template>
  <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-lg">
    <!-- 关闭按钮 -->
    <div class="absolute top-4 right-4 text-gray-400 text-2xl cursor-pointer hover:text-gray-600 transition-colors">
      ×
    </div>

    <!-- 标题部分 -->
    <div class="text-center mb-6 sm:mb-8">
      <h1 class="text-purple-500 text-4xl sm:text-5xl font-bold mb-2">
        欢迎回来
      </h1>
      <h2 class="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">
        <span class="text-purple-500">Kra</span><span class="text-amber-400">Kra</span>
      </h2>
      <h3 class="text-xl sm:text-2xl font-medium text-gray-700">
        登录账号
      </h3>
    </div>

    <!-- TODO:表单 -->
    <!-- 按钮 -->
    <div>
      <!-- 登录按钮 -->
      <Button
        type="submit"
        class="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium text-base sm:text-lg py-3 h-11 sm:h-12 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mt-2"
      >
        登 录
      </Button>

      <!-- 辅助链接 -->
      <div class="flex justify-between text-sm pt-2">
        <button type="button" class="text-purple-500 hover:text-purple-700 transition-colors">
          忘记密码?
        </button>
        <button type="button" class="text-amber-500 hover:text-amber-600 transition-colors font-medium">
          注册账号
        </button>
      </div>
    </div>
  </div>
</template>
