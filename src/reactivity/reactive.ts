import { mutableHandlers, readonlyHandlers } from "./baseHandlers"

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

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
};

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}


function createActiceObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}
