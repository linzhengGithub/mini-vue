import { h, getCurrentInstance } from '../../lib/mini-vue.esm.js';
export const Foo = {
  name: 'Foo',
  setup() {
    const instance = getCurrentInstance()
    console.log('Foo:', instance)
  },
  render() {
    const foo = h('div', {}, 'foo')
    return h('div', {}, [foo])
  }
}
