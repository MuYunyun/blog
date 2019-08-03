Hooks 新人培训演讲概要

### React Hooks 使用中的问题

#### 闭包陷阱

* demo1: [Demo 地址](https://codesandbox.io/s/22y21468r)

演讲思路:

1. hooks demo 演示 —— 闭包
2. class 有这个问题么
3. hooks 修正成 class 中的表现
4. class 修正成 hooks 中的表现

* demo2:

### 为什么要提供 useInterval 钩子?

由 Class 转换过来的用户习惯 `setCount(count + 1))` 的方式。但在 Hooks 中这样子使用会产生闭包问题导致 `count` 不会增加。

```js
function Demo() {
  const [count, setCount] = React.useState(0)
  useEffect({
    setInterval(
      () => setCount(count + 1),
    2000)
  }, [])
  return (
    <div>Count: {count}</div>
  )
}
```

为此提供 `useInterval` 钩子

```js
function useInterval(callback, delay: number) {
  const cbRef = useRef({})
  useEffect(() => {
    cbRef.current = callback
  }, [callback])
  useEffect(() => {
    setInterval(() => {
      cbRef.current()
    }, delay)
  }, [delay])
}
```

用法:

```js
function Demo() {
  const [count, setCount] = React.useState(0)

  useInterval(() => {
    setCount(count + 1)
  }, 2000)

  return (<div>Count: {count}</div>)
}
```