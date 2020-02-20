这是一套基本的由浅入深考察前端知识体系的清单, 自测用:

### CSS

* 什么是 CSS 盒模型

```
包含 content, margin, border, padding
```

* 标准模型和 IE 模型有什么不同

```
是否将 padding 和 border 算进 content 的 width 中, 即在 IE 模型下, padding 和 border 会挤压 content 的空间
```

* CSS 如何设置这两种模型

```
box-sizing: content-box; // 标准模型(默认)
box-sizing: border-box;  // IE模型
```

* JS 如何设置获取盒模型对应的宽和高

```
dom.style.width             // 只支持内联样式
dom.currentStyle.width      // 只有 IE 支持
window.getComputedStyle
dom.getBoundingClientRect
```

* 如何实现垂直居中

见 [垂直居中](https://github.com/MuYunyun/blog/blob/master/BasicSkill/css/%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD.html)

* Flex 布局居中

```
justify-content: center； // 水平居中
align-item: center;       // 垂直居中
```

* BFC 的基本概念

* BFC 的原理

* 如何创建 BFC

前三个问题的解答看: [聊聊 BFC](https://github.com/MuYunyun/blog/blob/master/BasicSkill/css/聊聊BFC.md), 对如何创建 BFC 这个问题答主水平有限, 只实验了 overflow:hidden 这个属性, 个人建议回答好 BFC 原理即可。

### DOM 事件类

* DOM 事件的级别了解吗

```
DOM0: dom.onClick
DOM2: dom.addEventListener('click', () => {}, false)
DOM3: 在 1 的基础上加了鼠标键盘事件
```

> dom.addEventListener() 的第二个参数能跟 `{ handleEvent: () => {} }`

* DOM 事件模型了解吗

```
存在冒泡阶段和捕获阶段
```

* DOM 事件流了解吗

```
事件通过捕获到目标阶段, 目标阶段再进行冒泡
```

* 描述 DOM 事件捕获的具体流程

```
事件捕获 => window => document => html => body => 目标元素
```

* 讲一下事件委托(事件代理)

```
将绑定在子元素的事件绑定到父元素上, 然后可以通过 e.target 取到目标节点
```

* 自定义事件了解吗

```js
var event = new Event('custom')
dom.addEventListener('custom', () => {})
dom.dispatchEvent(event)
```

### 类型转换

* 了解显式转换、隐式转换吗？

```
显示转换:
隐式转换: 四则运算、if 语句、native 调用(console.log())
```

* 了解显式转换的过程吗

### HTTP 相关

> 见 https://github.com/MuYunyun/blog/blob/master/BasicSkill/http/http.md

### 原型链类

* 创建对象有几种方法

* 聊聊原型、构造函数、实例、原型链

* instanceof 的原理了解吗

* new 运算符的原理了解吗

```js
const new2 = function(func) {
  const o = Object.create(func.prototype)
  const result = func.call(o)
  if (typeof(result) === 'object') {
    return result
  } else {
    return o
  }
}
```

### 面向对象类

* 如何进行类的声明

* 如何生成实例

* 如何实现继承

* 各继承方式的优缺点

### 通信类

* 什么是同源策略及限制

* 如何创建 Ajax

```js
const xhr = new HttpRequest()

xhr.open('Get', '/abc', false)
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200 || xhr.status === 304) {
      console.log(xhr.responseText)
    }
  }
}

xhr.send(null)
```

* 跨域通信的几种方式

### 安全类

* 了解 CSRF 吗 ？ 如何防止 CSRF

* 了解 XSS 吗 ？ 如何防止 XSS

* session 与 token 有什么区别

```
session(会话) 存放在服务端, 每次打开网站就产生一个 session, 注销网站, session 就会销毁
token(令牌) 通常是由密码、时间戳混合盐算法一起生成
```

> 既然聊到了 cookie 的大小, 另外两个相关的

### 渲染机制类

* 什么是 DOCTYPE 及作用

* 浏览器解析和渲染过程

* 重排 Reflow

```
1.增减 dom 元素
2.元素的位置发生移动
3.元素尺寸(外间距、内间距、长宽)发生改变
4.浏览器的窗口大小改变
```

* 重绘 Repaint

```
1.重排必然会导致重绘
2.重绘不一定重排, 比如元素的颜色发生变化, 只会发生重绘
```

### 运行机制类

* 如何理解 JS 的单线程

没办法同时做两件事情

* 什么是 Event Loop

### 页面性能类

* 提升页面性能的方法有哪些