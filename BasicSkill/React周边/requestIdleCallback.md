### requestIdleCallback api

```js
requestIdleCallback((deadline) => {
  console.log(deadline.timeRemaining())
}, {timeout: ...})
```

deadline 有两个参数

* timeRemaining(): 当前帧还剩下多少时间
* didTimeout: 是否超时

个人目前的猜测: `requestIdleCallback` 后如果跟上第二个参数 `{timeout: ...}` 则会强制浏览器在当前帧执行完后执行。

`timeRemaining()` 最大值是 50 ms, 相当于 `requestIdleCallback` 中 1 帧是 50ms, `FPS` 是 20(1000 / 50)。这低于流程的要求(一般流畅度的 FPS 的要求为 60)。所以这也是 react 需要自己实现 `requestIdleCallback` 的原因。

> 如果现在让我实现，我会尝试使用 `requestAnimationFrame` 来实现。

### 相关文章

* [你应该知道的 requestIdleCallback](https://segmentfault.com/a/1190000014457824)