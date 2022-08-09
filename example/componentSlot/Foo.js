import { h, renderSlots } from '../../lib/mini-vue.esm.js';
export const Foo = {
  setup() {
    return {}
  },
  render() {
    const foo = h('p', {}, 'foo')

    console.log(this.$slots)
    // 具名插槽
    // 1.获取要渲染的元素
    // 2.获取要渲染到的位置
    const age = 18
    return h('div', {},
      [
        renderSlots(this.$slots, 'header', { age }),
        foo,
        renderSlots(this.$slots, 'footer')
      ]
    )
  }
}
