const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const staticPath = 'static' // 静态路径默认文件

const core = function (req, res) {
  const method = req.method.toLocaleLowerCase()
  const obj = url.parse(req.url, true)
  const pathname = obj.pathname
  const ext = path.extname(pathname).slice(1)
  if (ext) { // 处理静态文件请求
    handleStaticFile(res, staticPath, ext)
  } else {
    hitRouting(core.routes, method, pathname)(req, res)
  }
}

core.listen = function (port, fn) {                      // 挂载到 core 函数上
  http.createServer(core).listen(port, '127.0.0.1', fn) // 核心还是这条语句，即对 node 的封装
}

core.routes = []      // 路由队列
const methods = ['post', 'get', 'delete', 'options', 'head', 'use']
methods.map(method => {
  core[method] = (path, cb) => core.routes.push({ method, path, cb })
})

function* generator(arr) {
  yield* arr
}

const hitRouting = function (routes, method, pathname) { // 将中间件也当作是路由
  const lazy = generator(routes)
  return function (req, res) {
    (function next() {
      const tmp = lazy.next().value
      if (!tmp) {
        return
      }
      const reg = new RegExp(tmp.path.replace(/:id/g, '\\d+'))
      if (tmp.method === method && reg.test(pathname)) {        // 匹配正则 /blog/:id，这里仅仅举个例子
        const arr = tmp.path.split(':')
        const pathNameArr = pathname.split('/')
        const obj = {}
        obj[arr[1]] = pathNameArr[pathNameArr.length - 1]
        req.param = obj // 实现 req.param.id 获取 id
        tmp.cb(req, res)
        next()
      } else if (tmp.method === method && (tmp.path === pathname)) {                            // 命中路由
        tmp.cb(req, res)
        next()
      } else if (tmp.method === 'use' && (tmp.path === '/' || pathname.startsWith(tmp.path))) { // 命中中间件
        tmp.cb(req, res, next)
      } else {
        next() // 跳过
      }
    }())
  }
}

// 处理静态文件类型
const handleStaticFile = function (res, staticPath, ext) {
  const mime = {
    "html": "text/html",
    "css": "text/css",
    "js": "text/javascript",
    "json": "application/json",
    "gif": "image/gif",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png"
  }
  fs.exists(staticPath, (exist) => {
    if (!exist) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write('The request failed')
      res.end()
    } else {
      fs.readFile(staticPath, (err, data) => {
        if (err) throw err
        res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' })
        res.write('The request success')
        res.end()
      })
    }
  })
}

const express = function () {
  return core
}

const app = express()

// 测试路由
app.get('/blog/:id', function (req, res) { // 扩展功能①：希望能匹配 /blog/123
  console.log(req.param.id)                // 扩展功能②：希望能通过 req.param.id 获取到相应参数
  res.end('test /blog/:id')
})

app.get('/test/abc', function (req, res) {
  res.end('hello express')
})

// 测试中间件
app.use('/test', function (req, res, next) {
  console.log('this is middleware')
  next()
})

app.listen(3000, function (req, res) {
  console.log('server is listening port 3000')
})