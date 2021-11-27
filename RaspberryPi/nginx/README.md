<!--
abbrlink: oerb6f1d
-->

### nginx

node 与 nginx 搭配使用, 是因为 nginx 具有更加强大的静态文件处理能力, 以及反向代理负载均衡(Load Balance)。

* `正向代理`: 代理客户端(如 vpn)
* `反向代理`: 代理服务器(使用 Nginx 实现负载均衡)

其它用途: 跨域

### 目录

* 配置文件目录 /usr/local/etc/nginx/nginx.conf
* 默认配置文件目录 /usr/local/etc/nginx/nginx.conf.default
* 根目录 /usr/local/var/www

### FAQ

* Q: `[::]:443` 中的 `[::]:` 的含义是什么?
  * A: 用于 IPv6，参考[官网](http://nginx.org/en/docs/http/ngx_http_core_module.html#listen)。

### 相关文章

* [Nginx 英文文档](https://nginx.org/en/docs/)
* [Nginx 中文文档](https://www.nginx.cn/doc/index.html)