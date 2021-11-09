```bash
server {
    listen       8080 ssl http2;
    listen       [::]:8080 ssl http2;
    server_name  frp.muyunyun.cn;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host:443;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    ssl_certificate "/etc/nginx/ssl/frp.muyunyun.cn/fullchain.cer";
    ssl_certificate_key "/etc/nginx/ssl/frp.muyunyun.cn/frp.muyunyun.cn.key";
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout  10m;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

    error_page 404 /404.html;
        location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
    }
}
```

nginx 配置文件, `/etc/nginx/nginx.conf`

```bash
user www-data;
worker_processes 1;
# pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;
# error_log  /var/log/nginx/error.log warn;

events {
        worker_connections 768;
        # multi_accept on;
}

http {

    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    charset utf-8,gbk;
    client_max_body_size 20m;

    set_real_ip_from 127.0.0.1;
    real_ip_header X-Forwarded-For;


    log_format  main  '$remote_addr  - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;
    keepalive_timeout  65;
    gzip  on;
    include /etc/nginx/conf.d/*.conf;
}

stream {
    map $ssl_preread_server_name $backend_name {
        frp.muyunyun.cn        frp_muyunyun_cn;
        default web;
    }


   upstream frp_muyunyun_cn {
        server 127.0.0.1:8080;
   }

   upstream web {
        server 127.0.0.1:80;
   }

   server {
        listen       443 reuseport;
        listen  [::]:443 reuseport;
        proxy_pass   $backend_name;
        ssl_preread  on;
   }

}
```