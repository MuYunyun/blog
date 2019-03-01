### 开发一个 React Swipe(走马灯) 组件

事件是交给原生事件还是交由 React 的合成事件呢? 在最初的实现中参考 [react-swipe](https://github.com/voronianski/react-swipe/blob/gh-pages/src/index.js) 相当于是自己封装原生事件。

但是在 React 的生态下，还是尽量用 `React` 封装的合成事件更为妥当。举几个原因:

1. 兼容性方面的东西不用自己维护了;
2. 测试用例用 `.simulate` 的时候能统一;

> 原生事件和 React 合成事件类似鱼和熊掌不可兼得。

### 前置知识

* touchStart
* touchMove
* touchEnd
* transitionend

> e.touches[0].pageX, cdn 讲了其包含水平滚动的位置

### 核心思路

![](http://with.muyunyun.cn/8151b27a39eb385305185d0a67736011.jpg-400)

* 比如当前位于第 3 张图片位于中央的时候, 第 1、2 张图片位于左侧的 `rest`, 第 4、5 张图片位于右侧的 `rest`;

初始化阶段对任何窗口执行以下算法:

1. `向左平移当前窗口数 * width`
2. 给除了当前展示页加上/减去 `width`

* 每次只操作当前的 `index`, 和其左右的元素 `index - 1`、`index + 1`;
* 自动滑动用的是 css 中的 `transitionDuration` 属性以及 `transform` 属性来完成

### 理解易错点

```js
delta = {
  x: touches.pageX - start.x,
  y: touches.pageY - start.y
};
```

* 手势从左往右滑动是向左滑动 `delta.x > 0`, 手势从右往左滑动是向右滑动 `delta.x < 0`

### 测试用例之坑

`jest` 跑如下测试用例, 当跑到 `componentDidMount` 里的 `document.getElementById('demo')` 并不拿到相应元素。

```js
mount(<Swipe>
  <div key="1">PANE 1</div>
  <div key="2">PANE 2</div>
  <div key="3">PANE 3</div>
  <div key="4">PANE 4</div>
</Swipe>)
```

```jsx
componentDidMount() {
  document.getElementById('demo')
}

render() {
  return (
    <div id="demo">...</div>
  )
}
```

原因是因为 `mount` 只渲染组件不挂载到 `dom` 上去。解决思路如下:

```js
mount(<Swipe>
  <div key="1">PANE 1</div>
  <div key="2">PANE 2</div>
  <div key="3">PANE 3</div>
  <div key="4">PANE 4</div>
</Swipe>, { attatch: document.body })
```
