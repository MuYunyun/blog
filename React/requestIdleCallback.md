### requestIdleCallback api

`requestIdleCallback` 是在浏览器浏览器一帧内剩余空闲的时间内执行相应任务, 其用法大致如下:

```js
var tasksNum = 100000

requestIdleCallback(unImportWork)

function unImportWork(deadline) {
  while (deadline.timeRemaining() && tasksNum > 0) {
    console.log(`执行了${100000 - tasksNum + 1}个任务`)
    tasksNum--
  }

  if (tasksNum > 0) { // 在后面的帧中再继续执行
    requestIdleCallback(unImportWork)
  }
}
```

`deadline` 有两个参数

* `timeRemaining()`: 当前帧还剩下多少时间
* `didTimeout`: 是否超时

目前的猜测: `requestIdleCallback` 后如果跟上第二个参数 `{timeout: ...}` 则会强制浏览器在当前帧执行完后执行。

`timeRemaining()` 最大值是 `50 ms`, 相当于 `requestIdleCallback` 中 1 帧是 50ms, 这大于 16ms(一般流畅度的 `FPS` 为 60)。所以这也是 React 需要自己实现 `requestIdleCallback` 的原因。

### 实现一个 requestIdleCallback

`requestIdleCallback`: 在当前帧的 `idle` 执行优先级相对低的任务。

> `requestAnimationFrame` 会在下一帧执行优先级相对高的任务。

### 实现一个 requestIdleCallback

```js
var tasksNum = 100000

requestIdleCallback(unImportWork)

function unImportWork(deadline) {
  while (deadline.timeRemaining() && tasksNum > 0) {
    console.log(`执行了${100000 - tasksNum + 1}个任务`)
    tasksNum--
  }

  if (tasksNum > 0) { // 在后面的帧中再继续执行
    requestIdleCallback(unImportWork)
  }
}
```

#### 服务端的 hack

在不能使用 `dom` 的环境下, 借助 `setTimeout` 来 `hack`。

```js
requestIdleCallback = (frameCallback) => {
  setTimeout(frameCallback({
    timeRemaining() {
      return Infinity
    }
  }))
}
```

#### 浏览器端的

这里如何连接上下文

### 解读 Schedule 算法

浏览器端 DOM 调度算法, 其作用类似 `requestIdleCallback`, 它的实现有以下几点:

* 借助 `requestAnimationFrame` 实现, 在开始时记录时间以及帧;
* 利用 `postMessage` 将空闲工作放到绘制后执行;

#### 服务端

服务端是用 `setTimeout` 来 hack 的。

```js
let _callback = null;
const _flushCallback = function (didTimeout) {
  if (_callback !== null) {
    try {
      _callback(didTimeout);
    } finally {
      _callback = null;
    }
  }
};
requestHostCallback = function (cb, ms) {
  if (_callback !== null) {
    // 防止再次进入，一直在找机会执行.
    setTimeout(requestHostCallback, 0, cb);
  } else {
    _callback = cb;
    setTimeout(_flushCallback, 0, false);
  }
};
cancelHostCallback = function () {
  _callback = null;
};
shouldYieldToHost = function () {
  return false;
};
```

#### 客户端

- [ ] 分析进行中。。。

