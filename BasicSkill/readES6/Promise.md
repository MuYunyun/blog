<!--
abbrlink: l9w7axkn
-->

### Promise/A+ 核心

![](http://with.muyunyun.cn/e1a0c15c44f9b014aa78d7b7620db474.jpg-200)

在实现一个符合 Promise/A+ 规范的 promise 之前, 先了解下 Promise/A+ 核心, 想更全面地了解可以阅读 [Promise/A+规范](https://segmentfault.com/a/1190000002452115)

* Promise 操作只会处在 3 种状态的一种: 未完成态(pending)、完成态(resolved)、失败态(rejected);
* Promise 的状态只会出现从未完成态向完成态或失败态转化;
* Promise 的状态一旦转化, 将不能被更改;

### Promise api

#### Promise.resolve()

Promise.resolve() 括号内有 4 种情况

```js
/* 跟 Promise 对象 */
Promise.resolve(Promise.resolve(1))
// Promise {state: "resolved", data: 1, callbackQueue: Array(0)}

/* 跟 thenable 对象 */
var thenable = {
  then: function(resolve, reject) {
    resolve(1)
  }
}

Promise.resolve(thenable)
// Promise {state: "resolved", data: 1, callbackQueue: Array(0)}

/* 普通参数 */
Promise.resolve(1)
// Promise {state: "resolved", data: 1, callbackQueue: Array(0)}

/* 不跟参数 */
Promise.resolve()
// Promise {state: "resolved", data: undefined, callbackQueue: Array(0)}
```

#### Promise.reject()

相较于 Promise.resolve(), Promise.reject() 原封不动地返回参数值

#### Promise.all(arr)

对于 Promise.all(arr) 来说, 在参数数组中所有元素都变为决定态后, 然后才返回新的 promise。

```js
// 以下 demo, 请求两个 url, 当两个异步请求返还结果后, 再请求第三个 url
const p1 = request(`http://some.url.1`)
const p2 = request(`http://some.url.2`)

Promise.all([p1, p2])
  .then((datas) => { // 此处 datas 为调用 p1, p2 后的结果的数组
    return request(`http://some.url.3?a=${datas[0]}&b=${datas[1]}`)
  })
  .then((data) => {
    console.log(msg)
  })
```

#### Promise.race(arr)

对于 Promise.race(arr) 来说, 只要参数数组有一个元素变为决定态, 便返回新的 promise。

```js
// race 译为竞争, 同样是请求两个 url, 当且仅当一个请求返还结果后, 就请求第三个 url
const p1 = request(`http://some.url.1`)
const p2 = request(`http://some.url.2`)

Promise.race([p1, p2])
  .then((data) => { // 此处 data 取调用 p1, p2 后优先返回的结果
    return request(`http://some.url.3?value=${data}`)
  })
  .then((data) => {
    console.log(data)
  })
```

#### Promise.wrap(fn) —— 回调函数转 Promise

通过下面这个案例, 提供回调函数 Promise 化的思路。

```js
function foo(a, b, cb) {
  ajax(
    `http://some.url?a=${a}&b=${b}`,
    cb
  )
}

foo(1, 2, function(err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
```

如上是一个传统回调函数使用案例, 假如现在有个函数 Promise.wrap(), 使用其包裹 foo 函数从而使之 promise 化, 用法如下:

```js
const promiseFoo = Promise.wrap(foo)

promiseFoo(1, 2)
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
```

让我们来实现 Promise.wrap() 函数:

```js
Promise.wrap = function(fn) {
  return funtion(...args) {
    return new Promise((resolve, reject) => {
      fn.apply(null, args.concat((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }))
    })
  }
}
```

#### then/catch/done

这几个 api 比较简单, 合起来一起带过

```js
Promise.resolve(1)
  .then((data) => {console.log(data)}, (err) => {console.log(err)}) // 链式调用, 可以传一个参数(推荐), 也可以传两个参数
  .catch((err) => {console.log(err)}) // 捕获链式调用中抛出的错误 || 捕获变为失败态的值
  .done()                             // 能捕获前面链式调用的错误(包括 catch 中), 可以传两个参数也可不传
```

### 实现一个 Promise

> 实践了一个符合 Promise/A+ 规范的 [repromise](https://github.com/MuYunyun/repromise)。

#### 坑点 1: 事件循环

> 事件循环: 同步队列执行完后, 在指定时间后再执行异步队列的内容。

之所以要单列事件循环, 因为代码的执行顺序与其息息相关, 此处用 setTimeout 来模拟事件循环；

下面代码片段中, ① 处执行完并不会马上执行 setTimeout() 中的代码(③), 而是此时有多少次 then 的调用, 就会重新进入 ② 处多少次后, 再进入 ③

```js
excuteAsyncCallback(callback, value) {
  const that = this
  setTimeout(function() {
    const res = callback(value) // ③
    that.excuteCallback('fulfilled', res)
  }, 4)
}

then(onResolved, onRejected) {
  const promise = new this.constructor()
  if (this.state !== 'PENDING') {
    const callback = this.state === 'fulfilled' ? onResolved : onRejected
    this.excuteAsyncCallback.call(promise, callback, this.data)              // ①
  } else {
    this.callbackArr.push(new CallbackItem(promise, onResolved, onRejected)) // ②
  }
  return promise
}
```

#### 坑点 2: this 的指向问题

this.callbackArr.push() 中的 this 指向的是 ‘上一个’ promise, 所以类 CallbackItem 中, this.promise 存储的是'下一个' promise(then 对象)。

```js
class Promise {
  ...
  then(onResolved, onRejected) {
    const promise = new this.constructor()
    if (this.state !== 'PENDING') {        // 第一次进入 then, 状态是 RESOLVED 或者是 REJECTED
      const callback = this.state === 'fulfilled' ? onResolved : onRejected
      this.excuteAsyncCallback.call(promise, callback, this.data)  // 绑定 this 到 promise
    } else {                               // 从第二次开始以后, 进入 then, 状态是 PENDING
      this.callbackArr.push(new CallbackItem(promise, onResolved, onRejected)) // 这里的 this 也是指向‘上一个’ promise
    }
    return promise
  }
  ...
}

class CallbackItem {
  constructor(promise, onResolve, onReject) {
    this.promise = promise // 相应地, 这里存储的 promise 是来自下一个 then 的
    this.onResolve = typeof(onResolve) === 'function' ? onResolve : (resolve) => {}
    this.onReject = typeof(onRejected) === 'function' ? onRejected : (rejected) => {}
  }
  ...
}
```

### 拓展延伸

```js
setTimeout(() => {
  console.log('A')
}, 0)

Promise.resolve(
  console.log('B')
).then(() => {
  console.log('C')
})

console.log('D')
```

正常情况下, 此 demo 应该输出 `B D C A`, 这里涉及到宏任务和微任务的知识点, 一个宏任务里可以有多个微任务。

* 宏任务(macroTask): setTimeout、requestAnimationFrame
* 微任务(microTask): promise、setImmediate、async/await

> 由于此项目中的 promise 是用 setTimeout 实现的, 所以在上述 demo 中, 此项目输出的结果是 `B D A C`, 解决方法: 可以参考 [setImmediate.js](https://github.com/YuzuJS/setImmediate)。它的本质用了一些 hack 的手段, 比如借用了 `postMessage` 这个来操作事件循环。

### 问题: promise.all 如何做到让多个 setTimeout 并发运行?

这个就是 promise.all() 的本质了, 浏览器内部提供了一个事件循环机制来模拟成伪'并发'

```js
var oldTime = Date.now()
setTimeout(() => {console.log(Date.now() - oldTime)}, 1000) // 1001 ~ 1005(存在 4ms 的波动)
setTimeout(() => {console.log(Date.now() - oldTime)}, 2000) // 2001 ~ 2005
```
