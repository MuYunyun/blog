### React Logo 与 Hooks

![](http://with.muyunyun.cn/ddbdcec2fc39ba350fc74647f4fad6f5.jpg-300)

React 的 logo 是一个原子图案, 原子组成了物质的表现。类似的, React 就像原子般构成了页面的表现; 而 Hooks 就如夸克, 其更接近 React 本质的样子, 但是直到 4 年后的今天才被真正设计出来。 —— Dan in React Conf(2018)

### why Hooks?

一: `多个组件间逻辑复用`: 在 Class 中使用 React 不能将带有 state 的逻辑给单独抽离成 function, 其只能通过嵌套组件的方式来解决多个组件间逻辑复用的问题, 基于嵌套组件的思想存在 [HOC](https://github.com/MuYunyun/blog/blob/master/React/从0到1实现React/8.HOC探索.md) 与 `render props` 两种设计模式。但是这两种设计模式是否存在缺陷呢?

* 嵌套地狱, 当嵌套层级过多后, 数据源的追溯会变得十分困难, 导致定位 bug 不容易; (hoc、render props)
* 性能, 需要额外的组件实例存在额外的开销; (hoc、render props)
* 命名重复性, 在一个组件中同时使用多个 hoc, 不排除这些 hoc 里的方法存在命名冲突的问题; (hoc)

二: `单个组件中的逻辑复用`: Class 中的生命周期 `componentDidMount`、`componentDidUpdate` 甚至 `componentWillUnMount` 中的大多数逻辑基本是类似的, 必须拆散在不同生命周期中维护相同的逻辑对使用者是不友好的, 这样也造成了组件的代码量增加。

三: Class 的其它一些问题: 在 React 使用 Class 需要书写大量样板, 用户通常会对 Class 中 Constructor 的 bind 以及 this 的使用感到困惑; 当结合 class 与 TypeScript 一起使用时, 需要对 defaultValue 做额外声明处理; 此外 React Team 表示 Class 在机器编译优化方面也不是很理想。

### useState 返回的值为什么是数组而非对象?

原因是数组的解构比对象更加方便, 可以观察以下两种数据结构解构的差异。

返回数组时, 可以直接解构成任意名字。

```js
[name, setName] = useState('路飞')
[age, setAge] = useState(12)
```

返回对象时, 却需要多一层的命名。

```js
{value: name, setValue: setName} = useState('路飞')
{value: name, setValue: setName} = useState(12)
```

### Hooks 传递的设计

Hooks 是否可以设计成在组件中通过函数传参来使用? 比如进行如下调用?

```js
const SomeContext = require('./SomeContext)

function Example({ someProp }, hooks) {
  const contextValue = hooks.useContext(SomeContext)
  return <div>{someProp}{contextValue}</div>
}
```

使用传递的劣势是会出现冗余的传递。(可以联想 context 解决了什么)

### Hooks 与 Class 中调用 setState 有不同的表现差异么?

Hooks 中的 setState 与 Class 中最大区别在于 Hooks 不会对多次 setState 进行合并操作。如果要执行合并操作, 可执行如下操作:

```js
setState(prevState => {
  return { ...prevState, ...updateValues }
})
```

此外可以对 class 与 Hooks 之间 `setState` 是异步还是同步的表现进行对比, 可以先对以下 4 种情形 render 输出的个数进行观察分析:

class 中的 setState:

```js
export default class App extends React.Component {
  state = {
    name: '路飞',
    old: 12,
    gender: 'boy'
  }

  // 情形 ①: class 中异步调用 setState
  componentDidMount() {
    this.setState({
      name: '娜美'
    })
    this.setState({
      old: 13
    })
    this.setState({
      gender: 'girl'
    })
  }

  // 情形 ②: class 中同步调用 setState
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        name: '娜美'
      })
      this.setState({
        old: 13
      })
      this.setState({
        gender: 'girl'
      })
    })
  }

  render() {
    console.log('render')
    const { name, old, gender } = this.state
    return (
      <>{name}{old}{gender}</>
    )
  }
}
```

Hooks 中的 setState

```js
export default function() {
  const [name, setName] = useState('路飞')
  const [old, setOld] = useState('12')
  const [gender, setGender] = useState('boy')

  // 情形③: Hooks 中异步调用 setState
  useEffect(() => {
    setName('娜美')
    setOld('13')
    setGender('girl')
  }, [])

  // 情形④: Hooks 中同步调用 setState
  useEffect(() => {
    setTimeout(() => {
      setName('娜美')
      setOld('13')
      setGender('girl')
    }, 0)
  }, [])

  console.log('render')
  return (
    <>{name}{old}{gender}</>
  )
}
```

情形①、情形②、情形③、情形④ 中 render 输出的次数分别是 2, 4, 2, 4。可以看出在 React 中使用 class 写法和 hooks 写法是一一对应的。此外 `setState 的执行是异步还是同步取决于其执行环境`。

### 如何在 Hooks 中模拟 setState 的第二个参数

场景: 在使用类模式的 React 中有时会使用 setState 的第二个参数来完成某些异步回调操作(比如接口请求), 在 Hooks 中如何对齐类模式中的这种用法呢?

使用 useRef 来控制一个标志符;

> 具体见 [issue](https://github.com/facebook/react/issues/14174#issuecomment-437551476)

### Hooks 中的 useEffect 的执行时间是否与 componentDidMount/componentDidUpdate 相同

在 [timing-of-effects](https://reactjs.org/docs/hooks-reference.html#timing-of-effects) 中有提到 `useEffect` 的执行时机是在浏览器 layout 与 paint 之后, 与之相对的 `componentDidMount`/`componentDidUpdate` 的执行时机是在 layout 与 paint 之前(Hooks 中的 useLayoutEffect 与此相对)。

> useLayoutEffect 适用的场景为在 class 模式下在 componentDidMount/componentDidUpdate 中对样式进行调整的场景;

> [this-benchmark-is-indeed-flawed](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f): 此文用数据比较了 useEffect 与 componentDidMount/componentDidUpdate 的执行时机。

### Hooks 中模拟仅调用 componentDidUpdate 而不调用 componentDidMount

思路: 借助 `useRef` 跳过头一次的执行。

```js
function Demo() {
  const mounted = React.useRef(false)

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      // do something mock componentDidUpdate
    }
  })
}
```

### Hooks 中如何获取先前的 props 以及 state

React 官方在未来很可能会提供一个 `usePrevious` 的 hooks 来获取之前的 props 以及 state。

`usePrevious` 的核心思想是用 ref 来存储先前的值。

```js
function usePrevous(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
```

### Hooks 中如何调用实例上的方法

在 Hooks 中使用 useRef() 等价于在 Class 中使用 this.something。

```js
/* in a function */
const X = useRef()
X.current // can read or write

/* in a Class */
this.X    // can read or write
```

> [Is there something like instance variables](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)

### Hooks 中 getDerivedStateFromProps 的替代方案

在 [React 暗器百解](https://github.com/MuYunyun/blog/blob/master/React/React暗器百解.md) 中提到了 `getDerivedStateFromProps` 是一种反模式, 但是极少数情况还是用得到该钩子, Hooks 没有该 api, 那其如何达到 getDerivedStateFromProps 的效果呢?

```js
function ScrollView({row}) {
  const [isScrollingDown, setISScrollingDown] = setState(false)
  const [prevRow, setPrevRow] = setState(null)

  // 核心是创建一个 prevRow state 与函数调用方传进来的 row 进行比较
  if (row !== prevRow) {
    setISScrollingDown(prevRow !== null && row > prevRow)
    setPrevRow(row)
  }

  return `Scrolling down ${isScrollingDown}`
}
```

### Hooks 中 forceUpdate 的替代方案

可以使用 `useReducer` 来 hack `forceUpdate`, 但是尽量避免 forceUpdate 的使用。

```js
const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

function handleClick() {
  forceUpdate()
}
```

### Hooks 中 shouldComponentUpdate 的替代方案

在 Hooks 中可以使用 `useMemo` 来作为 `shouldComponentUpdate` 的替代方案, 但 `useMemo` 只对 props 进行浅比较。

```js
React.useMemo((props) => {
  // your component
})
```

#### useMemo 与 useCallback 的区别

```js
useMemo(() => <component />) 等价于 useCallback(<component />)
```

* useCallback: 一般用于缓存函数
* useMemo: 一般用于缓存组件

### 是否能使用 React Hooks 替代 Redux

在 React 16.8 版本之后, 针对`不是特别复杂`的业务场景, 可以使用 React 提供的 `useContext`、`useReducer` 实现自定义简化版的 redux, 可见 [todoList](https://github.com/MuYunyun/todoList) 中的运用。核心代码如下:

```js
import React, { createContext, useContext, useReducer } from "react"

// 创建 StoreContext
const StoreContext = createContext()

// 构建 Provider 容器层
export const StoreProvider = ({reducer, initialState, children}) => {
  return (
    <StoreContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StoreContext.Provider>
  )
}

// 在子组件中调用 useStoreContext, 从而取得 Provider 中的 value
export const useStoreContext = () => useContext(StoreContext)
```

但是针对特别复杂的场景目前不建议使用此模式, 因为 context 的机制会有性能问题。具体原因可见 [react-redux v7 回退到订阅的原因](https://github.com/reduxjs/react-redux/issues/1177)

#### 依赖列表中移除函数是否是安全的?

通常来说依赖列表中移除函数是不安全的。观察如下 demo

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
    [] // 🔴 这是不安全的, 因为在 doSomething 函数中使用了 someProps 属性
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

方法一: 将函数放入 `useEffect` 中, 同时将相关属性放入依赖项中。因为在依赖中改变的相关属性一目了然, 所以这也是首推的做法。

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
    console.log(someProp)
  }

  useEffect(
    () => {
      doSomething()
    },
    [doSomething]
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

* 方法一: 使用 `useState` 的懒初始化, 用法如下

```js
const [value, setValue] = useState(() => createExpensiveObj)
```

> 见 [lazy-initial-state](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state);

* 方法二: 使用自定义 useRef 函数

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

### 竞态

关于竞态(race condition) 的解决方法:

方案一: 提供一个标志符, 在 `clean effect` 阶段中将其置空。代码如下:

```js
function Article({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      const article = await API.fetchArticle(id);
      if (!didCancel) {
        setArticle(article);
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [id]);

  // ...
}
```

方案二: 使用 Suspense: Suspense 的机制能做到 `render as fetch`。见 [solving-race-conditions-with-suspense](https://reactjs.org/docs/concurrent-mode-suspense.html#solving-race-conditions-with-suspense)

### 相关资料

* [Hooks RFCS](https://github.com/reactjs/rfcs/pull/68#issuecomment-439314884)
* [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)
* [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889)
* [Vue Function-based API RFC](https://zhuanlan.zhihu.com/p/68477600)
