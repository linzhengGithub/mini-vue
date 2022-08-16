import { h, ref } from '../../lib/mini-vue.esm.js';

export const App = {
  name: 'App',
  setup() {
    const count = ref(0)
    const onClick = () => {
      count.value++
    }

    const props = ref({
      foo: 'foo',
      bar: 'bar',
    })

    const onChangePropsDemo1 = () => {
      // foo 值修改了
      props.value.foo = 'new-foo'
    }
    const onChangePropsDemo2 = () => {
      // foo 变成了 undefined / null
      props.value.foo = undefined
    }
    const onChangePropsDemo3 = () => {
      // 删除了 bar
      props.value = {
        foo: 'foo'
      }
    }


    return {
      count,
      onClick,
      props,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3
    }
  },
  render() {
    return h(
      'div',
      {
        id: 'root',
        ...this.props,
      },
      [
        h('div', {}, 'count:' + this.count), // 收集依赖
        h('button', { onClick: this.onClick }, 'click'),
        h('button', { onClick: this.onChangePropsDemo1 }, 'click-change-props-demo1'),
        h('button', { onClick: this.onChangePropsDemo2 }, 'click-change-props-demo2'),
        h('button', { onClick: this.onChangePropsDemo3 }, 'click-change-props-demo3'),
      ]
    )
  }
}
