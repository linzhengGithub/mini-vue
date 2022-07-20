import { mutableHandlers, readonlyHandlers } from "./baseHandlers"

export function reactive(raw) {
  return createActiceObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createActiceObject(raw, readonlyHandlers)
}

function createActiceObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers)
}
