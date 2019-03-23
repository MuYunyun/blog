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

但是 `behavior: 'smooth'` 在 ios 机子上是没有效果的, 所以结合 `requestAnimationFrame` 产生相应的兜底方案。效果可以见 Tabs 组件的滑动栏。

```js
// 水平平稳滑动, 兼容 IOS
const scrollHorizontalTo = (elm: any, distance: number) => {
  let leftPosition = elm.scrollLeft
  const diff = distance - elm.scrollLeft

  const callback = () => {
    leftPosition = leftPosition + diff / 5
    elm.scrollTo(leftPosition, 0)

    if (Math.abs(distance - leftPosition) < 1) {
      elm.scrollTo(distance, 0)
    } else {
      requestAnimationFrame(callback)
    }
  }

  requestAnimationFrame(callback)
}
```

完整的兜底代码:

```js
if (typeof window.getComputedStyle(document.body).scrollBehavior == 'undefined') {
  // 传统的JS平滑滚动处理代码...
  scrollHorizontalTo((this as any)[`tabScroll`], this.tabMiddleDistance)
} else {
  ; (this as any)[`tabScroll`].scrollTo({
    left: this.tabMiddleDistance, // 在支持 behavior: smooth 的则使用这个属性
    top: 0,
    behavior: 'smooth'
  })
}
```