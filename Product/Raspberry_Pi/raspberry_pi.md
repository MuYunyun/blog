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

### 树莓派连接显示器不亮屏的解决方案

* [树莓派连接显示器不亮屏的解决方案](https://www.cnblogs.com/wirehome/p/10298395.html)

### 如何在 Mac 上 SSH 登入树莓派服务器

* SSH 与 VNC 的区别是?
  * SSH(Secure Shell): 安全外壳协议。是一种加密的网络传输协议。
  * VNC: 虚拟网络计算。是一种图形桌面「共享」应用程序，它使用远程帧缓冲协议来远程控制另一台计算机。

### 关机

```bash
sudo shutdown -h now
或者
sudo half
```

### 初始化 config.txt

```bash
# Please DO NOT modify this file; if you need to modify the boot config, the
# "usercfg.txt" file is the place to include user changes. Please refer to
# the README file for a description of the various configuration files on
# the boot partition.

# The unusual ordering below is deliberate; older firmwares (in particular the
# version initially shipped with bionic) don't understand the conditional
# [sections] below and simply ignore them. The Pi4 doesn't boot at all with
# firmwares this old so it's safe to place at the top. Of the Pi2 and Pi3, the
# Pi3 uboot happens to work happily on the Pi2, so it needs to go at the bottom
# to support old firmwares.

[pi4]
kernel=uboot_rpi_4.bin
max_framebuffers=2

[pi2]
kernel=uboot_rpi_2.bin

[pi3]
kernel=uboot_rpi_3.bin

[all]
arm_64bit=1
device_tree_address=0x03000000

# The following settings are "defaults" expected to be overridden by the
# included configuration. The only reason they are included is, again, to
# support old firmwares which don't understand the "include" command.

enable_uart=1
cmdline=cmdline.txt

include syscfg.txt
include usercfg.txt

```