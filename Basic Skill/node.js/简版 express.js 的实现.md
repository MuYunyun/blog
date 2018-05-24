### express

express 是一个基于 node.js 封装的框架。

该 [express demo](https://github.com/MuYunyun/blog/blob/master/Basic%20Skill/node.js/express/index.js) 主要实现的功能点：

* 路由模块
* 中间件模块
* 正则匹配路由
* 静态文件处理

### 路由和中间件

#### 版本一

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

// 命中路由，获取回调
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

版本一的路由和中间件是分为两个数组分别进行管理的；但是当看到 next() 函数又联想到可以借助 generator 函数来实现路由和中间件的集中管理(把中间件也当成是一个路由)，所以有了版本二的实现。

#### 版本二

版本二相较于版本一最主要是遍历方式的改变，改为迭代器方式。

```js
// 测试路由
app.get('/test/abc', function(req, res) {
	res.end('hello express')
})

// 测试中间件
app.use('/test', function(req, res, next) {
	console.log('this is middleware')
	next()
})

app.listen(3000, function(req, res) {
	console.log('server is listening port 3000')
})
```

测试用例进行了改动，比如当访问 `/test/abc` 路由的时候，其实也命中了 `/test` 中间件，所以此时中间件内的代码也会执行。

```js
const http = require('http')
const url = require('url')

const core = function(req, res) {
	const method = req.method.toLocaleLowerCase()
  const obj = url.parse(req.url, true)
	const pathname = obj.pathname
	hitRouting(core.routes, method, pathname)(req, res)
}

core.listen = function(port, fn) {                      // 挂载到 core 函数上
  http.createServer(core).listen(port, '127.0.0.1', fn) // 核心还是这条语句，即对 node 的封装
}

core.routes = []      // 路由队列
const methods = ['post', 'get', 'delete', 'options', 'head', 'use']
methods.map(method => {
  core[method] = (path, cb) => core.routes.push({ method, path, cb })
})

function* generator(arr) {  // 引人 Generator 函数
	yield* arr
}

const hitRouting = function(routes, method, pathname) { // 将中间件也当作是路由
	const lazy = generator(routes)
	return function(req, res) {
		(function next() {
			const tmp = lazy.next().value
			if (!tmp) {
				return
			}
			if (tmp.method === method && tmp.path === pathname) {                                     // 命中路由
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

const express = function() {
  return core
}
```

### 路由正则匹配

```js
// 测试用例
app.get('/blog/:id', function (req, res) { // 扩展功能①：希望能匹配 /blog/123
	console.log(req.param.id)                // 扩展功能②：希望能通过 req.param.id 获取到相应参数
	res.end('test /blog/:id')
})
```

上述功能简要实现如下：

```js
const hitRouting = function(routes, method, pathname) { // 将中间件也当作是路由
	const lazy = generator(routes)
	return function(req, res) {
		(function next() {
			const tmp = lazy.next().value
			const reg = new RegExp(tmp.path.replace(/:id/g, '\\d+'))
			if (tmp.method === method && reg.test(pathname)) {        // 匹配 /blog/:id，这里仅仅举个例子
				const arr = tmp.path.split(':')
				const pathNameArr = pathname.split('/')
				const obj = {}
				obj[arr[1]] = pathNameArr[pathNameArr.length - 1]
				req.param = obj   // 实现 req.param.id 获取 id
				tmp.cb(req, res)
				next()
			}
      ...
		}())
	}
}
```

### 静态资源的访问

如果在浏览器中输入 http://127.0.0.1:3000/index.html，此时并不能处理这种情况，接着加上访问静态资源的逻辑，代码如下：

```js
const core = function(req, res) {
	const method = req.method.toLocaleLowerCase()
  const obj = url.parse(req.url, true)
	const pathname = obj.pathname
	const ext = path.extname(pathname).slice(1)
	if (ext) { // 处理静态文件请求
		handleStaticFile(res, staticPath, ext)
	}
  ...
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
			res.writeHead(404, {'Content-Type': 'text/plain'})
			res.write('The request failed')
			res.end()
		} else {
			fs.readFile(staticPath, (err, data) => {
				if (err) throw err
				res.writeHead(200, {'Content-Type': mime[ext] || 'text/plain'})
				res.write('The request success')
				res.end()
			})
		}
	})
}
```

