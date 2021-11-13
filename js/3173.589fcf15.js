(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3173],{93173:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>c});var a=t(59713),r=t.n(a),s=t(6479),p=t.n(s),l=(t(67294),t(3905));function o(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function u(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?o(Object(t),!0).forEach((function(e){r()(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var i={};function c(n){var e=n.components,t=p()(n,["components"]);return(0,l.kt)("wrapper",u(u(u({},i),t),{},{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h3",null,"nginx 常用命令"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-bash"}),"sudo apt update\n\n# 安装 Nginx\nsudo apt install nginx\n\n# 设置开机启动\nsudo systemctl enable nginx\n\n# 开启 nginx\nsudo systemctl start nginx\n\n# 重启 nginx\nsudo systemctl restart nginx\n\n# nginx 重新加载配置文件\nsudo systemctl reload nginx\n\n# 停止 nginx\nsudo service nginx stop\nsudo systemctl stop nginx\n\n# 强制杀死 nginx\nsudo pkill -9 nginx\n\n# Ubuntu 上卸载 nginx\n# 删除除了配置文件以外的所有文件。\nsudo apt-get remove nginx nginx-common\n# 删除所有与nginx有关的东西，包括配置文件。\nsudo apt-get purge nginx nginx-common\n# 在上面命令结束后执行，主要是删除与Nginx有关的且不再被使用的依赖包。\nsudo apt-get autoremove\n# 删除两个主要的包。\nsudo apt-get remove nginx-full nginx-common\n")),(0,l.kt)("p",null,"安装好以后, 执行 ",(0,l.kt)("inlineCode",{parentName:"p"},"sudo systemctl status nginx"),", 可以看到"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{}),"nginx.service - A high performance web server and a reverse proxy server\n...\n")),(0,l.kt)("h3",null,"nginx 配置文件"),(0,l.kt)("p",null,"nginx 配置文件路径: ",(0,l.kt)("inlineCode",{parentName:"p"},"/etc/nginx/nginx.conf"),"。"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-bash"}),"user www-data;\nworker_processes auto;\npid /run/nginx.pid;\ninclude /etc/nginx/modules-enabled/*.conf;\nload_module /usr/lib/nginx/modules/ngx_stream_module.so;\n\nstream {\n    map $ssl_preread_server_name $backend_name {\n        frp.muyunyun.cn        frp_muyunyun_cn;\n        default web;\n    }\n\n\n   upstream frp_muyunyun_cn {\n        server 127.0.0.1:8080;\n   }\n\n   upstream web {\n        server 127.0.0.1:80;\n   }\n\n}\n\nevents {\n        worker_connections 768;\n        # multi_accept on;\n}\n\nhttp {\n        ##\n        # Basic Settings\n        ##\n\n        sendfile on;\n        tcp_nopush on;\n        tcp_nodelay on;\n        keepalive_timeout 65;\n        types_hash_max_size 2048;\n        # server_tokens off;\n\n        # server_names_hash_bucket_size 64;\n        # server_name_in_redirect off;\n\n        include /etc/nginx/mime.types;\n        default_type application/octet-stream;\n\n        ##\n        # SSL Settings\n        ##\n\n        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE\n        ssl_prefer_server_ciphers on;\n\n        ##\n        # Logging Settings\n        ##\n\n        access_log /var/log/nginx/access.log;\n        error_log /var/log/nginx/error.log;\n\n        ##\n        # Gzip Settings\n        ##\n\n        gzip on;\n\n        # gzip_vary on;\n        # gzip_proxied any;\n        # gzip_comp_level 6;\n        # gzip_buffers 16 8k;\n        # gzip_http_version 1.1;\n        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;\n\n        ##\n        # Virtual Host Configs\n        ##\n\n        include /etc/nginx/conf.d/*.conf;\n        include /etc/nginx/sites-enabled/*;\n}\n")),(0,l.kt)("h3",null,"配置 Http 域名"),(0,l.kt)("p",null,"以配置域名 frp.muyunyun.cn 为例，新建配置文件 ",(0,l.kt)("inlineCode",{parentName:"p"},"/etc/nginx/conf.d/frp.muyunyun.cn.conf")),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-bash"}),"touch /etc/nginx/conf.d/frp.muyunyun.cn.conf\n")),(0,l.kt)("p",null,"在 ",(0,l.kt)("inlineCode",{parentName:"p"},"/etc/nginx/conf.d/frp.muyunyun.cn.conf")," 中添加 http 服务相关内容"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{}),"server {\n    server_name      frp.muyunyun.cn;\n    listen           90;\n    root             /usr/share/nginx/html/frp.muyunyun.cn;\n\n    location / {\n       proxy_pass http://127.0.0.1:8080;\n       proxy_set_header Host $host:90;\n       proxy_set_header X-Real-IP $remote_addr;\n       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n    }\n\n    error_page 404 /404.html;\n        location = /40x.html {\n    }\n\n    error_page 500 502 503 504 /50x.html;\n        location = /50x.html {\n    }\n}\n")),(0,l.kt)("p",null,"端口使用 80 页面会提示",(0,l.kt)("inlineCode",{parentName:"p"},"网站暂时无法访问，该网站未根据工信部相关法律规则进行备案"),"，",(0,l.kt)("a",u({parentName:"p"},{href:"https://icp-faq.dnspod.cn/why"}),"了解更多备案相关内容"),"，笔者这里将它修改为 90。"),(0,l.kt)("p",null,(0,l.kt)("img",u({parentName:"p"},{src:"http://with.muyunyun.cn/04afbf893d08548ebd06a85488389298.jpg",alt:null}))),(0,l.kt)("p",null,"新建 frp.muyunyun.cn 对应的网站文件夹"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-bash"}),"mkdir -p /usr/share/nginx/html/frp.muyunyun.cn\n")),(0,l.kt)("p",null,"新建文件"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-bash"}),"touch /usr/share/nginx/html/frp.muyunyun.cn/index.html\n")),(0,l.kt)("p",null,"在 /usr/share/nginx/html/fpr.muyunyun.cn/index.html 中输入"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-html"}),'<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>云随风</title>\n</head>\n<body>Test</body>\n</html>\n')),(0,l.kt)("p",null,"控制台输入 ",(0,l.kt)("inlineCode",{parentName:"p"},"sudo systemctl restart nginx"),"。"),(0,l.kt)("p",null,"在浏览器访问 ",(0,l.kt)("a",u({parentName:"p"},{href:"http://frp.muyunyun.cn:90"}),"http://frp.muyunyun.cn:90")," 可以看到目标页面:"),(0,l.kt)("p",null,(0,l.kt)("img",u({parentName:"p"},{src:"http://with.muyunyun.cn/4373b2aaca032ed2a78fac53279532d2.jpg",alt:null}))),(0,l.kt)("p",null,"下面开始添加 https，尝试解决上述问题。"),(0,l.kt)("h3",null,"配置 Https 域名"),(0,l.kt)("p",null,"更进一步地，接着配置使访问 ",(0,l.kt)("a",u({parentName:"p"},{href:"https://frp.muyunyun.cn:90"}),"https://frp.muyunyun.cn:90")," 也生效。"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"步骤一: 安装 acme.sh")),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},(0,l.kt)("a",u({parentName:"p"},{href:"https://github.com/acmesh-official/acme.sh/wiki/sudo"}),"https://github.com/acmesh-official/acme.sh/wiki/sudo"))),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-bash"}),"#unstall for current user\nacme.sh --uninstall\n\n#change to root\nsudo su\n\n#install again for root user\ncurl https://get.acme.sh | sh -s email=328375795@qq.com\nsource ~/.bashrc\n")),(0,l.kt)("p",null,"操作中若出现权限不足相关问题比如 ",(0,l.kt)("inlineCode",{parentName:"p"},"./acme.sh: 2249: cannot create /home/ubuntu/.bashrc: Permission denied"),"，可以使用如下命令:"),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-bash"}),"sudo chmod 777 .bashrc\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"步骤二: 获取 https 证书")),(0,l.kt)("pre",null,(0,l.kt)("code",u({parentName:"pre"},{className:"language-bash"}),"acme.sh --issue -d frp.muyunyun.cn:90 --nginx\n")))}c.isMDXComponent=!0}}]);