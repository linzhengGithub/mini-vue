import { createVNode } from "./vnode"

export function createAppAPI(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // 先 vnode
        // 把 component 渲染成 vnode
        // 所有的逻辑操作都给予 vnode 做处理
        const vnode = createVNode(rootComponent)
  
        render(vnode, rootContainer)
      }
    }
  }
}