```js
export let requestHostCallback;
export let cancelHostCallback;
export let shouldYieldToHost;
export let getCurrentTime;

const ANIMATION_FRAME_TIMEOUT = 100;
let rAFID;
let rAFTimeoutID;
const requestAnimationFrameWithTimeout = function (callback) {
  // 这里在一帧中调用
  // schedule rAF and also a setTimeout
  rAFID = requestAnimationFrame(function (timestamp) {
    // cancel the setTimeout
    clearTimeout(rAFTimeoutID); // 正常帧调用是不会执行 setTimeout 的
    callback(timestamp);
  });
  rAFTimeoutID = setTimeout(function () {
    // cancel the requestAnimationFrame
    cancelAnimationFrame(rAFID); // 超过 100 ms 则停止当前 requestIdleCallback 的执行
    callback(getCurrentTime());
  }, ANIMATION_FRAME_TIMEOUT);
};

getCurrentTime = function () {
  return performance.now();
};

let scheduledHostCallback = null;
let isMessageEventScheduled = false;
let timeoutTime = -1;

let isAnimationFrameScheduled = false;

let isFlushingHostCallback = false;

let frameDeadline = 0;
// We start out assuming that we run at 30fps but then the heuristic tracking
// will adjust this value to a faster fps if we get more frequent animation
// frames.
let previousFrameTime = 33;
let activeFrameTime = 33;

shouldYieldToHost = function () {
  return frameDeadline <= getCurrentTime();
};

// 利用 `postMessage` 将空闲工作放到绘制后执行;
const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = function (event) {
  isMessageEventScheduled = false;

  const prevScheduledCallback = scheduledHostCallback;
  const prevTimeoutTime = timeoutTime;
  scheduledHostCallback = null;
  timeoutTime = -1;

  const currentTime = getCurrentTime();

  let didTimeout = false;
  if (frameDeadline - currentTime <= 0) {
    // There's no time left in this idle period. Check if the callback has
    // a timeout and whether it's been exceeded.
    if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
      // 即时没有时间也调用回调
      didTimeout = true;
    } else {
      // 当前帧没有时间同时没有 didTimeout 参数, 将剩下未完成的回调放到下一帧进行
      if (!isAnimationFrameScheduled) {
        // Schedule another animation callback so we retry later.
        isAnimationFrameScheduled = true;
        requestAnimationFrameWithTimeout(animationTick);
      }
      // Exit without invoking the callback.
      scheduledHostCallback = prevScheduledCallback;
      timeoutTime = prevTimeoutTime;
      return;
    }
  }

  if (prevScheduledCallback !== null) {
    isFlushingHostCallback = true;
    try {
      prevScheduledCallback(didTimeout);
    } finally {
      isFlushingHostCallback = false;
    }
  }
};

const animationTick = function (rafTime) {
  if (scheduledHostCallback !== null) {
  // Eagerly schedule the next animation callback at the beginning of the
  // frame. If the scheduler queue is not empty at the end of the frame, it
  // will continue flushing inside that callback. If the queue *is* empty,
  // then it will exit immediately. Posting the callback at the start of the
  // frame ensures it's fired within the earliest possible frame. If we
  // waited until the end of the frame to post the callback, we risk the
  // browser skipping a frame and not firing the callback until the frame
  // after that.
    // 尽量在一帧中靠前的地方调用 animation callback
    requestAnimationFrameWithTimeout(animationTick); // 当前帧执行
  } else {
    // No pending work. Exit.
    isAnimationFrameScheduled = false;
    return;
  }

  let nextFrameTime = rafTime - frameDeadline + activeFrameTime; // 最开始一帧是 33 ms, 不过 `activeFrameTime` 是动态调整的
  if (
    nextFrameTime < activeFrameTime &&
    previousFrameTime < activeFrameTime
  ) {
    // If one frame goes long, then the next one can be short to catch up.
    // If two frames are short in a row, then that's an indication that we
    // actually have a higher frame rate than what we're currently optimizing.
    // We adjust our heuristic dynamically accordingly. For example, if we're
    // running on 120hz display or 90hz VR display.
    // Take the max of the two in case one of them was an anomaly due to
    // missed frame deadlines.
    // 减小帧率
    activeFrameTime =
      nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
  } else {
    previousFrameTime = nextFrameTime;
  }
  frameDeadline = rafTime + activeFrameTime;
  if (!isMessageEventScheduled) {
    isMessageEventScheduled = true;
    port.postMessage(undefined);
  }
};

requestHostCallback = function (callback, absoluteTimeout) {
  scheduledHostCallback = callback;
  timeoutTime = absoluteTimeout;
  // isFlushingHostCallback 第一次为 false,
  if (isFlushingHostCallback || absoluteTimeout < 0) {
    // Don't wait for the next frame. Continue working ASAP, in a new event.
    port.postMessage(undefined);
  } else if (!isAnimationFrameScheduled) {
    // If rAF didn't already schedule one, we need to schedule a frame.
    isAnimationFrameScheduled = true;
    requestAnimationFrameWithTimeout(animationTick);
  }
};

cancelHostCallback = function () {
  scheduledHostCallback = null;
  isMessageEventScheduled = false;
  timeoutTime = -1;
};
```

> [requestIdleCallback polyful](https://github.com/facebook/react/blob/master/packages/scheduler/src/forks/SchedulerHostConfig.default.js)

### 相关文章

* [你应该知道的 requestIdleCallback](https://segmentfault.com/a/1190000014457824): `requestIdleCallback` 与 `requestAnimationFrame` 的一些区别
* [官方解释](https://github.com/facebook/react/issues/13206#issuecomment-418923831): `requestIdleCallback` 的解释

