import { isReadonly, readonly } from "../reactive";

describe('readonly', () => {
  it('happy path', () => {
    // not set
    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(original)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)
    expect(isReadonly(wrapped.bar)).toBe(true)
    expect(isReadonly(original.bar)).toBe(false)
    expect(wrapped).not.toBe(original)
    expect(wrapped.foo).toBe(1)
  });

  it('warn then call set', () => {
    console.warn = jest.fn()
    const dummy = readonly({ foo: 1 })
    dummy.foo++
    expect(console.warn).toHaveBeenCalled()
  });

});
