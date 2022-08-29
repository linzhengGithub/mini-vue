import { effect } from "../reactivity/effect"
import { EMPTY_OBJ } from "../shared"
import { ShapeFlags } from "../shared/ShapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from "./createApp"
import { Fragment, Text } from "./vnode"


export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
    remove: hostRemove,
    setElementText: hostSetElementText,
  } = options

  function render(vnode, container) {
    patch(null, vnode, container, null, null)
  }
  // n1 老的; n2 新的
  function patch(n1, n2, container, parentComponent, anchor) {
    // 去处理组件
    // 判断是不是一个element, 如果是一个element, 则处理 element
    // 如何区分 是 element 还是 component

    const { type, shapeFlag } = n2
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent, anchor)
        break;
      case Text:
        processText(n1, n2, container)
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent, anchor)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent, anchor)
        }
        break;
    }
  }

  function processText(n1, n2: any, container: any) {
    const { children } = n2
    const el = (n2.el = document.createTextNode(children))
    container.append(el)
  }

  function processFragment(n1, n2: any, container: any, parentComponent, anchor) {
    mountChildren(n2.children, container, parentComponent, anchor)
  }

  function processElement(n1, n2: any, container: any, parentComponent, anchor) {
    if (!n1) {
      mountElement(n2, container, parentComponent, anchor)
    } else {
      patchElement(n1, n2, container, parentComponent, anchor)
    }
  }

  function patchElement(n1: any, n2: any, container: any, parentComponent, anchor) {
    console.log('patchElement');
    console.log('n1', n1);
    console.log('n2', n2);

    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ

    const el = (n2.el = n1.el)

    // props
    patchProps(el, oldProps, newProps)
    // children
    patchChildren(n1, n2, el, parentComponent, anchor)
  }

  function patchChildren(n1, n2, container, parentComponent, anchor) {
    const prevShapeFlag = n1.shapeFlag
    const c1 = n1.children
    const shapeFlag = n2.shapeFlag
    const c2 = n2.children

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 1. 把老的 children 清空
        unmountChildren(n1.children)
        // 2. 设置 text
        // hostSetElementText(container, c2)
      }
      if (c1 !== c2) {
        hostSetElementText(container, c2)
      }
    } else {
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        // 老的是text 新的是array
        hostSetElementText(container, '')
        mountChildren(c2, container, parentComponent, anchor)
      } else {
        // array diff array
        patchKeyedChildren(c1, c2, container, parentComponent, anchor)
      }
    }
  }

  function patchKeyedChildren(c1, c2, container, parentComponent, parentAnchor) {
    let i = 0
    let e1 = c1.length - 1
    let e2 = c2.length - 1

    function isSomeVNodeType(n1: any, n2: any) {
      return n1.type === n2.type && n1.key === n2.key
    }

    // 左侧对比
    while (i <= e1 && i <= e2) {
      const n1 = c1[i]
      const n2 = c2[i]

      if (isSomeVNodeType(n1, n2)) {
        patch(n1, n2, container, parentComponent, parentAnchor)
      } else {
        break;
      }
      i++
    }

    // 右侧对比
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1]
      const n2 = c2[e2]

      if (isSomeVNodeType(n1, n2)) {
        patch(n1, n2, container, parentComponent, parentAnchor)
      } else {
        break;
      }

      e1--
      e2--
    }

    // 新的比老的多 -> 创建el
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1
        const anchor = nextPos < c2.length ? c2[nextPos].el : null
        while(i<=e2) {
          patch(null, c2[i], container, parentComponent, anchor)
          i++
        }
      }
    } else if(i > e2) {
      while(i <= e1) {
        hostRemove(c1[i].el)
        i++
      }
    }

  }

  function unmountChildren(children) {
    for (let i = 0; i < children.length; i++) {
      const el = children[i].el
      hostRemove(el)
    }
  }

  function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const prevProp = oldProps[key]
        const nextProp = newProps[key]

        if (prevProp !== nextProp) {
          hostPatchProp(el, key, prevProp, nextProp)
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null)
          }
        }
      }
    }
  }

  function mountElement(vnode: any, container: any, parentComponent, anchor) {
    const el = (vnode.el = hostCreateElement(vnode.type))

    const { children, shapeFlag } = vnode
    // children
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode.children, el, parentComponent, anchor)
    }
    // props
    const { props } = vnode
    for (const key in props) {
      const val = props[key]
      hostPatchProp(el, key, null, val)
    }
    // addChild()
    hostInsert(el, container, anchor)
  }

  function mountChildren(children: any, el: any, parentComponent, anchor) {
    children.forEach(v => {
      patch(null, v, el, parentComponent, anchor)
    })
  }

  function processComponent(n1, n2: any, container: any, parentComponent, anchor) {
    // 挂载组件
    mountComponent(n2, container, parentComponent, anchor)
  }

  function mountComponent(initialVnode: any, container: any, parentComponent, anchor) {
    // 创建一个实例 instance
    const instance = createComponentInstance(initialVnode, parentComponent)

    setupComponent(instance)
    setupRenderEffect(instance, initialVnode, container, anchor)
  }

  function setupRenderEffect(instance: any, initialVnode: any, container: any, anchor) {
    effect(() => {
      if (!instance.isMounted) {
        // init
        const { proxy } = instance
        const subTree = (instance.subTree = instance.render.call(proxy))
        console.log('init', subTree);

        // vnode -> patch
        // vnode -> element -> mountElement
        patch(null, subTree, container, instance, anchor)

        initialVnode.el = subTree.el

        instance.isMounted = true
      } else {
        // update
        const { proxy } = instance
        const subTree = instance.render.call(proxy)
        const prevSubTree = instance.subTree
        instance.subTree = subTree
        console.log('update');

        patch(prevSubTree, subTree, container, instance, anchor)
      }
    })

  }
  return {
    createApp: createAppAPI(render),
  }
}
