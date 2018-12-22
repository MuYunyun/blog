### HTTP 协议主要特点

无状态，无连接

### HTTP 报文组成部分

* 请求报文: 请求行 请求头 空行 请求体
* 响应报文: 响应行 响应头 空行 响应体

> 请求行里包括请求方法，url, http 版本; 响应行里包括状态码，http 版本，状态说明;

### HTTP 协议类: POST 和 GET 的区别

* Get 有长度限制，Post 没有
* Get 请求，倒退按钮是无害的，Post 会重新发起请求
* Get 会主动缓存，Post 不会
* Get 请求通过 url 传递，Post 通过 request body 传递

### HTTP 状态码

> 1xx:

* 101: 需要切换协议(使用 Websocket 开始阶段是 http 协议, 中间切换到 WebSocket 协议, 此时返回的状态码是 101 表示后续协议还需切换)

> 2xx: 成功状态码

> 3xx: 重定向状态码

* 301: 永久重定向
* 302: 临时重定向
* 304: not Modified

(永久重定向中搜索引擎不会保留原有的地址，临时重定向中搜索引擎会保留原有的地址)

> 4xx: 客户端错误状态码

* 400: Bad Request(错误的请求)
* 401: Unauthorized(未认证)
* 403: Forbidden Request(拒绝访问)
* 404: Not Found(未找到)

> 5xx: 服务端错误状态码

### HTTP 事物时延

DNS 解析、连接、传输、处理。

### HTTP 连接

管道化连接: 依赖于 Http/1.1 是持久连接的。

### 强缓存和协商缓存

> 强缓存是不经过服务器的, 协商缓存是经过服务器的

* 强缓存相关字段(Expires(响应头), Cache-Control(响应头))
* 协商缓存相关字段(Last-Modified(响应头), If-Modified-Since(请求头), Etag(响应头), If-None-Match(请求头))

如下为 HTTP 缓存机制流程图:

![](http://with.muyunyun.cn/7aa47d51ccc2fe5a66f75c542f014f2e.jpg-400)

### HTTP 2.0

* 二进制流
* 多路复用
* 资源推送优先级
