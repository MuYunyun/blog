### 名词解释

在介绍 `Fiber` 之前, 需要对官网中出现的以下名词有个深刻的认知。

* `Reconciliation`: 调和算法, 得出 `Virtual Dom(针对 Web)` 之间的差异;
* `Render`: 将 `Reconciliation` 的结果刷新到界面上;
* `Scheduling`: 调度。`Recct` 通过内部的调度来安排不同优先级的任务在`最佳时刻`执行;
* `Fiber`: 链表数据结构的 `React` 实现(个人理解)。

> 平常大家说的 'Fiber' 其实是由上面这些名词组成的架构, Fiber 真正意义上只是一个链表数据结构的 React 实现版本。

> 在 Fiber 的数据结构下有助于实现 concurrent 以及 error boundary, 你觉得如何实现？

* 并发这个考虑 `Promise.all`?
* 可以通过链表锁定到具体的报错，让相应的 `error boundary` 展现

### Fiber

fiber 架构是一个增量渲染。

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

下面是对 `fiber` 对象中各属性的解释。

* `type`: 组件的类型
* `key`: 根据 `key` 字段判断该 `fiber` 对象是否可以复用
* `child`: 子链表的引用
* `sibling`: 相邻链表的引用
* `return`: 父链表的引用
* `pendingProps`: 和 `memoizedProps` 一起使用, 若 `pendingProps` 与 `memoizedProps` 相等, 则可以复用上一个 fiber 相关的输出
* `memoizedProps`
* `pendingWorkPriority`: 代表优先级的数字。数字越大，优先级越低(例外 0 —— no work)。这个字段是否更改，待确认
* `alternate`: 指向其对应的 `workInProgress fiber`
* `effectTag`: 副作用类型, 这个 effect 作用于 `commit` 阶段(总共有 render、commit 阶段)
* `nextEffect`: 下一个副作用
* `output`: 输出值

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

### 资料推荐

* [Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://medium.com/react-in-depth/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react-e1c04700ef6e)
* [react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
