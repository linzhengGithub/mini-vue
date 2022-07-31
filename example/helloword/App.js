import { h } from '../../lib/mini-vue.esm.js';

export const App = {
  // 必须写 render() 方法
  rander() {
    // ui
    return h('div', 'hi,' + this.msg)
  },
  setup() {
    return {
      msg: 'mini-vue'
    }
  }
}
