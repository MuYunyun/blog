### 开发一个 swiper 组件

### 前置知识

* touchstart

> e.touches[0].pageX, cdn 讲了其包含水平滚动的位置

### 核心思路

![](http://with.muyunyun.cn/8151b27a39eb385305185d0a67736011.jpg-400)

* 比如当前位于第 3 张图片位于中央的时候, 第 1、2 张图片位于左侧的 `rest`, 第 4、5 张图片位于右侧的 `rest`;
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
