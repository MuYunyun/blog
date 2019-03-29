### Tabs 组件

Tabs 组件在 Swipe 的组件上开发。

### 心得

* 在开发基础组件时(涉及到滚动、动画), `ref` 这个钩子还是会被大量用到的。在 `componentDidMount/componentDidUpdate` 中使用 `ref` 能勾静默刷新(即不再次走生命周期) dom 元素。

* 为了实现下划线平缓滑动的效果, 将其设计为单独一个 div。这里踩了个坑: 最开始是计算下划线的长度以及距离左侧的位置时在父节点使用 `getBoundingClientRect`, 此时为了得到子节点的宽度以及子节点间相关距离必须要减去相应的 `margin、padding` 属性的值。后来修正为在子节点上使用 `getBoundingClientRect` 减少了大量的代码。

### Tab 的平滑滚动

场景: 当 tabs 的数量大于 4 时可以滑动, 点击对应的 tab 项时将相应的 tab 移动到屏幕中间。

首先使用 `scrollTo` 这个 api, 并使用了 `behavior: 'smooth'` 来完成平滑过渡效果。

```js
if (tabs.length > 4) {
  ; (this as any)[`tabScroll`].scrollTo({
    left: this.tabMiddleDistance(),
    top: 0,
    behavior: 'smooth'
  })
}
```

但是 `behavior: 'smooth'` 在 ios 机子上是没有效果的, 所以结合 `requestAnimationFrame` 产生相应的兜底方案。

```js
/* 平滑滚动处理代码, 兼容 IOS */
// elm: 移动元素
// distance: 移动距离
// direction: 移动方向 horizontal: 水平 vertical: 竖直
// const scrollHorizontalTo = (elm: any, distance: number, direction = 'horizontal') => {
const scrollTo = (elm: any, distance: number, direction = 'horizontal') => {
  let position: number = 0

  if (direction === 'horizontal') {
    position = elm.scrollLeft
  } else if (direction === 'vertical') {
    position = elm.scrollTop
  }
  const diff = distance - position

  const callback = () => {
    position = position + diff / 20
    if (direction === 'horizontal') {
      elm.scrollTo(position, 0)
    } else {
      elm.scrollTo(0, position)
    }

    // 若距离目标距离小于 5, 则直接跳到目标位置。
    if (Math.abs(distance - position) < 5) {
      if (direction === 'horizontal') {
        elm.scrollTo(distance, 0)
      } else if (direction === 'vertical') {
        elm.scrollTo(0, distance)
      }
    } else {
      requestAnimationFrame(callback)
    }
  }

  requestAnimationFrame(callback)
}
```

### Tab 下划线随着内容栏的滑动而动态滑动

难点: 如何达到原生的顺滑效果。目前的方案是减少 `getBoundingClientRect` 的调用次数, 将需多次获取的值进行缓存。