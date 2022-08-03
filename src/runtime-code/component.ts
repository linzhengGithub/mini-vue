export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {}
  }
  return component
}

export function setupComponent(instance) {
  // TODO
  // initPropos
  // initSlots

  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type

  instance.proxy = new Proxy({}, {
    get(target, key) {
      const { setupState } = instance
      if (key in setupState) {
        return setupState[key]
      }
      debugger
      if (key === '$el') {
        return instance.vnode.el
      }
    }
  })

  const { setup } = Component
  if (setup) {
    // 此处 setup 返回值可能是一个function / object
    const setupResult = setup()

    handleSetupResult(instance, setupResult)
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  // function object
  // TODO function
  if (typeof setupResult === 'object') {
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance: any) {
  const Component = instance.type
  instance.render = Component.render
}
