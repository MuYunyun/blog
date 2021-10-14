<!--
abbrlink: 5ljtr9ki
-->

```js
// 这个文件为上下文文件, 可以理解为承上启下作用
// module.exports = {
//   get query() {
//     return this.request.query    // 比如这个 this.request 为 ./request.js 中的内容
//   },

//   set body(content) {
//     this.response.body = content // 比如这个 this.response.body 为 ./response.js 的内容
//   },

//   get body() {
//     return this.response.body
//   },
// }

// 当 context 中属性越来越多, 我们可以使用 __defineGetter__ 以及 __defineSetter__
// 属性封装相应方法来减少重复劳动, 日后要增加属性只要在数组中填入相应字段就行。

const proto = {}

function set(type, property) {
  proto.__defineSetter__(property, function(val) {
    this[type][property] = val  // 这里 this 指向 proto, 原因指向调用函数的对象
  })
}

function get(type, property) {
  proto.__defineGetter__(property, function() {
    return this[type][property]
  })
}

const setRequest = []
const getRequest = ['query']
const setResponse = ['body', 'statusCode']
const getResponse = ['body', 'statusCode']

getRequest.forEach(r => {
  get('request', r)
})

setResponse.forEach(r => {
  set('response', r)
})

getResponse.forEach(r => {
  get('response', r)
})

module.exports = proto
```