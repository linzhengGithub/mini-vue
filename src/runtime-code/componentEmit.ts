import { camelize, toHandlerKey } from "../shared/index"

export function emit(instance, event, ...args) {
  console.log('emit', event)

  // instance.props -> event 取到 props 看看是否有 event
  const { props } = instance

  // TPP 行为
  // add -> Add
  // add-foo -> AddFoo
  
  const handler = props[camelize(toHandlerKey(event))]
  handler && handler(...args)
}
