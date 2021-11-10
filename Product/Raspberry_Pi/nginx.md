### nginx 常用命令

```bash
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

# Ubuntu 上卸载 nginx
# 删除除了配置文件以外的所有文件。
sudo apt-get remove nginx nginx-common
# 删除所有与nginx有关的东西，包括配置文件。
sudo apt-get purge nginx nginx-common
# 在上面命令结束后执行，主要是删除与Nginx有关的且不再被使用的依赖包。
sudo apt-get autoremove
# 删除两个主要的包。
sudo apt-get remove nginx-full nginx-common
```

安装好以后, 执行 `sudo systemctl status nginx`, 可以看到

```
nginx.service - A high performance web server and a reverse proxy server
...
```

### nginx 配置文件

nginx 配置文件路径: `/etc/nginx/nginx.conf`。

nginx 配置文件进行初始化备份:

```bash
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
        worker_connections 768;
        # multi_accept on;
}

http {

        ##
        # Basic Settings
        ##

        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;
        keepalive_timeout 65;
        types_hash_max_size 2048;
        # server_tokens off;

        # server_names_hash_bucket_size 64;
        # server_name_in_redirect off;

        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        ##
        # SSL Settings
        ##

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
        ssl_prefer_server_ciphers on;

        ##
        # Logging Settings
        ##

        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        ##
        # Gzip Settings
        ##

        gzip on;

        # gzip_vary on;
        # gzip_proxied any;
        # gzip_comp_level 6;
        # gzip_buffers 16 8k;
        # gzip_http_version 1.1;
        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        ##
        # Virtual Host Configs
        ##

        include /etc/nginx/conf.d/*.conf;
        include /etc/nginx/sites-enabled/*;
}

#mail {
#       # See sample authentication script at:
#       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript
#
#       # auth_http localhost/auth.php;
#       # pop3_capabilities "TOP" "USER";
#       # imap_capabilities "IMAP4rev1" "UIDPLUS";
#
#       server {
#               listen     localhost:110;
#               protocol   pop3;
#               proxy      on;
#       }
#
#       server {
#               listen     localhost:143;
#               protocol   imap;
#               proxy      on;
#       }
#}
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

在浏览器访问 http://frp.muyunyun.cn/ 可以看到目标页面

![](http://with.muyunyun.cn/4373b2aaca032ed2a78fac53279532d2.jpg)

不过过了一段时间后，页面提示`网站暂时无法访问，该网站未根据工信部相关法律规则进行备案`，[了解更多备案相关内容](https://icp-faq.dnspod.cn/why)。

![](http://with.muyunyun.cn/04afbf893d08548ebd06a85488389298.jpg)

下面开始添加 https，尝试解决上述问题。

### 安装 acme.sh

> https://github.com/acmesh-official/acme.sh/wiki/sudo

```bash
#unstall for current user
acme.sh --uninstall

#change to root
sudo su

#install again for root user
curl https://get.acme.sh | sh -s email=328375795@qq.com
source ~/.bashrc
```

操作中若出现权限不足相关问题比如 `./acme.sh: 2249: cannot create /home/ubuntu/.bashrc: Permission denied`，可以使用如下命令:

```bash
sudo chmod 777 .bashrc
```

### 获取 https 证书

```bash
acme.sh --issue -d frp.muyunyun.cn --nginx
```