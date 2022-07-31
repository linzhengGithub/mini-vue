import { render } from "./renderer"
import { createVNode } from "./vnode"

export function createApp(rootComponent) {
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
