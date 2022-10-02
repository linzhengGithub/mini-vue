export const extend = Object.assign

export const EMPTY_OBJ = {}

export function isObject(value) {
  return typeof value === 'object' && value !== null
}

export function isString(value) {
  return typeof value === 'string'
}

export function hasChanged(value, newValue) {
  return !Object.is(value, newValue)
}

export function hasOwn(val, key) {
  return Object.prototype.hasOwnProperty.call(val, key)
}

export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : ''
  })
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const toHandlerKey = (str: string) => {
  return str ? 'on' + capitalize(str) : ''
}
