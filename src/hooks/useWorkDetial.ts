import { createApp, h, ref } from 'vue'
import WorkDetail from '@/components/business-com/WorkDetail.vue'
import router from '@/router';


export function useWorkDetail() {
  let modalApp = null
  let hostElement = null
  const id = ref<string | number>('')

  // 销毁Modal应用
  function destroyModal() {
    console.log('destroyModal')
    if (modalApp) {
      modalApp.unmount()
      modalApp = null
    }

    if (hostElement) {
      document.body.removeChild(hostElement)
      hostElement = null
    }

    // 重置状态
    // resolvePromise = null
    // rejectPromise = null
  }

  // 创建Modal容器和挂载应用
  function createModalApp() {
    if (modalApp) return

    hostElement = document.createElement('div')
    document.body.appendChild(hostElement)

    modalApp = createApp({
      setup() {
        return () => h(WorkDetail, {
          id: id.value,
          open: false,
          onClosed: () => {
            destroyModal()
          },
        })
      },
    })
    modalApp.use(router)
    modalApp.mount(hostElement)
  }

  function open(workId) {
    id.value = workId
    createModalApp()
  }
  return {
    open,
  }
}
