### Generator 使用规律

从一道题目开始:

```js
function* gen() {
  const a = yield 1
  console.log(a)
}
```

为了让其能成功打印出 1, 设计如下函数:

```js
function step(gen) {
  const it = gen()
  let result
  return function() {
    result = it.next(result).value
  }
}
```

进行如下调用:

```js
var a = step(gen)
a()
a() // 1
```

从这个题目总结出规律:

* `next` 的调用数比 `yield` 的调用数多 1;
* 第一个 `next` 传值无效, 从第二个 `next` 开始的传值有效并会覆盖掉 `yield` 的传值;

生成器中的 `yield/next` 除了控制能力外还有双向的消息通知能力:

* `yield` 后面跟的值能通过 `it.next().value` 取到
* `it.next()` 括号中的值又能作为 `yield` 的结果返回

### yield 暂停的位置

```js
function* foo(url) {
  try {
    const value = yield request(url)
    console.log(value)
  } catch (err) {
    ...
  }
}

const it = foo('http://some.url.1')
```

`yield` 后面跟着的语句执行完再进入暂停状态的, 在如上代码中, 当执行 `it.next()` 时, 可以稍加转换为如下形式:

```js
function* foo(url) {
  try {
    const promise = request(url) // 当执行 it.next() 时, 这里是被执行的
    const value = yield promise  // 这里被暂停
    console.log(value)
  } catch (err) {
    ...
  }
}
```

### 遇到 return/throw

* 遇到 `return`

```js
function* gen() {
  yield 1
  return 2
  console.log('是否执行')
}

const it = gen()
it.next() // {value: 1, done: false}
it.next() // {value: 2, done: true}
it.next() // {value: undefined, done: true}
```

总结: 遇到 `return`, `generator` 函数结束中断, `done` 变为 `true`;

* 遇到 `iterator` 的 `throw`

```js
function* gen() {
  yield 1
  console.log('是否执行')
}

var it = gen()
it.throw(new Error('boom')) // Error: boom
it.next()                   // {value: undefined, done: true}
```

总结: 遇到 `iterator` 的 `throw`, `generator` 函数运行中断, `done` 变为 `true`;

### Generator 的简单实现

`Generator` 是一个返回迭代器的函数, 下面是其简版实现:

```js
function foo(url) {
  var state
  var val
  function process(v) {
    switch (state) {
      case 1:
        console.log('requesting:', url)
        return request(url)
      case 2:
        val = v
        console.log(val)
        return
      case 3:
        var err = val
        console.log('Oops:', err)
        return false
    }
  }
  return {
    next: function(v) {
      if (!state) {
        state = 1
        return {
          done: false,
          value: process()
        }
      } else if (state === 1) {
        state = 2
        return {
          done: true,
          value: process(v)
        }
      } else {
        return {
          done: true,
          value: undefined
        }
      }
    },
    throw: function() {
      if (state === 1) {
        state = 3
        return {
          done: true,
          value: process(e)
        }
      } else {
        throw e
      }
    }
  }
}

var it = foo('http://some.url.1')
```

### Generator 函数的异步应用

以 `co` 库来说, 现在已经统一为 `Generator + Promise` 的调用方式, 下面进行简单的模拟:

```js
co(function* () {
  const result = yield Promise.resolve(true)
  console.log(result) // true
})
```

```js
// 简版 promise
function co(gen) {
  const it = gen()
  const step = function(data) {
    const result = it.next(data)
    if (result.done) {
      return result.value
    }
    result.value.then((data) => {
      step(data)
    })
  }
  step()
}
```

观察 `co` 库发现, `co` 函数后返回的是 `promise`, 使用如下:

```js
co(function* () {
  const result = yield Promise.resolve(true)
  return result // 这里有个语法, it.next() 碰到 return 后, 其值会变为 { value: result, done: true } 的形式
}).then((data) => {
  console.log(data) // true
})
```

我们再对其稍加改造, 使之更加添近 `co` 库:

```js
function co(gen) {
  return new Promise((resolve, reject) => {
    const it = gen()
    let result
    const step = function(fn) {
      try {
        result = fn()
      } catch(e) {
        return reject(e)
      }
      if (result.done) { return resolve(result.value) }
      result.value.then((data) => {
        step(() => it.next(data))
      }, (err) => {
        step(() => it.throw(err)) // 这里为了让抛错直接在 generator 消化, 所以 step 内改传函数
      })
    }
    step(() => it.next())
  })
}
```