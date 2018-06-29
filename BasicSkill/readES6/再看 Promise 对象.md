### Promise

促使去研究 Promise 的动机大体有以下几点：

* 对其 api 的不太熟悉以及对实现机制的好奇;

* 很多库(比如 fetch)是基于 Promise 封装的，那么要了解这些库的前置条件得先了解 Promise;

* 要了解其它更加高级的异步操作(async)还是得先熟悉 Promise;

基于这些目的，实现了一个符合 Promise/A+ 规范的 [super-promise](https://github.com/MuYunyun/super-promise)。本文的目的主要是熟悉其 api 以及适当聊聊代码思路。

### Promise.resolve()

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

如上所示，前三种情况构建的结果类似。

### Promise.reject()

相较于 Promise.resolve()，Promise.reject() 原封不动地返回参数值

### Promise.all()

对于 Promise.all 来说，只有所有 promise 都通过后，才能返回 promise。

以下 demo，请求两个 url，当两个异步请求返还结果后，请求第三个 url。

```js
const p1 = request(`http://some.url.1`)
const p2 = request(`http://some.url.2`)

Promise.all([p1, p2])
  .then((msgs) => {
    return request(`http://some.url.3?v=${msgs.join(',')}`)
  })
  .then((msg) => {
    console.log(msg)
  })
```

### Promise.race()

对于 Promise.race 来说，只要有一个 promise 通过，就返回 promise。

race 译为竞赛，同样是请求两个 url，当且仅当一个请求返还结果后，就请求第三个 url。

### Promise.wrap() —— 回调函数转 Promise

通过下面这个案例，提供回调函数 Promise 化的思路。

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

下面尝试将回调 (err, data) 转为 Promise

```js
Promise.wrap = function(fn) {
  return funtion() {
    const args = [].slice.call(arguments)
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