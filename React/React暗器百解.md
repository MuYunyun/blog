* React 的组件名为什么要大写？

```
在 `render` 中, 小写会被认为是 `html` 元素
```

* 你会把向 API 的数据请求放在哪里执行

```
视情况考虑:

* componentDidMount, 可能会导致白屏
* constructor, 针对数据不变的情况
```

* 虚拟 dom 中有个 `$$typeof` 字段，有了解过它的作用么？

运用 `JSON` 里会无视 `Symbol` 的知识点来完成安全性校验。可以参阅 [Why Do React Elements Have a $$typeof Property?](https://overreacted.io/why-do-react-elements-have-typeof-property/)

* 如何理解 `useEffect` 中的副作用

```
操作 dom, 获取数据，会影响其它组件或者在渲染时没有办法做其它操作, 这是目前所理解的副作用。
```

* 组件为什么写成 `<Form />` 而不是 `Form()`

结合编译时能做更多事情

* `React.memo()` 和 `useMemo()` 的区别

`useMemo()` 的粒度比 `React.memo()` 更细

* 什么时候使用 setState((state, props) => stateChange) 而不用 setState({})

点击一个按钮, 连续使用 setState 进行三次的增加, 如果使用 setState({}) 会造成 state 的合并, 使用 setState((state, props) => stateChange) 没有这个问题。

> [react-as-a-ui-runtime](https://overreacted.io/react-as-a-ui-runtime/)

* 使用过 `getDerivedStateFromProps` 么? 了解它的反模式么? 如何避免?

来看下使用 Derived 会导致的常见 bug:

#### 反模式一: 无条件复制 props 到 state

案例: 在开发 `Picker 组件`的时候, 如下图浮层内的数据源有外部传进的 props 属性以及浮层内进行滑动的 state。

![](http://with.muyunyun.cn/7614ba8c5be96ee769b8a68112848700.jpg)

如果这样子写大家看看是否有问题

```js
class Picker extends Component {
  state = { data: this.props.data }

  getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.data) !== JSON.stringify(state.data)) {
      return {
        data: props.data
      }
    }
    return null
  }
  ...
}
```

这样子写代码当在浮层上进行滑动时, state 的变化并不会生效, 这是为什么呢, 官网上截图如下

![](http://with.muyunyun.cn/1d13387bf1d927c36cf3d1a0feaf3134.jpg)

此时的 state 变化(让 Picker 父组件重新 render)也会造成 `getDerivedStateFromProps` 的调用, 导致 JSON.stringify(props.data)、JSON.stringify(state.data) 间一直会不相等, 所以返回的一直是 props。