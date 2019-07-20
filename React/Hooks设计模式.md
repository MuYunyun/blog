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

Hooks tip: something.current (a ref value) is just like this.something in a class (an instance field).

/* in a function */
const X = useRef()
X.current // can read or write

/* in a class */
this.X // can read or write

> [twitter](https://twitter.com/dan_abramov/status/1125223181701263360)

### Hooks vs Class in setState

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

- [ ] [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)

### 相关资料

* [RFCS](https://github.com/reactjs/rfcs/pull/68#issuecomment-439314884): hooks 设计的一些理念
