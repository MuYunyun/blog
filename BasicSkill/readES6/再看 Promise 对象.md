### Promise

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

### 回调转 Promise 实战

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

下面尝试将回调 (err, data) 转为 Promise，下面这段代码为日后如果要写相应回调转 Promise 的库有借鉴意义。

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

function foo(a, b, cb) {
  const request = Promise.wrap(ajax)
  request(`http://some.url?a=${a}&b=${b}`)  // 对 ajax 进行 promise 化
    .then((data) => {
      cb(null, data)
    }, cb)
}

const betterFoo = Promise.wrap(foo) // 对 foo 进行 promise 化

// 转化完成的效果
betterFoo(1, 2)
  .then((msg) => {
    console.log(msg)
  }, (err) => {
    console.log(err)
  })
```