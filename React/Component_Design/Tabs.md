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
  (this as any)[`tabScroll`].scrollTo({
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

这写法有如下坑
  * scrollTo 也是异步行为, 因此 requestAnimationFrame 动画是失效的;
  * `基于距离`判断精度不是很准确

因此改用为 scrollLeft, 以及基于时间来调整

```js
// t: 过去时间; b: 初始距离; c: 终点距离 d: 完成时间, todo: 相关公式后续了解
const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  const cc = c - b
  t /= d / 2
  if (t < 1) {
    return (cc / 2) * t * t * t + b
  } else {
    return (cc / 2) * ((t -= 2) * t * t + 2) + b
  }
}

function scrollToX(value: number, node: HTMLElement) {
  const scrollLeft = node.scrollLeft
  const startTime = Date.now()
  const frameFunc = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    node.scrollLeft = easeInOutCubic(time, scrollLeft, value, 450)
    if (time < 450) {
      requestAnimationFrame(frameFunc)
    } else {
      setScrollTop(value, node)
    }
  }
  requestAnimationFrame(frameFunc)
}
```

### 开发坑点

背景: `Tab` 下划线随着内容栏的滑动而动态滑动。

难点: 如何达到原生的顺滑效果。目前的方案是减少 `getBoundingClientRect` 的调用次数, 将需多次获取的值进行缓存。

### 开发坑点(五星)

背景坑点: `tab` 栏是可以滑动的, 在使用 `this.contentRectLeft = elm.getBoundingClientRect().left` 进行缓存时, 在 `tab` 滑动后期待取得的是 `tab` 距离`当前视口`左侧的值, 但是实际获取到的是当前 `tab` 距离滚动条最左侧的值。相关代码如下:

```js
afterChangeTab = (index: number) => {
  const { tabDirection } = this.props
  if (tabDirection === 'horizontal') {
    ...
    this.tabMove(this.tabMiddleDistance) // ①
    this.contentRectLeft = (this as any)[`tab${index}`].getBoundingClientRect().left // ②
    console.log(this.contentRectLeft) // 这个地方打印的是当前 `tab` 距离滚动条最左侧的值
  }
}

tabMove = (distance: number) => {
  const { tabs, tabDirection } = this.props
  // 如果是水平滑动时且 tab 栏的数量大于 4, tab 栏可滑动
  if (tabDirection === 'horizontal' && tabs.length > 4) {
    scrollTo((this as any)[`tabScroll`], distance, 'horizontal')
  }
  ...
}
```

造成的原因是调用 `this.tabMove` 中的 `scrollTo` 方法里调用了 `requestAnimationFrame`, 其也是一个异步的钩子。所以 ② 的代码执行是由于 `requestAnimationFrame` 的执行的！目前的解决方法只能取消 `scrollTo` 方法的调用尽管 tab 的滚动比较僵硬, 但是确保了 `this.contentRectLeft` 缓存的值的准确性。

```js
tabMove = (distance: number) => {
  const { tabs, tabDirection } = this.props
  // 如果是水平滑动时且 tab 栏的数量大于 4, tab 栏可滑动
  if (tabDirection === 'horizontal' && tabs.length > 4) {
    // scrollTo 里面有了 requestAnimationFrame 方法, 以及 scrollTo 都是一个异步的钩子, 会造成缓存
    // scrollTo((this as any)[`tabScroll`], distance, 'horizontal')
    // ;(this as any)[`tabScroll`].scrollTo({
    //   left: distance,
    //   top: 0,
    //   behavior: 'smooth',
    // })
    ;(this as any)[`tabScroll`].scrollLeft = distance
  }
  ...
}
```

> 多使用小黄鸭笔记法, 就能理出眉目, 理逻辑的时候可能觉得浪费时间, 但是这往往是解决问题最高效的方法。

### 关于设计模式

在开发组件 Tabs\Checkbox\Radio... 有以下两种模式可以选择

* 配置模式，标签的标题和内容放在 options/children

```js
<Tabs options={[{
  content: [],
  disabled: true,
}]} />
```

* children 模式：

```js
<Tab>
  <Tab.item>标签一</Tab.item>
  <Tab.item>标签二</Tab.item>
</Tab>
```

相对配置模式, children 模式更加贴近 React 的组件化编程。但是使用者可能对以下写法不生效会产生困惑。因为大多数组件库只会支持 Tab.Item 在 Tab 后面的情况。

```js
renderChildren = () => {
  return <>
    <Tab.item>标签一</Tab.item>
    <Tab.item>标签二</Tab.item>
  </>
}

render() {
  return (
    <Tab>
      {this.renderChildren}
    </Tab>
  )
}
```

### Tabs 支持传入自定义组件

使用 React.cloneElement 对传入的子组件进行处理是会有问题的, 因为此时只能接受 HTML 节点, 而不接受自定义组件的传入;

```js
return React.cloneElement(reactElement, {
  className: cx(),
  style: {}
})
```

只要做如下改造便可以完成接受自定义组件的传入

```js
return (
  <div className={cx()} style={}>
    { React.cloneElement(reactElement }
  </div>
)
```

### 一列长度特别长, 一列特别短的特殊处理

### 性能优化

默认情况下, 当进一个页面的时候就将 tabs 每一块内容区数据都请求了一遍, 如果每个 tab 页面接口数非常多的时候, 可能会有卡顿问题, 提供两种模式来进行优化:

方式一: 在 Tabs 组件切换 tab 时, 在触发的 onChange 中获取相应数据传入对应组件。

```js
<Tabs
  tabs={tabs}
  activeTab={page}
  onChange={(index, _e) => {
    if (index === 0) {
      /* 伪代码: 获取数据 A */
    } else if (index === 1) {
      /* 伪代码: 获取数据 B */
    } else if (index === 2) {
      /* 伪代码: 获取数据 C */
    }
    setPage(index)
  }}
>
  <A data={dataA} />
  <B data={dataB} />
  <C data={dataC} />
</Tabs>
```

方式二: 维护逻辑变量, 这里以 ifRead 是否已读(多多圈为例), 控制 A、B、C 组件的显示。

```js
<Tabs
  tabs={tabs}
  activeTab={page}
  onChange={(index, _e) => setPage(index)}
>
  <div>{ifRead0 || page === 0 ? <A /> : null}</div>
  <div>{ifRead1 || page === 1 ? <B /> : null}</div>
  <div>{ifRead2 || page === 2 ? <C /> : null}</div>
</Tabs>
```

相比较一的方式, 方式二的优势是将请求数据的逻辑被拆分到 A、B、C 各个子组件中, 劣势是需要维护逻辑变量。
