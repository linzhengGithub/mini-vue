import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  public dep
  private _rawValue: any;
  private __v_isRef = true
  constructor(value) {
    this._rawValue = value
    this._value = convert(value)
    this.dep = new Set()
  }

  get value() {
    if (isTracking()) {
      trackEffects(this.dep)
    }
    return this._value
  }

  set value(newValue) {
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue
      this._value = convert(newValue)
      triggerEffects(this.dep)
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value
}

export function ref(value) {
  return new RefImpl(value)
}

export function proxyRefs(objectWitchRefs) {
  return new Proxy(objectWitchRefs, {
    get(target, key) {
      // get -> key 是 ref 的话 就返回 .value
      return unRef(Reflect.get(target, key))
    },

    set(target, key, value) {
      // set -> value 不是 ref 但是 target[key] 是 ref 直接替换 .value
      // 反之 value 是 ref 直接替换 target[key]
      if(isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value)
      } else {
        return Reflect.set(target, key, value)
      }
    }
  })
}


export function isRef(ref) {
  return !!ref.__v_isRef
}

export function unRef(ref) {
  // 判断是否是ref 如果是 返回ref.value 否则返回ref本身
  return isRef(ref) ? ref.value : ref
}
