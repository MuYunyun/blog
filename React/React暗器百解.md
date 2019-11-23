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

### Hooks 踩坑

There are three common reasons you might be seeing it:

```js
1. You might have mismatching versions of React and React DOM.
2. You might be breaking the Rules of Hooks.
3. You might have more than one copy of React in the same app.
```

在 demo 项目中使用 yarn link "@msfe/beast-mobile" 会遇到上述报错, 解决方法是执行(貌似有问题)

```bash
npm link ../beast-mobile-demo/node_modules/react from @msfe/beast-mobile
```

另一种方法是在业务项目中配置 [resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/)