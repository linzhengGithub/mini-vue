import { h } from '../../lib/mini-vue.esm.js';

window.self = null
export const App = {
  // 必须写 render() 方法
  render() {
    window.self = this
    // ui
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
        onClick: () => {
          console.log('click')
        }
      },
      // string
      'hi,' + this.msg
      // 'hi, mini-vue'
      // array
      // [h('p', { class: 'red' }, 'hi'), h('p', { class: 'blue' }, 'mini-vue')]
    )
  },
  setup() {
    return {
      msg: 'mini-vue-hah'
    }
  }
}
