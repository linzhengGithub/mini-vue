export const App = {
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
