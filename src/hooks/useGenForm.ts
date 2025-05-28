import { createApp, h } from 'vue'
import GenFormCom from '@/components/business-com/GenFormCom.vue'


export function useGenForm(formType: string) {
  let modalApp = null
  let hostElement = null

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
        return () => h(GenFormCom, {
          formType,
          open: true,
          onClosed: () => {
            destroyModal()
          },
        })
      },
    })

    modalApp.mount(hostElement)
  }

  function open() {
    createModalApp()
  }
  return {
    open,
  }
}
