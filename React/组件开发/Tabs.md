### Tabs 组件

Tabs 组件在 Swipe 的组件上开发。

### 心得

* 在开发基础组件时(涉及到滚动、动画), `ref` 这个钩子还是会被大量用到的。在 `componentDidMount/componentDidUpdate` 中使用 `ref` 能勾静默刷新(即不再次走生命周期) dom 元素。

* 为了实现下划线平缓滑动的效果, 将其设计为单独一个 div。这里踩了个坑: 最开始是计算下划线的长度以及距离左侧的位置时在父节点使用 `getBoundingClientRect`, 此时为了得到子节点的宽度以及子节点间相关距离必须要减去相应的 `margin、padding` 属性的值。后来修正为在子节点上使用 `getBoundingClientRect` 减少了大量的代码。