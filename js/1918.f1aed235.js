(self.webpackChunkblog=self.webpackChunkblog||[]).push([[1918],{61918:(t,n,e)=>{"use strict";e.r(n),e.d(n,{default:()=>m});var r=e(59713),p=e.n(r),u=e(6479),a=e.n(u),o=(e(67294),e(3905));function l(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function s(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?l(Object(e),!0).forEach((function(n){p()(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):l(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}var c={};function m(t){var n=t.components,e=a()(t,["components"]);return(0,o.kt)("wrapper",s(s(s({},c),e),{},{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h3",null,"安装 Node.js"),(0,o.kt)("p",null,"使用 ARMv8 版本的稳定版 Node.js。"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-bash"}),"cd /opt/\nsudo wget https://nodejs.org/dist/v14.18.0/node-v14.18.0-linux-arm64.tar.xz\nsudo tar xvf node-v14.18.0-linux-arm64.tar.xz\n")),(0,o.kt)("p",null,"将 Node.js 添加到系统变量"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-bash"}),'sudo echo "export NODE_HOME=/opt/node-v14.18.0-linux-arm64" >> ~/.bashrc\nsudo echo "export PATH=\\$NODE_HOME/bin:\\$PATH" >> ~/.bashrc\nsource ~/.bashrc\n')),(0,o.kt)("p",null,"此时在树莓派中输入 node -v，可以看到对应版本如下:"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-bash"}),"ubuntu@ubuntu:~$ node -v\nv14.18.0\nubuntu@ubuntu:~$ npm -v\n6.14.15\n")),(0,o.kt)("p",null,"接着安装 http-server 服务"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-bash"}),"npm install http-server -g\n")),(0,o.kt)("p",null,"在 /opt 文件夹 新建 frp.muyunyun.cn 文件夹, 并创建 hello.txt 文件。"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-bash"}),'sudo mkdir /opt/frp.muyunyun.cn\nsudo chmod 777 -R /opt/frp.muyunyun.cn\nsudo touch /opt/frp.muyunyun.cn/hello.txt\nsudo chmod 777 -R /opt/frp.muyunyun.cn/hello.txt\nsudo echo "Hello World!" > /opt/frp.muyunyun.cn/hello.txt\n')),(0,o.kt)("p",null,"安装 pm2"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-bash"}),"npm install pm2 -g\n")),(0,o.kt)("p",null,"使用 pm2 守护运行 http-server 服务"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-bash"}),'cd /opt/frp_0.37.0_linux_arm64\nsudo touch start_http_server.sh\nsudo chmod 777 start_http_server.sh\nsudo echo "http-server /opt/frp.muyunyun.cn -p 8080" > start_http_server.sh\npm2 start /opt/frp_0.37.0_linux_arm64/start_http_server.sh\npm2 save\n')),(0,o.kt)("p",null,"使用 pm2 守护运行 frpc 服务"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-bash"}),'sudo touch /opt/frp_0.37.0_linux_arm64/start_frpc.sh\nsudo chmod 777 /opt/frp_0.37.0_linux_arm64/start_frpc.sh\nsudo echo "/opt/frp_0.37.0_linux_arm64/frpc -c /opt/frp_0.37.0_linux_arm64/frpc.ini" > /opt/frp_0.37.0_linux_arm64/start_frpc.sh\ncd /opt/frp_0.37.0_linux_arm64/\npm2 start /opt/frp_0.37.0_linux_arm64/start_frpc.sh\npm2 save\n')),(0,o.kt)("p",null,"可以使用 ",(0,o.kt)("inlineCode",{parentName:"p"},"pm2 list")," 查看当前树莓派中的服务列表。"),(0,o.kt)("p",null,(0,o.kt)("img",s({parentName:"p"},{src:"http://with.muyunyun.cn/442c4a0b41ad3bc6fcbb09f6d162bd06.jpg",alt:null}))),(0,o.kt)("p",null,"在公网访问 frp.muyunyun.cn。💐💐💐至此有了外网可以访问的家庭服务器。"),(0,o.kt)("p",null,(0,o.kt)("img",s({parentName:"p"},{src:"http://with.muyunyun.cn/fac7d7c9a8098d72f98cd6f4485347cd.jpg",alt:null}))))}m.isMDXComponent=!0}}]);