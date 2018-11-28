## React16.x 特性剪辑

本文整理了 React 16.x 出现的耳目一新的概念与 api 以及应用场景。

### 16.0 Fiber

在 16 之前的版本的渲染过程可以想象成一次性潜水 30 米，在这期间做不了其它事情(Stack Reconciler);

![](http://with.muyunyun.cn/39db8e34ec1ce048695c3bde132a739e.jpg-200)

痛点概括:

* 一次性渲染到底
* 中途遇到优先级更高的事件无法调整相应的顺序

在 16 版本上, React 带来了 Fiber 的架构, 接着拿上面的潜水例子为例，现在变为可以每次潜 10 米，分 3 个 chunk 进行; chunk 和 chunk 之间通过链表连接; chunk 间插入优先级更高的任务, 先前的任务被抛弃。

![](http://with.muyunyun.cn/02a6b5ac36b12b3c676157ef3985fe4a.jpg-200)

> 开启 Fiber 后，获取异步数据的方法应放到 render 后面的生命周期钩子里(phase 2 阶段)进行, 因为 render 前面的生命周期钩子(phase 1阶段)会被执行多次

> 注意: 并没有缩短原先组件的渲染时间(甚至还加长了)，但用户却能感觉操作变流畅了。

> requestIdleCallback(): 借力此 api, 浏览器能在空闲的时间处理低优先级的事

### render()

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
  <div>A</div>
  <div>B</div>
]
```

> 个人认为 render() 支持返回数组的特性完全可以取代 [Fragments](https://reactjs.org/docs/fragments.html)

### Context

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

在 `Context` 之前可以传递 `<Avatar>` 本身(component composition 的思想):

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

### life cycle

在 React 16.3 的版本中，新加入了两个生命周期：

* `getDerivedStateFromProps(nextProps, prevState)`: 更加语义化, 用来替代 componentWillMount、componentWillReceiveProps(nextProps);

* `getSnapshotBeforeUpdate(prevProps, prevState)`: 可以将结果传入 componentDidUpdate 里, 从而达到 dom 数据统一。用来替代 componentWillUpdate()（缺点是 React 开启异步渲染后，componentWillUpdate() 与 componentDidUpdate() 间获取的 dom 会不统一;

### 16.7 Hooks

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
2. 可以将关联逻辑写进一个 `useEffect`;(在以前得写进不同生命周期里);

> 在上述提到的生命周期钩子之外，其它的钩子是否在 hooks 也有对应的方案或者舍弃了其它生命周期钩子, 后续进行观望。
