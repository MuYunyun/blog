### Schedule

调度算法思想:

* 任务执行时间得足够短, 能在一帧时间内执行完;
* 不同任务存在不同的优先级;

> [当前实现](https://github.com/facebook/react/blob/master/packages/scheduler/src/forks/SchedulerHostConfig.default.js)

### 任务的种类

在一帧中执行的任务种类有以下几种类别:

* `user-blocking tasks`: 基于用户的交互的任务(可见), 需在当前帧处理; -> `input`、`rAF`、`microtask`(顺畅的交互应小于 10 ms, 下同)
* `default tasks`: 基于用户获取数据渲染到界面上的任务(可见), 在当前的帧以及下一帧里处理; -> `macrotask`(小于 100 ms)
* `idle tasks`: 和分析、缓存、排序相关的任务(不可见); -> `requestIdleCallback`(小于 10 ms)

> 不能拆分的任务(执行时间较长的 chunk)怎么办？

目前借助 `Worker`

### 任务的排序机制

任务的排序机制是由 `expiration time` 这个字段决定的，该字段表示过期时间(值越小, 越早执行), 为 `callback 的注册时间`与`当前任务优先级的值`之和。

优先级的值有以下几类:

* `Immediate`: (0ms timeout)需要实时交互的任务;
* `User Block`: (250ms timeout)对页面交互有副作用的任务;
* `Normal`: (5s timeout)不影响交互的任务;
* `Low`: (10s timeout)可以延迟执行，但最终需要执行的任务;
* `Idle`: (no timeout)执行与否不影响应用的任务;

在了解了 `expiration time` 之后, 对 Schedule 的流程进行如下概述:

1. 所有回调根据 `expiration time` 排好序放入一个队列中;
2. `Schedule` 自己注册一个回调 callback 调用该队列，并下一个帧中执行它;
3. 在下一帧中尽可能多地执行队形里的回调;

### 相关文章

* [scheduling-on-off-main-thread](https://developer.chrome.com/devsummit/schedule/scheduling-on-off-main-thread): 讲解了如何在帧里拆分任务以及使用 worker 的一些限制
* [Scheduling in React](https://philippspiess.com/scheduling-in-react/#fn-1): 任务的排序机制