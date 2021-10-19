(self.webpackChunkblog=self.webpackChunkblog||[]).push([[225],{90225:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>i});var o=n(59713),s=n.n(o),a=n(6479),r=n.n(a),l=(n(67294),n(3905));function p(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?p(Object(n),!0).forEach((function(e){s()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var c={};function i(t){var e=t.components,n=r()(t,["components"]);return(0,l.kt)("wrapper",u(u(u({},c),n),{},{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h3",null,"PureComponent 精髓"),(0,l.kt)("p",null,"使用 PureComponent 是优化 React 性能的一种常用手段, 相较于 Component, PureComponent 会在 render 之前自动执行一次 shouldComponentUpdate() 函数, 根据返回的 bool 值判断是否进行 render。其中有个重点是 PureComponent 在 shouldComponentUpdate() 的时候会进行 shallowEqual(浅比较)。"),(0,l.kt)("p",null,"PureComponent 的浅比较策略如下:"),(0,l.kt)("p",null,"对 prevState/nextState 以及 prevProps/nextProps 这两组数据进行浅比较:"),(0,l.kt)("p",null,"1.对象第一层数据未发生改变, render 方法不会触发；\n2.对象第一层数据发生改变(包括第一层数据引用的改变), render 方法会触发;"),(0,l.kt)("h4",null,"PureComponent 的实现"),(0,l.kt)("p",null,"照着上述思路我们来实现 PureComponent 的逻辑"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-js"}),"function PureComponent(props) {\n  this.props = props || {}\n  this.state = {}\n\n  isShouldComponentUpdate.call(this) // 为每个 PureComponent 绑定 shouldComponentUpdate 方法\n}\n\nPureComponent.prototype.setState = function(updater, cb) {\n  isShouldComponentUpdate.call(this) // 调用 setState 时, 让 this 指向子类的实例, 目的取到子类的 this.state\n  asyncRender(updater, this, cb)\n}\n\nfunction isShouldComponentUpdate() {\n  const cpState = this.state\n  const cpProps = this.props\n  this.shouldComponentUpdate = function (nextProps, nextState) {\n    if (!shallowEqual(cpState, nextState) || !shallowEqual(cpProps, nextProps)) {\n      return true  // 只要 state 或 props 浅比较不等的话, 就进行渲染\n    } else {\n      return false // 浅比较相等的话, 不渲染\n    }\n  }\n}\n\n// 浅比较逻辑\nconst shallowEqual = function(oldState, nextState) {\n  const oldKeys = Object.keys(oldState)\n  const newKeys = Object.keys(nextState)\n\n  if (oldKeys.length !== newKeys.length) {\n    return false\n  }\n\n  let flag = true\n  for (let i = 0; i < oldKeys.length; i++) {\n    if (!nextState.hasOwnProperty(oldKeys[i])) {\n      flag = false\n      break\n    }\n\n    if (nextState[oldKeys[i]] !== oldState[oldKeys[i]]) {\n      flag = false\n      break\n    }\n  }\n\n  return flag\n}\n")),(0,l.kt)("h4",null,"测试用例"),(0,l.kt)("p",null,"测试用例用 在 React 上提的一个 ",(0,l.kt)("a",u({parentName:"p"},{href:"https://github.com/facebook/react/issues/13438#issuecomment-414128918"}),"issue")," 中的案例, 我们期望点击增加按钮后, 页面上显示的值能够加 1。"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-js"}),"class B extends PureComponent {\n  constructor(props) {\n    super(props)\n    this.state = {\n      count: 0\n    }\n    this.click = this.click.bind(this)\n  }\n\n  click() {\n    this.setState({\n      count: ++this.state.count,\n    })\n  }\n\n  render() {\n    return (\n      <div>\n        <button onClick={this.click}>增加</button>\n        <div>{this.state.count}</div>\n      </div>\n    )\n  }\n}\n")),(0,l.kt)("p",null,"然而, 我们点击上述代码, 页面上显示的 0 分毫不动！！！"),(0,l.kt)("p",null,"揭秘如下:"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-js"}),"click() {\n  const t = ++this.state.count\n  console.log(t === this.state.count) // true\n  this.setState({\n    count: t,\n  })\n}\n")),(0,l.kt)("p",null,"当点击增加按钮, 控制台显示 ",(0,l.kt)("inlineCode",{parentName:"p"},"t === this.state.count")," 为 true, 也就说明了 setState 前后的状态是统一的, 所以 shallowEqual(浅比较) 返回的是 true, 致使 shouldComponentUpdate 返回了 false, 页面因此没有渲染。"),(0,l.kt)("p",null,"类似的, 如下写法也是达不到目标的, 留给读者思考了。"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-js"}),"click() {\n  this.setState({\n    count: this.state.count++,\n  })\n}\n")),(0,l.kt)("p",null,"那么如何达到我们期望的目标呢。揭秘如下:"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-js"}),"click() {\n  this.setState({\n    count: this.state.count + 1\n  })\n}\n")),(0,l.kt)("p",null,"感悟: 小小的一行代码里蕴藏着无数的 bug。"),(0,l.kt)("h4",null,"相关链接"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",u({parentName:"li"},{href:"https://github.com/facebook/react/issues/13438"}),"A doubt behaviour using the PureComponent")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",u({parentName:"li"},{href:"https://juejin.im/post/59cdaaccf265da066f6ac83b"}),"React 的性能优化（一）当 PureComponent 遇上 ImmutableJS")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",u({parentName:"li"},{href:"https://juejin.im/post/5b1caceb5188257d63226743"}),"React 性能优化方案之 PureComponent"))))}i.isMDXComponent=!0}}]);