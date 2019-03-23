### 你不知道的 requestIdleCallback

本文副标题是 `Request Schedule 源码解析一`。在本章中会介绍 `requestIdleCallback` 的用法以及其缺陷, 接着对 React 团队对该 api 的 hack 部分的源码进行剖析。在下一篇中会结合优先级对 React 的调度算法进行宏观的解释, 欢迎关注[个人博客](https://github.com/MuYunyun/blog)。

`React 调度算法` 与 `requestIdleCallback` 这个 api 息息相关。`requestIdleCallback` 的作用是是在浏览器一帧的剩余空闲时间内执行优先度相对较低的任务, 其用法如下:

```js
var tasksNum = 10000

requestIdleCallback(unImportWork)

function unImportWork(deadline) {
  while (deadline.timeRemaining() && tasksNum > 0) {
    console.log(`执行了${10000 - tasksNum + 1}个任务`)
    tasksNum--
  }

  if (tasksNum > 0) { // 在未来的帧中继续执行
    requestIdleCallback(unImportWork)
  }
}
```

`deadline` 有两个参数

* `timeRemaining()`: 当前帧还剩下多少时间
* `didTimeout`: 是否超时

另外 `requestIdleCallback` 后如果跟上第二个参数 `{timeout: ...}` 则会强制浏览器在当前帧执行完后执行。

### requestIdleCallback 的缺陷

> requestIdleCallback is called only 20 times per second - Chrome on my 6x2 core Linux machine, it's not really useful for UI work。—— from [Releasing Suspense](https://github.com/facebook/react/issues/13206#issuecomment-418923831)

也就是说 `requestIdleCallback` 的 FPS 只有 `20`, 这远远低于页面流畅度的要求！(一般 FPS 为 60 时对用户来说是感觉流程的, 即一帧时间为 16.7 ms), 这也是 React 需要自己实现 `requestIdleCallback` 的原因。

### 源码解析之 requestIdleCallback

#### 非 DOM 环境

在不能操作 DOM 的环境下, 可以借助 `setTimeout` 来模拟 `requestIdleCallback` 的实现。

```js
requestIdleCallback = (callback) => {
  setTimeout(callback({
    timeRemaining() {
      return Infinity
    }
  }))
}
```

下面将 React 源码中关于服务端的实现也呈现出来:

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
requestHostCallback = function (cb) {
  if (_callback !== null) {
    // 如果 _callback 不为空, 则将 requestHostCallback 放到下一个事件队列中再次执行
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

#### DOM 环境

在浏览器端的环境下, 介绍一个与 `requestIdleCallback` 功能相近的 api —— `requestAnimationFrame(callback)`, 其会在下次重绘前执行指定的回调函数，因此这个 api 在动效领域得到了广泛的使用。下面通过一个简单的 demo 来认识它:

```js
let frame
let n = 5
function callback(timeStamp) {
	console.log(timeStamp) // 开始执行回调的时间戳
	// 如果想要产生循环动画的效果, 需在回调函数中再次调用 requestAnimationFrame()
	while (n > 0) {
    requestAnimationFrame(callback)
    console.log('测试执行顺序')
		n--
	}
}

frame = requestAnimationFrame(callback) // 在下次重绘之前调用回调

// 如果想要销毁该回调, 可以执行 cancelAnimationFrame(frame)
```

执行上述代码, 控制台(chrome)打印如下数据:

```
先输出 5 次 '测试执行顺序'
1795953.649
1795970.318
1795986.987
1796003.656
1796020.325
...
```

可以看到在浏览器上一帧的时间大致为 `16ms`。同时可以看到 `requestAnimation(callback)` 中的 callback 也是异步的(只不过它是基于帧与帧间的异步), 所以上述打印结果是先打印出 5 次 '测试执行顺序' 后再依次打印出 5 个时间戳。

`requestHostCallback`(也就是 requestIdleCallback) 这部分源码的实现比较复杂, 可以将其分解为以下几个重要的步骤(有一些细节点可以看注释):

步骤一: 如果有优先级更高的任务, 则通过 `postMessage` 触发步骤四, 否则如果 `requestAnimationFrame` 在当前帧没有安排任务, 则开始一个帧的流程;
步骤二: 在一个帧的流程中调用 `requestAnimationFrameWithTimeout` 函数, 该函数调用了 `requestAnimationFrame`, 并对执行时间超过 `100ms` 的任务用 `setTimeout` 放到下一个事件队列中处理;
步骤三: 执行 `requestAnimationFrame` 中的回调函数 `animationTick`, 在该回调函数中得到当前帧的截止时间 `frameDeadline`, 并通过 `postMessage` 触发步骤四;
步骤四: 通过 `onmessage` 接受 `postMessage` 指令, 触发消息事件的执行。在 `onmessage` 函数中根据 `frameDeadline - currentTime <= 0` 判断任务是否可以在当前帧执行，如果可以的话执行该任务, 否则进入下一帧的调用。

```js
export let requestHostCallback;
export let cancelHostCallback;
export let shouldYieldToHost;
export let getCurrentTime;

const ANIMATION_FRAME_TIMEOUT = 100;
let rAFID;
let rAFTimeoutID;
// ② 调用 requestAnimationFrame, 并对执行时间超过 100 ms 的任务用 setTimeout 进行处理
const requestAnimationFrameWithTimeout = function (callback) {
  rAFID = requestAnimationFrame(function (timestamp) {
    clearTimeout(rAFTimeoutID);
    callback(timestamp); // 一帧中任务调用的核心流程的实现, 接着看第 ③ 步
  });
  // 如果在一帧中某个任务执行时间超过 100 ms 则终止该帧的执行并将该任务放入下一个事件队列中
  rAFTimeoutID = setTimeout(function () {
    cancelAnimationFrame(rAFID);
    callback(getCurrentTime());
  }, ANIMATION_FRAME_TIMEOUT);
};

getCurrentTime = function () {
  return performance.now();
};

let scheduledHostCallback = null; // 调度器回调函数
let isMessageEventScheduled = false; // 消息事件是否执行
let timeoutTime = -1;

let isAnimationFrameScheduled = false;

let isFlushingHostCallback = false;

let frameDeadline = 0; // 当前帧的截止时间

// 假设最开始的 FPS(feet per seconds) 为 30, 但这个值会随着动画帧调用的频率而动态变化
let previousFrameTime = 33; // 一帧的时间: 1000 / 30 ≈ 33
let activeFrameTime = 33;

shouldYieldToHost = function () {
  return frameDeadline <= getCurrentTime();
};

const channel = new MessageChannel();
const port = channel.port2;
// ④ 接受 `postMessage` 指令, 触发消息事件的执行。在其中判断任务是否在当前帧执行，如果在的话执行该任务
channel.port1.onmessage = function (event) {
  isMessageEventScheduled = false;

  const prevScheduledCallback = scheduledHostCallback;
  const prevTimeoutTime = timeoutTime;
  scheduledHostCallback = null;
  timeoutTime = -1;

  const currentTime = getCurrentTime();

  let didTimeout = false; // 是否超时
  // 如果当前帧已经没有时间剩余, 检查是否有 timeout 参数，如果有的话是否已经超过这个时间
  if (frameDeadline - currentTime <= 0) {
    if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
      // didTimeout 为 true 后, 在当前帧中执行(针对优先级较高的任务)
      didTimeout = true;
    } else {
      // 在下一帧中执行
      if (!isAnimationFrameScheduled) {
        isAnimationFrameScheduled = true;
        requestAnimationFrameWithTimeout(animationTick);
      }
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

// ③ requestAnimationFrame 的回调函数。传入的 rafTime 为执行该帧的时间戳。
const animationTick = function (rafTime) {
  // 如果存在调度器回调函数则在一帧的开头急切地安排下一帧的动画回调(急切是因为如果在帧的后半段安排动画回调的话, 就会增大下一帧超过 100ms 的几率, 从而会浪费一个帧的利用, 可以结合步骤②来理解这句话), 如果不存在调度器回调函数否则立马终止执行。
  if (scheduledHostCallback !== null) {
    requestAnimationFrameWithTimeout(animationTick);
  } else {
    isAnimationFrameScheduled = false;
    return;
  }

  let nextFrameTime = rafTime - frameDeadline + activeFrameTime; // 当前帧开始调用动画的时间 - 上一帧调用动画的截止时间 + 当前帧执行的时间，这里的 nextFrameTime 仅仅是临时变量
  // 如果连续两帧的时间都小于当前帧的时间, 则说明得调高 FPS
  if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
    // 将 activeFrameTime 的值减小相当于调高 FPS。同时取 nextFrameTime 与 previousFrameTime 中较大的一个以让前后两帧都不出问题。
    activeFrameTime =
      nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
  } else {
    previousFrameTime = nextFrameTime;
  }
  frameDeadline = rafTime + activeFrameTime; // 当前帧的截止时间(上面几行代码的目的是得到该 frameDeadline 值, 该值在 postMessage 会用来判断)
  if (!isMessageEventScheduled) {
    isMessageEventScheduled = true;
    port.postMessage(undefined); // 最后进入第④步, 通过 postMessage 触发消息事件。
  }
};

// DOM 环境下 requestIdleCallback 的实现, 这里第二个参数在最新的 requestIdleCallback 中因为对象类型
requestHostCallback = function (callback, absoluteTimeout) {
  scheduledHostCallback = callback; // 这里的 callback 为调度器回调函数
  timeoutTime = absoluteTimeout;
  if (isFlushingHostCallback || absoluteTimeout < 0) {
    // 针对优先级较高的任务不等下一个帧，在当前帧通过 postMessage 尽快执行
    port.postMessage(undefined);
  } else if (!isAnimationFrameScheduled) {
    // ① 如果 rAF 在当前帧没有安排任务, 则开始一个帧的流程
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

### 相关资料

* [requestIdleCallback polyful](https://github.com/facebook/react/blob/master/packages/scheduler/src/forks/SchedulerHostConfig.default.js)
