<!--
abbrlink: 290a4219
-->

这是一套基本的由浅入深考察前端知识体系的清单, 自测用:

### CSS

* 什么是 CSS 盒模型

* 标准模型和 IE 模型有什么不同

* CSS 如何设置这两种模型

* JS 如何设置获取盒模型对应的宽和高

* 如何实现垂直居中

* Flex 布局居中

* BFC 的基本概念

* BFC 的原理

* 如何触发(消除) BFC

### DOM 事件类

* DOM 事件的级别了解吗

* DOM 事件模型了解吗

* DOM 事件流了解吗

* 描述 DOM 事件捕获的具体流程

* 讲一下事件委托(事件袋里)

* 自定义事件了解吗

### 类型转换

* 了解显式转换、隐式转换吗？

* 了解显式转换的过程吗

### HTTP 相关

* HTTP 协议主要特点

* HTTP 报文组成部分

```
请求报文: 请求行 请求头 空行 请求体

响应报文: 响应行 响应头 空行 响应体
```

* HTTP 协议类: POST 和 GET 的区别

* HTTP 状态码

* 强缓存和协商缓存 [资料](https://www.cnblogs.com/lyzg/p/5125934.html)

* 持久连接

* 管线化

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
const xhr = new XMLHttpRequest()

xhr.open('GET', '/api', false)
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

* cookie 与 token 有什么区别

### 渲染机制类

* 什么是 DOCTYPE 及作用

* 浏览器解析和渲染过程

* 重排 Reflow

* 重绘 Repaint

### 运行机制类

* 如何理解 JS 的单线程

没办法同时做两件事情

* 什么是 Event Loop

### 页面性能类

* 提升页面性能的方法有哪些