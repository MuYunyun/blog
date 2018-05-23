### express

express 是一个基于 node.js 封装的框架，目前主要实现了路由板块和中间件板块，后续接着完善。

### demo

```js
// 测试用例
const app = express()

// 测试路由
app.get('/', function (req, res) {
  res.end('hello express')
})

// 测试中间件
app.use((req, res, next) => {
  console.log('this is middleware1')
  next()
})

app.use((req, res, next) => {
  console.log('this is middleware2')
  next()
})

app.listen(3000, function (req, res) {
  console.log('server is listening port 3000')
})

// this is middleware1
// this is middleware2
// hello express
```

```js
const http = require('http')
const url = require('url')

const core = function(req, res) {
  const method = req.method.toLocaleLowerCase()
  const obj = url.parse(req.url, true)
  const pathname = obj.pathname
  const cb = hitRouting(method, pathname)
  // 这里插入中间件
  next(req, res)
  cb(req, res)
}

core.listen = function(port, fn) {                      // 挂载到 core 函数上
  http.createServer(core).listen(port, '127.0.0.1', fn) // 核心还是这条语句，即对 node 的封装
}

const methods = ['post', 'get', 'delete', 'options', 'head']
methods.map(method => {
  core[method] = (path, cb) => core.routes.push({ method, path, cb })
})

core.routes = []      // 路由队列
core.middlewares = [] // 中间件队列

const hitRouting = function(method, pathname) {
  let cb = (req, res) => res.end('no hit routing')
  core.routes.map((r, index) => {
    if (r.method === method && r.path === pathname) {
      cb = r.cb
      return
    }
  })
  return cb
}

core.use = function(middlewareFn) {
  core.middlewares.push(middlewareFn)
}

let i = 0
const next = function(req, res) {   // express 中间件的核心实现
  const handler = core.middlewares[i++]
  if (!handler) {
    return
  }
  handler(req, res, next)
}

const express = function() {
  return core
}
```