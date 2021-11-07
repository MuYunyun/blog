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