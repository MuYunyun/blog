<!--
abbrlink: 55kdze2t
-->

### setState 是同步还是异步的?

```js
class App extends React.Component {
  state = {
    num: 0
  };

  analyze = () => {
    this.setState({
      num: this.state.num + 1
    });
    console.log("num", this.state.num);
    this.setState({
      num: this.state.num + 1
    });
    console.log("num", this.state.num);
    this.setState({
      num: this.state.num + 1
    });
    console.log("num", this.state.num);
  };

  handleClick = () => {
    this.analyze(); // ①
    // setTimeout(() => { // ②
    //   this.analyze();
    // }, 0);
  };

  render() {
    return <button onClick={this.handleClick}>click button</button>;
  }
}
```

① 处代码打印结果: 0 0 0;
② 处代码打印结果: 1 2 3;

> [demo 演示](https://codesandbox.io/s/6l98prq3nk)

为什么会出现这样的现象呢, 相关源码如下:

```js
// 如果满足一定条件, 则对 setState 做批量更新
function batchedUpdates(fn) {
  const previousIsBatchingUpdates = isBatchingUpdates;
  isBatchingUpdates = true;
  try {
    return fn(a); // 相当于所有 setState 都在这里执行, 相当于就是异步执行 setState 了。可见上述 demo
  } finally {
    isBatchingUpdates = previousIsBatchingUpdates;
    if (!isBatchingUpdates && !isRendering) {
      performSyncWork();
    }
  }
}

// setState 会进这个函数
function requestWork(root, expirationTime) {
  addRootToSchedule(root, expirationTime);
  if (isRendering) {
    return;
  }

  if (isBatchingUpdates) {
    // Flush work at the end of the batch.
    if (isUnbatchingUpdates) {
      // ...unless we're inside unbatchedUpdates, in which case we should
      // flush it now.
      nextFlushedRoot = root;
      nextFlushedExpirationTime = Sync;
      performWorkOnRoot(root, Sync, false);
    }
    return;
  }

  // 如果 isBatchingUpdates 为 false 则执行这里, 相当于 setState 每次调用这里, 就是同步的了
  if (expirationTime === Sync) {
    performSyncWork();
  } else {
    scheduleCallbackWithExpirationTime(root, expirationTime);
  }
}
```

依赖上下文中 `isBatchingUpdates` 等相关布尔值, 如果 `isBatchingUpdates` 为 `true` 则进行批量更新, 如果 `isBatchingUpdates` 为 `false` 则进行同步更新