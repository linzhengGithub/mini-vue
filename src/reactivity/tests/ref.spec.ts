import { effect } from "../effect"
import { reactive } from "../reactive"
import { isRef, proxyRefs, ref, unRef } from "../ref"

describe('ref', () => {
  it('happy path', () => {
    const a = ref(1)
    expect(a.value).toBe(1)
  })

  it('should be reactive', () => {
    const a = ref(1)
    let dummy
    let calls = 0
    effect(() => {
      calls++
      dummy = a.value
    })
    expect(calls).toBe(1)
    expect(dummy).toBe(1)
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
    // same value should not trigger change
    a.value = 2
    expect(calls).toBe(2)
    expect(dummy).toBe(2)
  })

  it('should make nested properties reactive', () => {
    const a = ref({ count: 1 })
    let dummy
    effect(() => {
      dummy = a.value.count
    })
    expect(dummy).toBe(1)
    a.value.count = 2
    expect(dummy).toBe(2)
    a.value.count = 2
    expect(dummy).toBe(2)
  })

  it('isRef', () => {
    const a = ref(1)
    const b = reactive({
      age: 18
    })
    expect(isRef(a)).toBe(true)
    expect(isRef(b)).toBe(false)
    expect(isRef(1)).toBe(false)
  })

  it('unRef', () => {
    const a = ref(1)
    expect(unRef(a)).toBe(1)
    expect(unRef(2)).toBe(2)
  })

  it('proxyRefs', () => {
    const user = {
      age: ref(18),
      name: 'linZheng'
    }

    const proxyUser = proxyRefs(user)
    expect(user.age.value).toBe(18)
    expect(proxyUser.age).toBe(18)
    expect(proxyUser.name).toBe('linZheng')
    
    proxyUser.age = 28

    expect(user.age.value).toBe(28)
    expect(proxyUser.age).toBe(28)

    proxyUser.age = ref(28)
    expect(user.age.value).toBe(28)
    expect(proxyUser.age).toBe(28)

  })
})
