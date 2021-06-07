### 跨域二三事

![](http://oqhtscus0.bkt.clouddn.com/62b89b89373dc86916a60efc28bdd15e.jpg-muyy)

跨域是日常开发中经常开发中经常会接触到的一个重难点知识，何不总结实践一番，从此心中对之了无牵挂。

### 同源策略

之所以会出现跨域解决方案，是因为同源策略的限制。同源策略规定了如果`两个 url 的协议、域名、端口中有任何一个不等，就认定它们跨源了`。比如下列表格列出和 `http://127.0.0.1:3000` 比较的同源检测的结果，

> 因为跨域的前置条件是两个 url, 所以跨域一般是针对`客户端场景`。

|             url             | 结果  |   原因   |
| :-------------------------: | :---: | :------: |
| http://127.0.0.1:3000/index | 同源  |          |
|   https://127.0.0.1:3000    | 跨源  | 协议不同 |
|   https://localhost:3000    | 跨源  | 域名不同 |
|    http://127.0.0.1:3001    | 跨源  | 端口不同 |

那跨源有什么后果呢? 归纳有三

* 不能获取 Cookie、LocalStorage、IndexedDB;
* 不能获取 dom 节点;
* 不能进行一般的 Ajax 通信;

跨域解决方案的出现就是为了解决以上痛处。

### JSONP 跨域

提到 JSONP 跨域，不得不先提到 `script` 标签，和 `img`、`iframe` 标签类似，这些标签是不受同源策略限制的，JSONP 的核心就是通过动态加载 script 标签来完成对目标 url 的请求。

先来看一段 JSONP 调用的 `Headers` 部分，字段如下：

```http
Request URL:http://127.0.0.1:3000/?callback=handleResponse
Request Method:GET
Status Code:200 OK
Remote Address:127.0.0.1:3000
```

可以很鲜明地发现在 `Request URL` 中有一句 `?callback=handleResponse`，这个 callback 后面跟着的 handleResponse 即回调函数名（可以任意取），服务端会接收到这个参数然后拼接成形如 `handleResponse(JSON)` 的形式返还给前端(这也是 JSONP == JSON with padding 的原因吧)，如下图，这时候浏览器就会自动调用我们事先定义好的 handleResponse 函数。

![](http://oqhtscus0.bkt.clouddn.com/3a484a1ca0fbb4be46fed582828c5847.jpg-200)

前端代码示例：(源为 http://127.0.0.1:3001)

```js
function handleResponse(res) {
  console.log(res) // {text: "jsonp"}
}

const script = document.createElement('script')
script.src = 'http://127.0.0.1:3000?callback=handleResponse'
document.head.appendChild(script)
```

服务端代码示例：(源为 http://127.0.0.1:3000)

```js
const server = http.createServer((req, res) => {
  if (~req.url.indexOf('?callback')) { // 简单处理 JSONP 跨域的时候
    const obj = {
      "text": 'jsonp',
    }
    const callback = req.url.split('callback=')[1]
    const json = JSON.stringify(obj)
    const build = callback + `(${json})`
    res.end(build) // 这里返还给前端的是拼接好的 JSON 对象
  }
});
```

可以看出 JSONP 具有直接访问响应文本的优点，但是要想确认 JSONP 是否请求失败并不容易，因为 script 标签的 onerror 事件还未得到浏览器广泛的支持，此外它仅能支持 GET 方式调用。

### CORS 跨域

CORS(Cross-Origin Resource Sharing) 可以理解为加强版的 Ajax，也是目前主流的跨域解决方案。它的核心思想即`前端与后端进行 Ajax 通信时，通过自定义 HTTP 头部设置从而决定请求或响应是否生效`。

比如前端代码(url 为 http://127.0.0.1:3001)写了段 Ajax，代码如下：

```js
const xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      console.log('responseTesx:' + xhr.responseText)
    }
  }
}
xhr.open('get', 'http://127.0.0.1:3000', true)
xhr.send()
```

因为端口不一致的关系这时候导致不同源了，这时候会在 Request Headers 中发现多了这么一行字段，

```http
Origin: http://127.0.0.1:3001
```

而且控制台中会报出如下错误:

```http
Failed to load http://127.0.0.1:3000/: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://127.0.0.1:3001' is therefore not allowed access.
```

这时候就需要在服务端设置字段 `Access-Control-Allow-Origin`，它的作用就是设置允许来自什么源的请求，如果值设置为 `*`，表明允许来自任意源的请求。服务端代码示例如下：

```js
http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3001') // 设置允许来自 http://127.0.0.1:3001 源的请求
})
```

CORS 分为简单请求以及非简单请求。可以这么区分，如果请求方法为 `POST`、`GET`、`HEAD` 时为简单请求，其它方法如 `PUT`、`DELETE` 等为非简单请求，如果是非简单请求的话，可以在 chrome 的 Network 中看到多了一次 `Request Method` 为 `OPTIONS` 的请求。如下图:

![](http://with.muyunyun.cn/f397ac2c565828f38516c8be2ebc1b4b.jpg-400)

可以把这个请求称为预请求，用白话文翻译下，浏览器询问服务器，'服务器大哥，我这次要进行 PUT 请求，你给我发张通行证呗'，服务器大哥见浏览器小弟这么殷勤，于是给了它发了张通行证，叫作 `Access-Control-Allow-Methods:PUT`，接着浏览器就能愉快地进行 PUT 请求了。服务端代码示例如下：

```js
http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3001')
  res.setHeader('Access-Control-Allow-Methods', 'http://127.0.0.1:3001')
})
```

聊完简单请求和非简单请求的区别后，再来看看如何利用 CORS 实现 Cookie 的跨域传送，首先在服务器随意设置个 Cookie 值下发到浏览器，如果非跨域的情况下，浏览器再次请求服务器时就会带上服务器给的 Cookie，但是跨域的时候怎么办呢？不卖关子了，需在服务端设置 `Access-Control-Allow-Credentials` 字段以及在客户端设置 `withCredentials` 字段，两者缺一不可，代码如下：

前端代码示例：(源为 http://127.0.0.1:3001)

```js
const xhr = new XMLHttpRequest()
...
xhr.withCredentials = true // 传 cookie 的时候前端要做的
xhr.open('get', 'http://127.0.0.1:3000', true)
xhr.send()
```

服务端代码示例: (源为 http://127.0.0.1:3000)

```js
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3001') // 必填：接受域的请求
  res.setHeader('Set-Cookie', ['type=muyy']) // 下发 cookie
  res.setHeader('Access-Control-Allow-Credentials', true) // ② 选填：是否允许浏览器传 cookie 到服务端，只能设置为 true
  res.end('date from cors')
})
```

至此介绍了几个比较关键 HTTP 头在 CORS 中的实践运用，更为详细的资料可以参阅 [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)，最后概括下 CORS 的优缺点，优点是支持所有类型的 HTTP 方法，缺点是有些老的浏览器不支持 CORS。

### hash + iframe

在文章最开始提到过 iframe 标签也是不受同源策略限制的标签之一，hash + iframe 的跨域核心思想就是，在 A 源中通过动态改变 iframe 标签的 src 的哈希值，在 B 源中通过 `window.onhashchange` 来捕获到相应的哈希值。思路不难直接上代码：

A 页面代码示例(源为 http://127.0.0.1:3000)

```html
<body>
  <iframe src="http://127.0.0.1:3001"></iframe>
  <script>
    const iframe = document.getElementsByTagName('iframe')[0]
    iframe.setAttribute('style', 'display: none')
    const obj = {
      data: 'hash'
    }
    iframe.src = iframe.src + '#' + JSON.stringify(obj) // ① 关键语句
  </script>
</body>
```

B 页面代码示例(源为 http://127.0.0.1:3001)

```js
window.onhashchange = function() { // ① 关键语句
  console.log('来自 page2 的代码 ' + window.location.hash) // 来自 page2 的代码 #{"data":"hash"}
}
```

刷新 A 页面，可以发现在控制台打印了如下字段，至此实现了跨域。

```js
来自 page2 的代码 #{"data":"hash"}
```

这种方式进行跨域优点是支持页面和页面间的通信，缺点也是只支持 GET 方法和单向的跨域通信。

### postMessage

为了实现跨文档传送(cross-document messaging)，简称 XDM。HTML5 给出了一个 api —— postMessage，postMessage() 方法接收两个参数：`发送消息`以及`消息接收方所在域的字符串`。代码示例如下:

A 页面代码示例(源为 http://127.0.0.1:3000)

```html
<body>
  <iframe src="http://127.0.0.1:3001"></iframe>
  <script>
    const iframe = document.getElementsByTagName('iframe')[0]
    iframe.setAttribute('style', 'display: none')
    iframe.onload = function() { // 此处要等 iframe 加载完毕，后续代码才会生效
      iframe.contentWindow.postMessage('a secret', 'http://127.0.0.1:3001')
    }
  </script>
</body>
```

B 页面代码示例(源为 http://127.0.0.1:3001)

```js
window.addEventListener('message', function(event) {
  console.log('From page1 ' + event.data)
  console.log('From page1 ' + event.origin)
}, false)
```

刷新 A 页面，可以发现在控制台打印了如下字段，至此实现了跨域。

```
From page1 a secret
From page1 http://127.0.0.1:3000
```

这种跨域方式优点是是支持页面和页面间的双向通信，缺点也是只能支持 GET 方法调用。

### WebSockets

WebSockets 属于 HTML5 的协议，它的目的是在一个持久连接上建立全双工通信。由于 WebSockets 采用了自定义协议，所以优点是客户端和服务端发送数据量少，缺点是要额外的服务器。基础的使用方法如下：

```js
const ws = new WebSocket('ws://127.0.0.1:3000')
ws.onopen = function() {
  // 连接成功建立
}

ws.onmessage = function(event) {
  // 处理数据
}

ws.onerror = function() {
  // 发生错误时触发，连接中断
}

ws.onclose = function() {
  // 连接关闭时触发
}
```

当然一般我们会使用封装好 WebSockets 的第三方库 [socket.io](https://github.com/socketio/socket.io)，这里具体就不展开了。

### 项目地址

前文所述五种跨域实践的 demo 已上传至 [cross-domain](https://github.com/MuYunyun/cross-domain)，前端环境基于 create-react-app 搭建，后端环境用 node 搭建。

当然跨域方式还有一些其他方式的实现，后续酌情慢慢填坑~