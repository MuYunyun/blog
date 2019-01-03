## React 特性剪辑(版本 16.0 ~ 16.9)

> Before you're going to hate it, then you're going to love it.

![](http://with.muyunyun.cn/18be54d827e9dde7d9e29d029e329334.jpg-400)

### Concurrent Render(贯穿 16)

在 18年的 [JSConf Iceland](https://www.youtube.com/watch?v=v6iR3Zk4oDY) 上, Dan 神提到 Concurrent Render 涉及到 CPU 以及 IO 这两方面。

![](http://with.muyunyun.cn/1daa3d783a4a7ed7f742882a08a3aa09.jpg-400)

Time Slicing 对应解决左侧的问题, Suspense 对应解决了右侧的问题。它们共同要解决的是的提升用户体验, 在更多的场景下都可以做到`可交互`。而 Fiber 架构是上述两者的基石。

#### Time Slicing

在 16 之前的版本的渲染过程可以想象成一次性潜水 30 米, 在这期间做不了其它事情(Stack Reconciler);

![](http://with.muyunyun.cn/39db8e34ec1ce048695c3bde132a739e.jpg-200)

痛点概括:

* 一次性渲染到底
* 中途遇到优先级更高的事件无法调整相应的顺序

接着拿上面的潜水例子为例, 现在变为可以每次潜 10 米, 分 3 个 chunk 进行; chunk 和 chunk 之间通过链表连接; chunk 间插入优先级更高的任务, 先前的任务被抛弃。

![](http://with.muyunyun.cn/02a6b5ac36b12b3c676157ef3985fe4a.jpg-200)

> 开启 Fiber 后，获取异步数据的方法应放到 render 后面的生命周期钩子里(phase 2 阶段)进行, 因为 render 前面的生命周期钩子(phase 1阶段)会被执行多次

> 注意: 并没有缩短原先组件的渲染时间(甚至还加长了)，但用户却能感觉操作变流畅了。

> [requestIdleCallback()](https://developers.google.com/web/updates/2015/08/using-requestidlecallback): 借力此 api, 浏览器能在空闲的时间处理低优先级的事。

#### Suspense(16.6, 16.8, 16.9)

Suspense 意思是能暂停当前组件的渲染, 当完成某件事以后再继续渲染。

* code splitting(16.6, 已上线): 文件懒加载。在此之前的实现方式是 [react-loadable](https://github.com/jamiebuilds/react-loadable)
* 并发模式(16.8, 2019 年 Q2 季度): 在文件懒加载的同时能做其它交互;
* data fetching(16.9 版本, 2019 年中): 数据动态呈现;

```js
import React, { lazy, Suspense } from 'react'
const OtherComponent = lazy(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <OtherComponent />
    </Suspense>
  )
}
```

一种简单的预加载思路, 可参考 [preload](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d)

```js
const OtherComponentPromise = import('./OtherComponent');
const OtherComponent = React.lazy(() => OtherComponentPromise);
```

### render 新增的返回类型

在 React16 版本中 render() 增加了一些返回类型，到目前为止支持的返回类型如下：

* React elements.
* Arrays and fragments.
* Portals.
* String and numbers.
* Booleans or null.

> [render](https://reactjs.org/docs/react-component.html#render)

其中 render() 支持返回 Arrays 能让我们少写一个父节点, 如下所示:

```js
const renderArray = () => [
  <div key="A">A</div>
  <div key="B">B</div>
]
```

> render() 支持返回数组的特性类似 [Fragments](https://reactjs.org/docs/fragments.html)(16.2), 使用 Fragments 可以不用写 key。

### Portals(传送门)

将 React 子节点渲染到指定的节点上

案例：实现一个 Modal 组件，[demo](https://codepen.io/gaearon/pen/yzMaBd)

另外关于 Portals 做到冒泡到父节点的兄弟节点这个现象, [demo](https://codepen.io/gaearon/pen/jGBWpE), 我想可以这样子实现：如果组件返回是 Portal 对象，则将该组件的父组件的上的事件 copy 到该组件上。其实并不是真的冒泡到了父节点的兄弟节点上。

### Error Boundaries

React 16 提供了一个新的错误捕获钩子 `componentDidCatch(error, errorInfo)`, 它能将子组件生命周期里所抛出的错误捕获, 防止页面全局崩溃。[demo](https://codepen.io/gaearon/pen/wqvxGa?editors=0010)

componentDidCatch 并不会捕获以下几种错误

* 事件机制抛出的错误(事件里的错误并不会影响渲染)
* Error Boundaries 自身抛出的错误
* 异步产生的错误
* 服务端渲染

### 服务端渲染

服务端渲染一般是作为最后的优化手段, 这里浅显(缺乏经验)谈下 React 16 在其上的优化。

在 React 16 版本中引入了 `React.hydrate()`, 它的作用主要是将相关的事件`注水`进 `html` 页面中, 同时会比较前端生成的 `html` 和服务端传到前端的 `html` 的文本内容的差异, 如果两者不一致将前端产生的文本内容替换服务端生成的(忽略属性)。

### 支持自定义属性

在 React 16 版本中, 支持自定义属性(推荐 `data-xxx`), 因而 React 可以少维护一份 attribute 白名单, 这也是 React 16 体积减少的一个重要因素。

### Context(16.3、16.6)

Context 相当于是用组件化的方式使用 global, 使用其可以共享认证的用户、首选语言(国际化)等一些全局的信息, 而不必通过组件一层层传递。

以下是比较冗余的传递:

```js
<Page riderId={riderId} />
// ... which renders ...
<RiderDetail riderId={riderId} />
// ... which renders ...
<RiderLevel riderId={riderId} />
// ... which renders ...
<Avatar riderId={riderId} />
```

在 `Context` 之前可以传递 `<Avatar>` 本身(Component Composition 的思想), 写法如下:

```js
function Page(props) {
  const avatar = <Avatar riderId={props.riderId} />
  return <RiderDetail avatar={avatar} />
}

<Page riderId={riderId} />
// ... which renders ...
<RiderDetail avatar={avatar} />
// ... which renders ...
<RiderLevel avatar={avatar} />
// ... which renders ...
{ props.avatar }
```

接着是使用 `Context` 书写的例子, 写法如下:

```js
const RiderContext = React.createContext(1) // 这里为默认值

function Page(props) {
  const riderId = props.riderId
  return (
    <RiderContext.Provider value={riderId}>
      <RiderDetail />
    </RiderContext.Provider>
  )
}

function RiderDetail() {
  return <RiderLevel />
}

class RiderLevel extends React.Component {
  static contextType = RiderContext
  render() {
    return <Avatar avatar={this.context} />;
  }
}
```

### 新的生命周期(16.3)

![](https://user-images.githubusercontent.com/12389235/41266906-b6a6e75a-6e2b-11e8-8266-9597b2d57f11.png)

在未来 17 的版本中，将移除的生命周期钩子如下:

* `componentWillMount()`: 移除这个 api 基于以下两点考虑:
  * 服务端渲染: 在服务端渲染的情景下, componentWillMount 执行完立马执行 render 会导致 componentWillMount 里面执行的方法(获取数据, 订阅事件) 并不一定执行完;
  * Concurrent Render: 在 fiber 架构下, render 前的钩子会被多次调用, 在 componentWillMount 里执行订阅事件就会产生内存泄漏;

> 迁移思路, 将以前写在 `componentWillMount` 的获取数据、时间订阅的方法写进 `componentDidMount` 中;

* `componentWillReceiveProps(nextProps)`: 移除这个 api 基于如下考虑:
  * 语义不太契合逻辑
  * phase1 阶段会多次调用

新的钩子 `getDerivedStateFromProps()` 更加纯粹, 它做的事情是将新传进来的属性和当前的状态值进行对比, 若不一致则更新当前的状态。

```js
getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.riderId !== prevState.riderId) {
    return {
      riderId: nextProps.riderId
    }
  }
  // 返回 null 则表示 state 不用作更新
  return null
}
```

另外关于 componentWillReceiveProps() 在 15 里大量使用的一个场景: 比如切换 tab 时都要重新获取当前页面的数据, 之前通常会这么做:

```js
componentWillReceiveProps(nextProps) {
  if (nextProps.riderId !== this.props.riderId) {
    fetchData(nextProps.riderId)
  }
}
```

在 16 中可以使用 memoize 来代替, 写法如下:

```js
import memoize from "memoize-one"

class Demo extends React.Component {
  fetchDataDemo = memoize((riderId) => fetchData(riderId))

  componentDidUpdate() {
    fetchDataDemo(this.props.riderId)
  }
}
```

* `componentWillUpdate()`: 目前将其理解为和 `componentWillMount` 一样的情况

在 React 16.3 的版本中，新加入了两个生命周期:

* `getDerivedStateFromProps(nextProps, prevState)`: 更加语义化, 用来替代 `componentWillMount()` 和 `componentWillReceiveProps(nextProps)`;

* `getSnapshotBeforeUpdate(prevProps, prevState)`: 可以将该钩子返回的结果传入 componentDidUpdate 的第三个参数中, 从而达到 dom 数据统一。用来替代 componentWillUpdate();

> 具体 demo 可见 [Update on Async Rendering](https://react.docschina.org/blog/2018/03/27/update-on-async-rendering.html#initializing-state)

### React.memo(16.6)

`React.memo` 是一个高阶组件, 它使无状态组件拥有有状态组价中的 `shouldComponentUpdate()` 以及 `PureComponent` 的能力。

```js
const MyComponent = React.memo(function MyComponent(props) {
  ...
})
```

### Hooks(16.7)

在 React 16.7 之前，React 有两种形式的组件，有状态组件(类)和无状态组件(函数)。Hooks 的意义就是赋能先前的无状态组件，让之变为有状态。这样一来更加契合了 React 所推崇的函数式编程。

接下来梳理 Hooks 中最核心的 2 个 api, `useState` 和 `useEffect`

#### useState

useState 返回状态和一个更新状态的函数

```js
const [count, setCount] = useState(initialState)
```

使用 Hooks 相比之前用 class 的写法最直观的感受是更为简洁

```js
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

#### useEffect(fn)

在每次 render 后都会执行这个钩子。可以将它当成是 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 的合集。因此使用 useEffect 比之前优越的地方在于：

1. 可以避免在 `componentDidMount、componentDidUpdate` 书写重复的代码;
2. 可以将关联逻辑写进一个 `useEffect`(在以前得写进不同生命周期里);

### React 的未来

![](http://with.muyunyun.cn/fd1dd7ca2ba34bebef2d489c63befa25.jpg-200)

今年的 React Conf 的一张图, 可以看到 React 从出来到现在势头呈稳健上升趋势, 并在 2018 年这个节点上把 Jquery 拉下了王座。但可以看见 React 未来还有一段很长的路要走。

### 相关链接

* [reactjs.org](https://reactjs.org/blog/all.html)