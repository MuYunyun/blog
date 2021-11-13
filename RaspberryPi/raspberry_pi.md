### 树莓派

![](http://with.muyunyun.cn/0bb19aa47dec25151a4c7a56524e5d82.jpg-400)

### 树莓派可以做什么

对于开源极客爱好者，可以把树莓派改造成，家庭影院、服务器、无线路由器、BT 下载服务器、FTP 服务器、智能小车、AI 人工智能、智能家居、3D 打印等等。

### 树莓派操作系统

树莓派主板是没有自带系统的，就相当于一个 PC 电脑主板，系统需要自己安装在内存卡里，插上卡才能启动系统。

树莓派官方有自己系统提供: Raspbian 基于 Debian 生态环境优化的，更适合在树莓派上。更多的系统支持的有:

* Kali Linux
* Ubuntu mate
* Volumio
* Retropie
* Lakka
* recalbox
* Win 10LOT
* ...

### 前置准备

* 前置下载
  * SD 卡格式化。
    * [SD Card Formatter](https://www.sdcard.org/downloads/formatter/)
  * 下载镜像。
    * [镜像下载地址](https://ubuntu.com/download/raspberry-pi/thank-you?version=20.04.3&architecture=server-arm64+raspi)
  * 使用 balenaEtcher 将镜像烧录到 SD 卡。
    * [balenaEtcher 下载地址](https://www.balena.io/etcher/)

### 树莓派连接显示器不亮屏的解决方案

* [树莓派连接显示器不亮屏的解决方案](https://www.cnblogs.com/wirehome/p/10298395.html)

需要在 config.txt 补充以下内容:

```bash
hdmi_force_hotplug=1
config_hdmi_boost=4
hdmi_group=2
hdmi_mode=9
hdmi_drive=2
hdmi_ignore_edid=0xa5000080
disable_overscan=1
```

### 树莓派 ubuntu 系统

* 初始账号: ubuntu
* 初始密码: ubuntu

首次登入需要修改密码

```bash
sudo apt install net-tools
```

### 如何查找 IP 地址

楼主最后实验成功的方式(较为方便)如下:

* 步骤一: 网线连上树莓派与路由器。
* 步骤二: 登录路由器后台，查看安装了 ubuntu 的树莓派被分配的 ip。

![](http://with.muyunyun.cn/f32ea27b99f27a350916fb14c3d1bace.jpg)

### 如何在 Mac 上 SSH 登入树莓派服务器

在查找到路由器分配给树莓派的 IP 地址后，我们可以输入如下命令以在 Mac 端访问树莓派。

```
ssh ubuntu@192.168.1.3
```

* SSH 与 VNC 的区别是?
  * SSH(Secure Shell): 安全外壳协议，是一种加密的网络传输协议。
  * VNC: 虚拟网络计算。是一种图形桌面「共享」应用程序，它使用远程帧缓冲协议来远程控制另一台计算机。

### 关机

```bash
sudo shutdown -h now
```

### 内网穿透

### 服务端(云主机) nginx 配置

首先将域名(楼主为 frp.muyunyun.cn )解析到你的服务器 ip，接下来的步骤会用到服务器以下四个端口，为了方面后续的调试运行，需放开以下几个端口的安全策略， 90（Nginx 接收 http 请求用），6000（转发映射 SSH 服务用），8080（转发映射 http 服务用）端口、7000（	服务器端 frps 运行端口）。

配置 Nginx，转发对 frp.muyunyun.cn 域名请求到 8080 端口。

`/etc/nginx/nginx.conf` 设置如下:

Todo: 需要修改

```bash
user www-data;
worker_processes 1;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;
load_module /usr/lib/nginx/modules/ngx_stream_module.so;
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

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

events {
    worker_connections  1024;
}
```

```bash
server {
    server_name      frp.muyunyun.cn;
    listen           80;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host:80;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

新建 /etc/nginx/conf.d/frp.muyunyun.cn.conf ， 并在 /etc/nginx/conf.d/frp.muyunyun.cn.conf 写入以下内容:

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

### frp 配置

### 服务端(云主机)配置

在云主机端执行如下命令:

```bash
cd /opt/
sudo wget https://github.com/fatedier/frp/releases/download/v0.37.0/frp_0.37.0_linux_386.tar.gz
sudo tar zxvf frp_0.37.0_linux_386.tar.gz
```

进入 `/opt/frp_0.37.0_linux_arm64`

![](http://with.muyunyun.cn/32f4ce6995482f6e086b85d2bdd06a01.jpg)

备份客户端 frpc 的配置文件 frpc.ini

```bash
sudo cp frps.ini frps.ini_backup
```

修改服务端配置文件 frps.ini，增加一行 `vhost_http_port = 8080`:

```diff
[common]
bind_port = 7000
+ vhost_http_port = 8080
```

以上配置含义为: 服务端 frps 程序运行在 7000 端口，并将指向 8080 端口的请求转发到客户端。

运行如下命令，开启 frp 的服务端程序

```bash
./frps -c frps.ini
```

![](http://with.muyunyun.cn/eb0a4e394f5b656b3e67c13c6ab1eb82.jpg)

#### 进一步地使用 pm2 运行 frps

安装 node 环境

> [安装 Node.js 多版本](https://cloud.tencent.com/document/product/213/38237#.E6.AD.A5.E9.AA.A43.EF.BC.9A.E5.AE.89.E8.A3.85-node.js-.E5.A4.9A.E7.89.88.E6.9C.AC.EF.BC.88.E5.8F.AF.E9.80.89.EF.BC.89)

全局安装 pm2

```bash
npm i pm2 -g
```

使用 pm2 守护运行 frps 服务

```bash
sudo echo "/opt/frp_0.37.0_linux_386/frps -c /opt/frp_0.37.0_linux_386/frps.ini" > /opt/frp_0.37.0_linux_386/start_frpc.sh
pm2 start /opt/frp_0.37.0_linux_386/start_frps.sh
pm2 save
```

![](http://with.muyunyun.cn/e52ef19b14366896e5de3c6bf7bce609.jpg)

### 客户端(树莓派)配置

在树莓派内执行以下命令，下载 frp，并解压。

```bash
cd /opt/
sudo wget https://github.com/fatedier/frp/releases/download/v0.37.0/frp_0.37.0_linux_arm64.tar.gz
sudo tar zxvf frp_0.37.0_linux_arm64.tar.gz
```

进入 `/opt/frp_0.37.0_linux_arm64`

备份客户端 frpc 的配置文件 frpc.ini

```bash
sudo cp frpc.ini frpc.ini_backup
```

编辑 frpc.ini，备份如下:

```bash
[common]
server_addr = 127.0.0.1
server_port = 7000

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remiote_port = 6000
```

```bash
sudo vim frpc.ini
```

```bash
[common]
server_addr = 81.69.252.246
server_port = 7000

[web]
type = http
local_port = 8080
custom_domains = frp.muyunyun.cn
```

启动客户端

```bash
./frpc -c frpc.ini
```

接着从公网访问 frp.muyunyun.cn:90，验证内网穿透是否成功。

![](http://with.muyunyun.cn/c61981adbdaba27efbc45b26c1921891.jpg)

可以看到来自公网的请求在树莓派的 frp 客户端已经有了反应，接着我们在树莓派搭建一个简单服务。

### 安装 Node.js

使用 ARMv8 版本的稳定版 Node.js。

```bash
cd /opt/
sudo wget https://nodejs.org/dist/v14.18.0/node-v14.18.0-linux-arm64.tar.xz
sudo tar xvf node-v14.18.0-linux-arm64.tar.xz
```

将 Node.js 添加到系统变量

```bash
sudo echo "export NODE_HOME=/opt/node-v14.18.0-linux-arm64" >> ~/.bashrc
sudo echo "export PATH=\$NODE_HOME/bin:\$PATH" >> ~/.bashrc
source ~/.bashrc
```

此时在树莓派中输入 node -v，可以看到对应版本如下:

```bash
ubuntu@ubuntu:~$ node -v
v14.18.0
ubuntu@ubuntu:~$ npm -v
6.14.15
```

接着安装 http-server 服务

```bash
npm install http-server -g
```

在 /opt 文件夹 新建 frp.muyunyun.cn 文件夹, 并创建 hello.txt 文件。

```bash
sudo mkdir /opt/frp.muyunyun.cn
sudo chmod 777 -R /opt/frp.muyunyun.cn
sudo touch /opt/frp.muyunyun.cn/hello.txt
sudo chmod 777 -R /opt/frp.muyunyun.cn/hello.txt
sudo echo "Hello World!" > /opt/frp.muyunyun.cn/hello.txt
```

安装 pm2

```bash
npm install pm2 -g
```

使用 pm2 守护运行 http-server 服务

```bash
cd /opt/frp_0.37.0_linux_arm64
sudo touch start_http_server.sh
sudo chmod 777 start_http_server.sh
sudo echo "http-server /opt/frp.muyunyun.cn -p 8080" > start_http_server.sh
pm2 start /opt/frp_0.37.0_linux_arm64/start_http_server.sh
pm2 save
```

使用 pm2 守护运行 frpc 服务

```bash
sudo touch /opt/frp_0.37.0_linux_arm64/start_frpc.sh
sudo chmod 777 /opt/frp_0.37.0_linux_arm64/start_frpc.sh
sudo echo "/opt/frp_0.37.0_linux_arm64/frpc -c /opt/frp_0.37.0_linux_arm64/frpc.ini" > /opt/frp_0.37.0_linux_arm64/start_frpc.sh
cd /opt/frp_0.37.0_linux_arm64/
pm2 start /opt/frp_0.37.0_linux_arm64/start_frpc.sh
pm2 save
```

可以使用 `pm2 list` 查看当前树莓派中的服务列表。

![](http://with.muyunyun.cn/442c4a0b41ad3bc6fcbb09f6d162bd06.jpg)

在公网访问 frp.muyunyun.cn:90。💐💐💐至此有了外网可以访问的家庭服务器。

![](http://with.muyunyun.cn/fac7d7c9a8098d72f98cd6f4485347cd.jpg)

### 添加 SSH 服务

```bash
[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000
```

如上配置是指将树莓派的默认 ssh 的 22 号端口映射到 frp.muyunyun.cn 的 6000 端口。

重启 frpc 服务:

```bash
cd /opt/frp_0.37.0_linux_arm64
pm2 restart start_frpc.sh
```

通过公网 frp.muyunyun.cn 的 6000 端口进行 ssh 登录。

```bash
ssh ubuntu@frp.muyunyun.cn -p 6000
```

![](http://with.muyunyun.cn/43431e73e8a218fb9e0a494f61f8f0df.jpg)

## 实验过未成功的方案

### 树莓派连接手机热点

* [树莓派连接手机热点](https://blog.csdn.net/weixin_44415549/article/details/105415371)
* [树莓派没有路由器,连接手机热点使用](https://www.geek-share.com/detail/2809069950.html)

* 步骤一: boot 盘新建一个 ssh 空文件。
* 步骤二: boot 盘新建一个 wpa_supplicant.conf，里面代码为

```bash
country=GB
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
  ssid=""
  psk=""
  priority=99
}
```

> ssid 写热点名称，psk 写热点密码。

* 步骤三: 手机下载远程服务软件 `Termius`。

### 树莓派无线连接 wifi

* [树莓派 ubuntu20.04 链接 wifi](https://blog.csdn.net/wei_love_2017/article/details/108877102)
