<!--
abbrlink: yq9jpwrw
-->

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

### nginx 配置文件初始化备份

nginx 配置文件路径: `/etc/nginx/nginx.conf`。

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

### 配置 Https 域名

> 由于域名并没有备案，因此笔者将域名端口挂在非 80 端口(90)上，非 80 的端口笔者尝试配置 Https 服务并未成功，后续如有需求继续调研。

更进一步地，接着配置使访问 https://frp.muyunyun.cn:90 也生效。

* 步骤一: 安装 acme.sh

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

* 步骤二: 获取 https 证书

```bash
acme.sh --issue -d frp.muyunyun.cn:90 --nginx
```