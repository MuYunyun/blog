### 树莓派

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

### 如何查找 IP 地址

* [How to Find your IP Address](https://www.raspberrypi.com/documentation/computers/remote-access.html#ip-address)

> If you are using a display with your Raspberry Pi and if you boot to the command line instead of the desktop, your IP address should be shown in the last few messages before the login prompt. Otherwise open a Terminal window and type hostname -I which will reveal your Raspberry Pi’s IP address.

### 如何在 Mac 上 SSH 登入树莓派服务器

* SSH 与 VNC 的区别是?
  * SSH(Secure Shell): 安全外壳协议。是一种加密的网络传输协议。
  * VNC: 虚拟网络计算。是一种图形桌面「共享」应用程序，它使用远程帧缓冲协议来远程控制另一台计算机。

### Todo

### 关机

```bash
sudo shutdown -h now
或者
sudo half
```