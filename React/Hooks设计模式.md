### why move to hooks?

`mixin`、`HOC`、`Render Props` 有什么缺陷?

* 数据源不明。导致不易快速定位 bug。(mixin、hoc、render props)
* 命名重复性问题。在一个组件中同时使用多个 hoc, 不排除这些 hoc 里的方法存在命名冲突的问题。(mixin、hoc)
* 性能问题。需要额外的组件实例存在额外的开销。(mixin、hoc、render Props)

反过来说, 这些也是 hooks 的优势所在。

另外使用 clsaa API 与 TypeScript 结合使用时, 需要进行两次声明(一次 interface, 一次 defaultProps)

> [尤雨溪：Vue Function-based API RFC](https://mp.weixin.qq.com/s/k37eVdlH-_Hder8yN3na5g)

### 为什么 useState 返回一个数组而非一个对象?

因为数组比对象更加方便, 可以观察如下

数组:

```js
[name, setName] = useState('鸣人')
[age, setAge] = useState(13)
```

对象:

```js
{value: name, setValue: setName} = useState('鸣人')
{value: name, setValue: setName} = useState(13)
```

### Hooks 传递的设计

为什么要从全局引入, 而非如下通过函数传递

```js
const SomeContext = require('./SomeContext)

function Example({ someProp }, hooks) {
  const contextValue = hooks.useContext(SomeContext)
  return <div>{someProp}{contextValue}</div>
}
```

使用传递的劣势是在有时会出现冗余的传递。

### Hooks 与 class 的一些差异

#### Hooks 调用实例的方法

Hooks tip: something.current (a ref value) is just like this.something in a class (an instance field).

/* in a function */
const X = useRef()
X.current // can read or write

/* in a class */
this.X // can read or write

> [twitter](https://twitter.com/dan_abramov/status/1125223181701263360)
> [Is there something like instance variables](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)

#### Hooks vs Class in setState

Hooks 中的 setState 与 Class 中最大区别在于 Hooks 不会对多次 setState 进行合并操作。如果要执行合并操作, 可像如下操作:

```js
setState(prevState => {
  return { ...prevState, ...updateValues }
})
```

此外关于 `setState` 的异步表现, 见如下表:

| | Class | Hooks |
|:---:|:---:|:---:|
| setState(async) | 多次输出 | 多次输出, 但是输出次数会小于等于 class 的 |
| setState(sync) | 多次输出 | 单次输出 |

![](http://with.muyunyun.cn/314d5035e996809ab463e33e5029777f.jpg)

- [ ] [一些异步](https://codesandbox.io/s/funny-mclean-6lru4)

### Hooks 状态管理

useRedux:

```js
import * as actions from './actions'

function Counter() {
  const [count, {increment, decrement}] = useRedux(state => state.count, actions);

  return (
    <>
      Count: {count}
      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
    </>
  );
}
```

useReducer:

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter({initialState}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```

使用 hooks 实现自定义版本的 redux

### Hooks FAQ

#### 如何获取之前的 props 以及 state

React 官方很大可能在未来会提供一个 `usePrevious` 的 hooks 来获取之前的 props 以及 state。

usePrevious 的核心思想是用 ref 来存储先前的值。

```js
function usePrevous(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
```

#### hooks 中 getDerivedStateFromProps 的替代方案

在 [React 暗器百解](./React暗器百解.md) 中提到了 getDerivedStateFromProps 是一种反模式, 但是极少数情况(比如 <Transition /> 组件还是用得到该钩子), 在 Hooks 中如何达到 getDerivedStateFromProps 的效果呢?

```js
function ScrollView({row}) {
  const [isScrollingDown, setISScrollingDown] = setState(false)
  const [prevRow, setPrevRow] = setState(null)

  // 核心是创建一个 `prevRow` state 与父组件传进来的 `row` 进行比较
  if (row !== prevRow) {
    setISScrollingDown(prevRow !== null && row > prevRow)
    setPrevRow(row)
  }

  return `Scrolling down ${isScrollingDown}`
}
```

#### hooks 中 forceUpdate 的替代方案

可以使用 `useReducer` 来 hack `forceUpdate`, 但是尽量避免 forceUpdate 的使用。

```js
const [ignored, forceUpdate] = useReduce(x => x + 1, 0)

function handleClick() {
  forceUpdate()
}
```

#### hooks 中 shouldComponentUpdate 的替代方案

使用 `useMemo` 可以在 hooks 中实现 `shouldComponentUpdate` 的替代, 但 useMemo 只对 props 进行浅比较。

```js
React.useMemo((props) => {
  // your component
})
```

#### useMemo 与 useCallback 的区别

```js
useMemo(() => value) <==> useCallback(value) <==> 缓存 value
```

* useCallback: 一般用于缓存函数
* useMemo: 一般用于缓存组件

#### 依赖列表中移除函数是否是安全的?

通常来说, 结论是不安全的。可以观察 demo,

```js
const { useState, useEffect } = React

function Example({ someProp }) {
  function doSomething() {
    console.log(someProp) // 这里只输出 1, 点击按钮的 2 并没有输出。
  }

  useEffect(
    () => {
      doSomething()
    },
    [] // 🔴 This is not safe (it calls `doSomething` which uses `someProp`)
  )

  return <div>example</div>
}

export default function() {
  const [value, setValue] = useState(1)
  return (
    <>
      <Example someProp={value} />
      <Button onClick={() => setValue(2)}>button</Button>
    </>
  )
}
```

在该 demo 中, 点击 button 按钮, 并没有打印出 2。解决上述问题有两种方法。

方法一: 一般来说首推的做法是将函数放进相关的 `effect` 中, 这样相关属性改变可以从依赖中一目了然

```js
function Example({ someProp }) {
  useEffect(
    () => {
      function doSomething() {
        console.log(someProp)
      }
      doSomething()
    },
    [someProps] // 相关属性改变一目了然
  )

  return <div>example</div>
}
```

方法二: 把函数加入依赖列表中

```js
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp) // 这里只输出 1, 点击按钮的 2 并没有输出。
  }

  useEffect(
    () => {
      doSomething()
    },
    [doSomething] // 🔴 This is not safe (it calls `doSomething` which uses `someProp`)
  )

  return <div>example</div>
}
```

方案二基本上不会单独使用, 它一般结合 `useCallback` 一起使用来处理某些函数计算量较大的函数。

```js
function Example({ someProp }) {
  const doSomething = useCallback(() => {
    console.log(someProp)
  }, [someProp])

  useEffect(
    doSomething(),
    [doSomething]
  )

  return <div>example</div>
}
```

#### 如何避免重复创建昂贵的对象

* 使用 `useState` 的 `lazy-initial`

使用 `const [value, setValue] = useState(() => createExpensiveObj)`, 见 [lazy-initial-state](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state);

* 使用自定义 useRef 函数

```js
function Image(props) {
  const ref = useRef(null)

  function getExpensiveObj() {
    if (ref.current === null) {
      ref.current = ExpensiveObj
    }

    return ref.current
  }

  // if need ExpensiveObj, call getExpensiveObj()
}
```

- [ ] [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html): 阅读到 How to avoid passing callbacks down??

### 相关资料

* [RFCS](https://github.com/reactjs/rfcs/pull/68#issuecomment-439314884): hooks 设计的一些理念
