[Async function](https://github.com/tc39/proposals/blob/master/finished-proposals.md) 在 2017 年已到达了 stage 4。

### async/await 使用注意点

* 为了不让程序挂掉, 注意捕获错误

写法 1: 用 `try/catch` 捕获

```js
async function test1() {
  try {
    await Promise.reject(new Error('boom'))
  } catch(e) {
    console.log(e)
  }
  console.log('go on')
}

test1()
// Error: boom
// go on
```

写法 2: 直接在 `await` 后面的 `promise` 上进行 `catch`

```js
async function test2() {
  await Promise.reject(new Error('boom')).catch(e => console.log(e))
  console.log('go on')
}

test2()
// Error: boom
// go on
```

* 使用并行提高程序的运行速度

```js
// 串行调用示范
async function block() {
  const result1 = await request(url1)
  const result2 = await request(url2)
}
```

在如上案例中, `request(url1)` 请求未完成的话是不会发起 `request(url2)` 请求的(类似串行调用), 若想使之变为并行调用可以作如下修改:

写法 1:

```js
async function block() {
  const promise1 = request(url1)
  const promise2 = request(url2)
  const result1 = await promise1
  const result2 = await promise2
}
```

写法 2:

```js
async function block() {
  const [result1, result2] = await Promise.all([request(url1), request(url2)])
}
```

### async 函数的实现原理

```js
async function fn {}
```

`async` 函数在低版本浏览器中其实就是转为 `co + Generator`

```js
function fn {
  return co(function* () {

  })
}
```

关于简版 `co`, 可以看在 [Generator 函数的异步应用](https://github.com/MuYunyun/blog/blob/master/BasicSkill/readES6/Generator%E6%9C%AD%E8%AE%B0.md#generator-%E5%87%BD%E6%95%B0%E7%9A%84%E5%BC%82%E6%AD%A5%E5%BA%94%E7%94%A8) 的实现。

### 异步遍历器

> [proposal-async-iteration](https://github.com/tc39/proposal-async-iteration), 异步遍历器也已经到了 stage 4。

#### 异步迭代器

同步场景下可以通过如下获取 `value`、 `done`:

```js
const { value, done } = syncIterator.next()
```

异步场景下可以通过如下方式获取 `value`、 `done`

```js
asyncIterator.next().then({ value, done } => {})
```

#### for await .. of

```js
for await (const line of readLines(filePath)) {
  console.log(line)
}
```

