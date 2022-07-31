import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
  // 去处理组件
  // TODO 判断是不是一个element
  processComponent(vnode, container)
}

function processComponent(vnode: any, container: any) {
  // 挂载组件
  mountComponent(vnode, container)
}

function mountComponent(vnode: any, container: any) {
  // 创建一个实例 instance
  const instance = createComponentInstance(vnode)

  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container: any) {
  const subTree = instance.render()
  
  // vnode -> patch
  // vnode -> element -> mountElement
  patch(subTree, container)
  
}

