import { ref, onMounted, onUnmounted, type Ref } from 'vue';

interface UseScrollToBottomOptions {
  /** * 容差值，用于处理像素计算不精确导致的问题。
   * 默认为 1。
   */
  tolerance?: number;
}

/**
 * @description 判断一个元素的滚动条是否滑动到底部的 Vue Composable Hook
 * @param elementRef Ref<HTMLElement | null | undefined> 指向需要监听滚动事件的 DOM 元素的 Ref 对象
 * @param options 可选配置项
 * @returns 一个包含 isBottom (Ref<boolean>) 响应式状态的对象
 */
export function useScrollToBottom(
  elementRef: Ref<HTMLElement | null | undefined>,
  options?: UseScrollToBottomOptions,
) {
  const isBottom = ref(false);
  const tolerance = options?.tolerance ?? 20; // 默认容差为 1px

  const handleScroll = () => {
    const element = elementRef.value;
    if (!element) {
      isBottom.value = false; // 如果元素不存在，则认为不在底部
      return;
    }

    // 判断条件：scrollHeight - scrollTop <= clientHeight + tolerance
    // element.scrollHeight: 元素内容的总高度
    // element.scrollTop: 元素内容顶部被卷起来的高度
    // element.clientHeight: 元素内部的可见高度
    if ((element.scrollHeight - element.scrollTop) <= (element.clientHeight + tolerance)) {
      isBottom.value = true;
    } else {
      isBottom.value = false;
    }
  };

  onMounted(() => {
    const element = elementRef.value;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      // 初始检查一次
      handleScroll();
    }
  });

  onUnmounted(() => {
    const element = elementRef.value;
    if (element) {
      element.removeEventListener('scroll', handleScroll);
    }
  });

  return {
    isBottom,
  };
}
