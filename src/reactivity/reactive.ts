import { isObject } from "../shared/index"
import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from "./baseHandlers"

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

export function reactive(raw) {
  return createActiceObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiceObject(raw, readonlyHandlers)
}

export function shallowReadonly(raw) {
  return createActiceObject(raw, shallowReadonlyHandlers)
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
};

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}

function createActiceObject(target: any, baseHandlers) {
  if(!isObject(target)) {
    console.warn(`target: ${target} must be an object`)
    return target
  }
  return new Proxy(target, baseHandlers)
}
