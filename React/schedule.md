### Schedule

解决  `目标对象更快完成渲染`与`及时响应优先级更高任务`之间的矛盾。

### Perceived Performance

Perceived performance 可感知到的性能

在流畅性的章节中提到将主线程的一个长任务进行`时间分片`可以拆分为多个帧任务, 但如果同时存在多个任务则必然会存在一种竞争机制, 于是需要一种 `Schedule` 机制, 在时间分片中加入`动态优先级`的概念来真正避免卡顿现象。

### Schedule

调度算法思想:

* 任务执行时间得足够短, 能在一帧时间内执行完(时间分片);
* 不同任务存在不同的优先级;

### 任务的种类

在一帧中执行的任务种类有以下几种类别:

* `user-blocking tasks`: 基于用户的交互的任务(可见), 需在当前帧处理; -> `input`、`rAF`、`microtask`(顺畅的交互应小于 10 ms, 下同)
* `default tasks`: 基于用户获取数据渲染到界面上的任务(可见), 在当前的帧以及下一帧里处理; -> `macrotask`(小于 100 ms)
* `idle tasks`: 和分析、缓存、排序相关的任务(不可见); -> `requestIdleCallback`(小于 10 ms)

> 不能拆分的任务(执行时间较长的 chunk)怎么办？

借助 `web Worker`

### 任务的排序机制

任务的排序机制是由 `expiration time` 这个字段决定的，其值为 `callback 的注册时间`与`当前任务优先级的值`之和, 表示过期时间(值越小, 越早执行)。

优先级的值分为以下几种类别:

* `Immediate`: (0ms timeout)需要实时交互的任务;                       (Do it now)
* `User Block`: (250ms timeout)对页面交互有副作用的任务;      (Do it now)
* `Normal`: (5s timeout)不影响交互的任务;                                   (Do it soon)
* `Low`: (10s timeout)可以延迟执行，但最终需要执行的任务;  (Do it eventually)
* `Idle`: (no timeout)执行与否不影响应用的任务;                         (Do it if you can)

在了解了 `expiration time` 之后, 对 `Schedule` 的流程进行如下概述:

1. 所有回调根据 `expiration time` 排好序放入一个队列中;
2. `Schedule` 自己注册一个回调 callback 调用该队列，并下一个帧中执行它;
3. 在下一帧中尽可能多地执行队形里的回调;

### Schedule 源码分析

Schedule 中 4 个比较重要的方法的作用罗列如下:

* requestHostCallback: 提供调用下一帧的能力
* cancelHostCallback: 提供取消当前任务的能力
* shouldYieldToHost: 提供暂停当前任务的能力
* getCurrentTime: 根据该函数获取的值从而判断具体的优先级

### JND

JND(Just Noticeable Difference), [JND](https://github.com/MuYunyun/react/blob/0f1e97e7cb67b7e403af5f78f38294dfd33e081e/packages/react-reconciler/src/ReactFiberWorkLoop.js#L2144-L2167)

```js
// Computes the next Just Noticeable Difference (JND) boundary.
// The theory is that a person can't tell the difference between small differences in time.
// Therefore, if we wait a bit longer than necessary that won't translate to a noticeable
// difference in the experience. However, waiting for longer might mean that we can avoid
// showing an intermediate loading state. The longer we have already waited, the harder it
// is to tell small differences in time. Therefore, the longer we've already waited,
// the longer we can wait additionally. At some point we have to give up though.
// We pick a train model where the next boundary commits at a consistent schedule.
// These particular numbers are vague estimates. We expect to adjust them based on research.
function jnd(timeElapsed: number) {
  return timeElapsed < 120
    ? 120
    : timeElapsed < 480
      ? 480
      : timeElapsed < 1080
        ? 1080
        : timeElapsed < 1920
          ? 1920
          : timeElapsed < 3000
            ? 3000
            : timeElapsed < 4320
              ? 4320
              : ceil(timeElapsed / 1960) * 1960;
}
```

### Connection between Time Slicing and Suspense

`Time Slicing` is the premise of `Suspense`. Because in each time slicing it can compare the task priority, and then determine whether to show the loading.

![](http://with.muyunyun.cn/6999fa9b5759613e1dde3b2dfec7076d.jpg)

### is-input-pending

* 相比 `requestIdleCallback`, 其有更简洁的 api;
* 另外其不会受到优先级的限制;

> [is-input-pending](https://github.com/WICG/is-input-pending)

### 相关文章

* [scheduling-on-off-main-thread](https://developer.chrome.com/devsummit/schedule/scheduling-on-off-main-thread): 讲解了如何在帧里拆分任务以及使用 worker 的一些限制
* [Scheduling in React](https://philippspiess.com/scheduling-in-react/#fn-1): 任务的排序机制
* [main-thread-scheduling](https://github.com/WICG/main-thread-scheduling): schedule API in future. 核心是从最高优先级的任务中挑选时间过去最久的任务。
* [Scheduling is the Future](https://www.youtube.com/watch?reload=9&v=Iyrf52cwxQI&feature=youtu.be&utm_source=tinyreact&utm_medium=email): @ReactEurope 2019 speaker: @aweary
