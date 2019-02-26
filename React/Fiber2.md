### Fiber

```js
current tree => workInProgress tree => current tree
```

workInProgress tree: fiber node + other node(由 virtual dom 创建)，

fiber 里包含了创造节点后的[work](https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/shared/ReactSideEffectTags.js), 比如对于组件的生命周期、对于 html 组件的增加、改、删除都属于副作用。

[fiber 的根节点](https://github.com/facebook/react/blob/0dc0ddc1ef5f90fe48b58f1a1ba753757961fc74/packages/react-reconciler/src/ReactFiberRoot.js#L31)

### Fiber Constructor

如下是 `Fiber` 的属性, Fiber 完整属性可参考[这里](https://github.com/facebook/react/blob/6e4f7c788603dac7fccd227a4852c110b072fe16/packages/react-reconciler/src/ReactFiber.js#L78)，各个属性的作用是什么呢?

```js
{
  stateNode: new ClickCounter,
  type: ClickCounter, // 组件的类型
  alternate: null,
  key: null,
  updateQueue: null,
  memoizedState: {count: 0},
  pendingProps: {}, // 已经更新的 dom 但还未展示到页面上
  memoizedProps: {}, // show last rendering
  tag: 1, // Fiber 的类型
  effectTag: 0,
  nextEffect: null
}
```

* alternate: 指向其对应的 workInProgress tree
* effectTag: 副作用类型, 这个 effect 作用于 `commit` 阶段(总共有 render、commit 阶段)
* nextEffect: 下一个副作用

### Render phase

`HostRoot` 上使用 [renderRoot](https://github.com/facebook/react/blob/95a313ec0b957f71798a69d8e83408f40e76765b/packages/react-reconciler/src/ReactFiberScheduler.js#L1132)

* [performUnitOfWork](https://github.com/facebook/react/blob/95a313ec0b957f71798a69d8e83408f40e76765b/packages/react-reconciler/src/ReactFiberScheduler.js#L1056)
* [beginWork](https://github.com/facebook/react/blob/cbbc2b6c4d0d8519145560bd8183ecde55168b12/packages/react-reconciler/src/ReactFiberBeginWork.js#L1489)
* [completeUnitOfWork](https://github.com/facebook/react/blob/95a313ec0b957f71798a69d8e83408f40e76765b/packages/react-reconciler/src/ReactFiberScheduler.js#L879)
* [completeWork](https://github.com/facebook/react/blob/cbbc2b6c4d0d8519145560bd8183ecde55168b12/packages/react-reconciler/src/ReactFiberCompleteWork.js#L532)

`performUnitOfWork、completeUnitOfWork` 完成遍历，主要工作发生在 `beginWork、completeWork` 中。

### Commit phase

* [completeRoot](https://github.com/facebook/react/blob/95a313ec0b957f71798a69d8e83408f40e76765b/packages/react-reconciler/src/ReactFiberScheduler.js#L2306): 起始于这个方法
* [commitRoot](https://github.com/facebook/react/blob/95a313ec0b957f71798a69d8e83408f40e76765b/packages/react-reconciler/src/ReactFiberScheduler.js#L523): Commit phase 阶段主要执行的方法, 更新 dom 以及调用 commit 阶段执行的生命周期方法。

> 找 finishedWork 可以这样找: fiber root -current property-> current tree -> host fiber -alternate-> workInProgress(finshedWork) tree

commitRoot 的简单概要如下:

```js
function commitRoot(root, finishedWork) {
  commitBeforeMutationLifecycles() // getSnapShotBeforeUpdate
  commitAllHostEffects();          // operate dom, componentWillUnmount
  root.current = finishedWork;     // 将 finishedWork tree 置为 current tree
  commitAllLifeCycles();           // remaining lifecycles
}
```

* 提问: 为什么称呼从 `diff` 转为 `reconciliation`

### 参考链接

* [Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e)

- [ ] [react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)

fiber 架构是一个增量渲染,

> 阅读到:I strongly suggest that you are familiar with the following resources before continuing:

- [ ] [Lin Clark - A Cartoon Intro to Fiber - React Conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs)
