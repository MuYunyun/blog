### Hooks 每次渲染带着一切

* 在 `hooks` 中每一次 `render` 都有自己的 `state` 和 `props`, 这和 `class` 中有点差异，见 [each-render-has-its-own-everything](https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-everything)

> `class` 中可以用闭包模拟 `hooks` 的表现; `hooks` 中可以使用 `ref` 模拟 `class` 的表现, 或者在第二个参数传入需要鉴别的参数;

### 诚实地写出 useEffect 的所有依赖

在以下 `demo` 中, `useEffect` 的第二个参数传入 `[]`, 希望 `useEffect` 里的函数只执行一次(类似在 `componentDidMount` 中执行一次), 页面上每隔 1s 递增 1。

```js
function Demo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return count;
}
```

但达到我们预期的效果了么? [demo](https://codesandbox.io/s/n3o2m1wpj4), 可以看到界面上只增加到 1 就停止了。原因就是传入的第二个参数 `[]` 搞的鬼, `[]` 表示没有外界状态对 `effect` 产生干扰。流程大致如下:

1. 第一次调用 `useEffect` 传入的 `count` 为 0, 于是 `setCount(0 + 1)`;
2. 受 `useEffect` 第二个参数 `[]` 的影响，所以相当于还是 `setCount(0 + 1)`;

那如何修正上述问题呢? 方法有两个(方法一为主, 方法二为辅):

* 方法一: 将 `[]` 改为 `[count]`
* 方法二: 将 `setCount(count + 1)` 改为 `setCount(count => count + 1)`。这种方法的思想是修正状态的值而不依赖外面传进的状态。

不过遇到 `setCount(count => count + 1)` 的情况就可以考虑使用 `useReducer` 了。

### useReducer

`useReducer` 将行为(dispatch) 和展现抽离开。

当更新的一个状态依赖于另一个状态时, 使用 `useReducer` 能避免调用多次 `useEffect`。见 [decoupling-updates-from-actions](https://overreacted.io/a-complete-guide-to-useeffect/#decoupling-updates-from-actions)

### useEffect 中公用函数的逻辑

```js
function Demo() {
  const [count, setCount] = useState(0);

  function getFetchUrl(query) {
    return `http://demo${query}`
  }

  useEffect(() => {
    const url = getFetchUrl('react')
  }, [getFetchUrl]);

  useEffect(() => {
    const url = getFetchUrl('redux')
  }, [getFetchUrl]);

  return count;
}
```

此时 `useEffect` 中传入的第二个参数 `getFetchUrl` 相当于每次都是新的, 所以每次都会请求数据, 那除了 `[getFetchUrl]` 将改为 `[]` 这种不推荐的写法外，有两种解决方法:

1. 提升 `getFetchUrl` 的作用域
2. 使用 `useCallback`(`useCallback` 的作用类似 `useMemo`)

> `React.memo` 修饰一个函数组件, `useMemo` 修饰一个函数。它们本质都是运用缓存。

### todo

- [ ] 完善 Each Render Has Its Own Everything 例子
- [ ] [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data/): 计划读, 可能涉及 susepense


### 相关资源

* [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
* [usehooks](https://github.com/gragland/usehooks)
* [a-complete-guide-to-useeffect](https://overreacted.io/a-complete-guide-to-useeffect/): 一定要读 Dan 的这篇文章
