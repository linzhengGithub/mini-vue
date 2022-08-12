import { h, provide, inject } from '../../lib/mini-vue.esm.js';

const Provider = {
  name: 'Provider',
  setup() {
    provide('foo', 'fooVal')
    provide('bar', 'barVal')
  },
  render() {
    return h('div', {}, [h('p', {}, 'Provider'), h(ProviderTwo)])
  }
}

const ProviderTwo = {
  name: 'ProviderTwo',
  setup() {
    provide('foo', 'fooTwo')
    const foo = inject('foo')
    return {
      foo
    }
  },
  render() {
    return h('div', {}, [h('p', {}, `ProviderTwo - foo: ${this.foo}`), h(Consumer)])
  }
}

const Consumer = {
  name: 'Consumer',
  setup() {
    const foo = inject('foo')
    const bar = inject('bar')
    // 创建新
    const baz = inject('baz', 'bazDefault')
    // 创建一个函数
    const ban = inject('ban', () => 'banFnVal')
    return { foo, bar, baz, ban }
  },
  render() {
    return h('div', {}, `Consumer: - ${this.foo} - ${this.bar} - ${this.baz} - ${this.ban}`)
  }
}

export default {
  name: 'App',
  setup() { },
  render() {
    return h(
      'div',
      {},
      [h('p', {}, 'apiInject'), h(Provider)]
    )
  }
}
