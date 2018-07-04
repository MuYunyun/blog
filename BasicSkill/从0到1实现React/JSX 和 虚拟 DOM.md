本系列的初衷是解析 preact, 并从 0 开始实现一个类 React 框架。

### 组件的实现

```js
// import React, { Component } from 'react'
import { h, Component } from 'preact';

class A extends Component {
	render() {
		return <div>I'm componentA</div>;
	}
}

render(<A />, document.body); // 组件的挂载
```

* h 的作用 ？
* 什么时候调用 h 的

从代码上可以看到 A 是一个继承了 Component 的函数，但是 `<A />` 就变成了一个我们常说的组件了，我们对其进行打印 `console.log(<A />)`，结果如下：

```json
{
  attributes: undefined,
  children: [],
  key: undefined,
  nodeName: ƒ A()
}
```

相当于 `<A />` 将函数 A 转为相应的对象，至于怎么转换的，后面分析。

我们再来看看函数 A 从 Component 类中继承到了什么，查看 [component](https://github.com/developit/preact/blob/master/src/component.js) 函数，简化如下：

```js
function Component(props, context) {
  this._dirty = true
  this.context = context
  this.props = props
  this.state = this.state || {}
  this._renderCallbacks = []
}

// 更新组件状态并重新渲染
Component.prototype.setState = function() {}

// 立即执行组件的同步重新渲染
Component.prototype.forceUpdate = function() {}
```

### JSX 和 虚拟 DOM

```js
const element = (
  <div className="title">
    hello<span className="content">world!</span>
  </div>
)
```

JSX 是一种语法糖，经过 [babel](https://babeljs.io/en/repl) 转换结果如下，可以发现实际上转化成 `React.createElement()` 的形式：

```js
var element = React.createElement(
  "div",
  { className: "title" },
  "hello",
  React.createElement(
    "span",
    { className: "content" },
    "world!"
  )
);
```

[打印](https://preactjs.com/repl) element, 结果如下：

```js
{
  attributes: {className: "title"}
  children: ["hello", t] // t 和外层对象相同
  key: undefined
  nodeName: "div"
}
```

因此，我们得出结论：jsx 语法糖经过 babel 编译后转换成一种对象，该对象即所谓的`虚拟 dom`。

我们按照这种思路进行函数的构造：

```js
const React = {
  createElement
}

function createElement(tag, attr, ...child) {
  return {
    attributes: attr,
    children: child,
    key: undefined,
    nodeName: tag,
  }
}

// 测试
const element = (
  <div className="title">
    hello<span className="content">world!</span>
  </div>
)

console.log(element) // 打印结果符合预期
// {
//   attributes: {className: "title"}
//   children: ["hello", t] // t 和外层对象相同
//   key: undefined
//   nodeName: "div"
// }
```
