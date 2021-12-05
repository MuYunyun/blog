<!--
abbrlink: lsuxkvce
-->

### oh-my-zsh

在 Unix/Linux 的世界里，人机交互的工具就是 shell 了，由于各个发行版的系统默认 shell 都是 bash，所以 bash 是最为人所知的。其实还有一款效率远远超过 bash 的 shell，叫做 zsh。其实 zsh 在 1990 年的时候就出现了，只比 bash 晚一年，而且 zsh 在 bash 的基础上做了很多功能上、性能上的改进。

zsh 有很多 bash 所没有的功能，但是 zsh 的初期配置太过繁琐，流行率一直不高，直到 github 上 [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh) 项目的出现，使大家使用 zsh 的便捷性大大提高，从 macOS Catalina 版开始默认使用 zsh，使得 zsh 得到了更加广泛的关注。现在 Kail Linux 也默认是使用 zsh。

### 查看当前 shell

```bash
echo $SHELL
# 返回: /bin/bash
```

### 安装 zsh

Ubuntu:

```bash
sudo apt install zsh
```

### 设置 zsh 为默认 shell

```bash
sudo su
sudo chsh -s /bin/zsh

echo $SHELL
# 返回: /bin/zsh
```

### 安装 oh-my-zsh

```bash
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### oh-my-zsh 常见快捷键

* take: 创建一个文件夹并进入该文件夹

> [oh-my-zsh 常见快捷键](https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet)

### 快捷 git 命令查阅

```bash
cat ~/.oh-my-zsh/plugins/git/git.plugin.zsh
```

一些常用命令:

```bash
ga . & gcmsg '..' & gp
gst === git status
gco === git checkout
gcb === git checkout -b
gb === git branch
```