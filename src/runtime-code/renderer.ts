import { ShapeFlags } from "../shared/ShapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from "./createApp"
import { Fragment, Text } from "./vnode"


export function createRenderer(options) {
  const {
    createElement,
    patchProp,
    insert
  } = options

  function render(vnode, container) {
    patch(vnode, container, null)
  }

  function patch(vnode, container, parentComponent) {
    // 去处理组件
    // 判断是不是一个element, 如果是一个element, 则处理 element
    // 如何区分 是 element 还是 component

    const { type, shapeFlag } = vnode
    switch (type) {
      case Fragment:
        processFragment(vnode, container, parentComponent)
        break;
      case Text:
        processText(vnode, container)
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parentComponent)
        }
        break;
    }
  }

  function processText(vnode: any, container: any) {
    const { children } = vnode
    const el = (vnode.el = document.createTextNode(children))
    container.append(el)
  }

  function processFragment(vnode: any, container: any, parentComponent) {
    mountChildren(vnode, container, parentComponent)
  }

  function processElement(vnode: any, container: any, parentComponent) {
    mountElement(vnode, container, parentComponent)
  }

  function mountElement(vnode: any, container: any, parentComponent) {
    const el = (vnode.el = createElement(vnode.type))

    const { children, shapeFlag } = vnode

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent)
    }

    const { props } = vnode
    for (const key in props) {
      patchProp(el, key, props)
    }
    // container.append(el)
    insert(el, container)
  }

  function mountChildren(vnode: any, el: any, parentComponent) {
    vnode.children.forEach(v => {
      patch(v, el, parentComponent)
    })
  }

  function processComponent(vnode: any, container: any, parentComponent) {
    // 挂载组件
    mountComponent(vnode, container, parentComponent)
  }

  function mountComponent(initialVnode: any, container: any, parentComponent) {
    // 创建一个实例 instance
    const instance = createComponentInstance(initialVnode, parentComponent)

    setupComponent(instance)
    setupRenderEffect(instance, initialVnode, container)
  }

  function setupRenderEffect(instance: any, initialVnode: any, container: any) {
    const { proxy } = instance
    const subTree = instance.render.call(proxy)

    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree, container, instance)

    initialVnode.el = subTree.el

  }
  return {
    createApp: createAppAPI(render),
  }
}
