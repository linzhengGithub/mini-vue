import { getCurrentInstance } from "./component";

export function provide(key: any, val: any){
  // 存到 当前实例的 provide 对象
  const currentInstance: any = getCurrentInstance()

  if(currentInstance) {
    let { provides } = currentInstance
    const parentProvides = currentInstance.parent.provides

    // init
    // 原型链 - 最开始继承的是父组件的 provides
    if(provides === parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides)
    }
    provides[key] = val
  }

}

export function inject(key: any, defaultVal: any){
  // 取
  const currentInstance: any = getCurrentInstance()

  if(currentInstance) {
    const parentProvides = currentInstance.parent.provides

    if(key in parentProvides) {
      return parentProvides[key]
    } else if(defaultVal) {
      if(typeof defaultVal === 'function') {
        return defaultVal()
      }
      return defaultVal
    }
  }

}
