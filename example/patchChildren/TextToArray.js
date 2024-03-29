import { ref, h } from '../../lib/mini-vue.esm.js';
const prevChildren = 'oldChildren' // 老的是text
const nextChildren = [h('div', {}, 'A'), h('div', {}, 'B')] // 新的是array

export default {
  name: 'ArrayToText',
  setup() {
    const isChange = ref(false)
    window.isChange = isChange

    return {
      isChange
    }
  },
  render() {
    const self = this
    return self.isChange === true ? h('div', {}, nextChildren) : h('div', {}, prevChildren)
  }
}
