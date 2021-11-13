(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6054],{36054:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>g});var o=t(59713),r=t.n(o),i=t(6479),p=t.n(i),s=(t(67294),t(3905));function a(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,o)}return t}function c(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){r()(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var l={};function g(n){var e=n.components,t=p()(n,["components"]);return(0,s.kt)("wrapper",c(c(c({},l),t),{},{components:e,mdxType:"MDXLayout"}),(0,s.kt)("h3",null,"nginx 配置文件初始化备份"),(0,s.kt)("p",null,"nginx 配置文件路径: ",(0,s.kt)("inlineCode",{parentName:"p"},"/etc/nginx/nginx.conf"),"。"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-bash"}),'user www-data;\nworker_processes auto;\npid /run/nginx.pid;\ninclude /etc/nginx/modules-enabled/*.conf;\n\nevents {\n        worker_connections 768;\n        # multi_accept on;\n}\n\nhttp {\n\n        ##\n        # Basic Settings\n        ##\n\n        sendfile on;\n        tcp_nopush on;\n        tcp_nodelay on;\n        keepalive_timeout 65;\n        types_hash_max_size 2048;\n        # server_tokens off;\n\n        # server_names_hash_bucket_size 64;\n        # server_name_in_redirect off;\n\n        include /etc/nginx/mime.types;\n        default_type application/octet-stream;\n\n        ##\n        # SSL Settings\n        ##\n\n        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE\n        ssl_prefer_server_ciphers on;\n\n        ##\n        # Logging Settings\n        ##\n\n        access_log /var/log/nginx/access.log;\n        error_log /var/log/nginx/error.log;\n\n        ##\n        # Gzip Settings\n        ##\n\n        gzip on;\n\n        # gzip_vary on;\n        # gzip_proxied any;\n        # gzip_comp_level 6;\n        # gzip_buffers 16 8k;\n        # gzip_http_version 1.1;\n        # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;\n\n        ##\n        # Virtual Host Configs\n        ##\n\n        include /etc/nginx/conf.d/*.conf;\n        include /etc/nginx/sites-enabled/*;\n}\n\n#mail {\n#       # See sample authentication script at:\n#       # http://wiki.nginx.org/ImapAuthenticateWithApachePhpScript\n#\n#       # auth_http localhost/auth.php;\n#       # pop3_capabilities "TOP" "USER";\n#       # imap_capabilities "IMAP4rev1" "UIDPLUS";\n#\n#       server {\n#               listen     localhost:110;\n#               protocol   pop3;\n#               proxy      on;\n#       }\n#\n#       server {\n#               listen     localhost:143;\n#               protocol   imap;\n#               proxy      on;\n#       }\n#}\n')))}g.isMDXComponent=!0}}]);