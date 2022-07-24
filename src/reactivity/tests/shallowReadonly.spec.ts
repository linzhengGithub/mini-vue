import { isReadonly, shallowReadonly } from "../reactive"

describe('shallowReadonly', () => {
  test('should not make non-reactive properties reactive', () => {
    const obj = shallowReadonly({ foo: 1 })
    expect(isReadonly(obj)).toBe(true)
    expect(isReadonly(obj.foo)).toBe(false)
  })
  it('warn then call set', () => {
    console.warn = jest.fn()
    const dummy = shallowReadonly({ foo: 1 })
    dummy.foo++
    expect(console.warn).toHaveBeenCalled()
  });
})
