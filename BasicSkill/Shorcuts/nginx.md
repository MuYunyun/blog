### nginx

node 和 nginx 搭配使用, 是因为 nginx 具有更加强大的静态文件处理能力, 以及反向代理负载均衡。

* 正向代理: 代理客户端(如 vpn)
* 反向代理: 代理服务器(可以实现负载均衡)

其它用途: 跨域

### 一些命令

```
sudo brew services start nginx 启动 nginx(8080 端口)
sudo brew services stop nginx  关闭 nginx
brew services restart nginx    重启 nginx

nginx -v                       查看版本
sudo nginx -t                  检查配置文件是否正确
ps -ef | grep nginx            查询 nginx 是否启动
```

> mac 重启后需要重新跑一遍 sudo brew services stop nginx、sudo brew services start nginx

### 目录

* 配置文件目录 /usr/local/etc/nginx/nginx.conf;
* 默认配置文件目录 /usr/local/etc/nginx/nginx.conf.default;
* 根目录 /usr/local/var/www;

### 相关文章

* [使用 Nginx + Node.js 部署你的网站](https://www.jianshu.com/p/717f2b88d057)
* [Nginx 中文官方文档](http://shouce.jb51.net/nginx-doc/)