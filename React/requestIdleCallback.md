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

### 实现一个 requestIdleCallback

`requestIdleCallback`: 在当前帧的 `idle` 执行优先级相对低的任务。

> `requestAnimationFrame` 会在下一帧执行优先级相对高的任务。

...未完待续

> [requestIdleCallback polyful](https://github.com/facebook/react/blob/eeb817785c771362416fd87ea7d2a1a32dde9842/packages/scheduler/src/Scheduler.js#L212-L222)

### 相关文章

* [你应该知道的 requestIdleCallback](https://segmentfault.com/a/1190000014457824)
* [官方解释](https://github.com/facebook/react/issues/13206)