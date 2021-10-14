<!--
abbrlink: pd6i666j
-->

[项目实现源码](https://github.com/MuYunyun/blog/tree/master/BasicSkill/node/koa)

该简版 koa 的实现包含以下 4 个步骤:

* http 模块的封装
* 整合 Request、Response、Context 对象
* 中间件
* 错误捕获

### http 模块的封装

koa 区别于 express 的一个点是其采用了 ES6 语法进行书写。

[相关代码](https://github.com/MuYunyun/blog/blob/7bdad6158a6d49bc3a99123a054b0934034cc598/BasicSkill/node/koa/application.js#L17)

### 整合 Request、Response、Context 对象

koa 的用法区别于 express 的一点, 是将 req, res 封装进 ctx 对象中

```js
// express
app.get('/test/abc', function (req, res) {
  res.end('hello express')
})

// koa
app.use(async (ctx) => {
  ctx.body = `hello koa`
})
```

[相关代码](https://github.com/MuYunyun/blog/blob/7bdad6158a6d49bc3a99123a054b0934034cc598/BasicSkill/node/koa/application.js#L52)

### 中间件

koa2 的中间件是基于 async 实现的, 所以一起来探究关于 async 前置知识点:

```js
async function m1(next) {
  console.log('m1')
  await next()
}

async function m2(next) {
  console.log('m2')
  await next()
}

async function m3() {
  console.log('m3')
}
```

如何将 m1, m2, m3 串联起来呢？

```js
var next1 = async function() {
  await m2(next2)
}

var next2 = async function() {
  await m3()
}

m1(next1)
```

接着将以上函数进行抽象:

```js
var createAsync = function(fn, next) {
  return async function() {
    await fn(next)
  }
}

var next3 = createAsync(m3, null)
var next2 = createAsync(m2, next3)
var next1 = createAsync(m1, next2)

next1()
```

再尝试优化:

```js
var arr = [m1, m2, m3]
var next

for (let i = arr.length - 1; i > 0; i--) {
  next = createAsync(arr[i], next)
}

next()
```

在上篇 express 的实现中, [中间件](https://github.com/MuYunyun/blog/blob/7bdad6158a6d49bc3a99123a054b0934034cc598/BasicSkill/node/express/index.js#L55) 采用了 generator 来实现, 而本篇 koa 则使用了上文所述的 async/await 知识点来完成。

[相关代码](https://github.com/MuYunyun/blog/blob/7bdad6158a6d49bc3a99123a054b0934034cc598/BasicSkill/node/koa/application.js#L25)

### 错误捕获

此外完善的框架都有相应的错误捕获机制, 因此当程序 `throw new Error()` 抛错时, 也进行了相应的错误捕获, [相关代码](https://github.com/MuYunyun/blog/blob/7bdad6158a6d49bc3a99123a054b0934034cc598/BasicSkill/node/koa/application.js#L70)