import { isObject } from "../shared/index"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
  patch(vnode, container)
}

function patch(vnode, container) {
  // 去处理组件
  // TODO 判断是不是一个element, 如果是一个element, 则处理 element
  // 如何区分 是 element 还是 component
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type)

  const { children } = vnode

  if(typeof children === 'string') {
    el.textContent = children
    console.log(el)
  } else if(Array.isArray(children)) {
    children.forEach(v => {
      console.log(v)
      patch(v, el)
    })
  }

  const { props } = vnode
  for (const key in props) {
      const val = props[key]
      el.setAttribute(key, val)
  }
  container.append(el)
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

