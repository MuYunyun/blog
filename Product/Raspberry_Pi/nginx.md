### 安装 nginx

```
sudo apt update

# 安装 Nginx
sudo apt install nginx

# 设置开机启动
sudo systemctl enable nginx

# 开启 nginx
sudo systemctl start nginx

# 重启 nginx
sudo systemctl restart nginx

# nginx 重新加载配置文件
sudo systemctl reload nginx

# 停止 nginx
sudo service nginx stop
sudo systemctl stop nginx

# 强制杀死 nginx
sudo pkill -9 nginx
```

安装好以后, 执行 `sudo systemctl status nginx`, 可以看到

```
nginx.service - A high performance web server and a reverse proxy server
...
```

### 验证 nginx 有效

以配置域名 frp.muyunyun.cn 为例，新建配置文件 `/etc/nginx/conf.d/frp.muyunyun.cn.conf`

```bash
touch /etc/nginx/conf.d/frp.muyunyun.cn.conf
```

在 `/etc/nginx/conf.d/frp.muyunyun.cn` 中添加 http 服务相关内容

```
server {
    server_name      frp.muyunyun.cn;
    listen           80;
    root             /usr/share/nginx/html/frp.muyunyun.cn;

    # location / {
    #    proxy_pass http://127.0.0.1:8080;
    #     proxy_set_header Host $host:80;
    #    proxy_set_header X-Real-IP $remote_addr;
    #    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # }

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
```

新建 frp.muyunyun.cn 对应的网站文件夹

```bash
mkdir -p /usr/share/nginx/html/frp.muyunyun.cn
```

新建文件

```bash
touch /usr/share/nginx/html/frp.muyunyun.cn/index.html
```

在 /usr/share/nginx/html/fpr.muyunyun.cn/index.html 中输入

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>云随风</title>
</head>
<body>Test</body>
</html>
```

控制台输入 `sudo systemctl restart nginx`。

在浏览器访问 http://frp.muyunyun.cn/ 可以看到目标页面，不过过了一段时间后，页面提示`网站暂时无法访问，该网站未根据工信部相关法律规则进行备案`，[了解更多备案相关内容](https://icp-faq.dnspod.cn/why)。

![](http://with.muyunyun.cn/04afbf893d08548ebd06a85488389298.jpg)


下面开始添加 https，尝试解决上述问题。

### 安装 acme.sh

```bash
sudo curl https://get.acme.sh | sh
source ~/.bashrc
```

操作中若出现权限不足相关问题比如 `./acme.sh: 2249: cannot create /home/ubuntu/.bashrc: Permission denied`，可以使用如下命令:

```bash
sudo chmod 777 .bashrc
```