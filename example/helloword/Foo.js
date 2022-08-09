import { h } from '../../lib/mini-vue.esm.js';
export const Foo = {
  setup(props) {
    console.log(props)
  },
  render() {
    const foo = h('div', {}, 'foo:' + this.count)
    return h('div', {}, [foo])
  }
}
