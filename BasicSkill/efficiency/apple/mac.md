### mac 快速迁移方案

#### 同步 vscode 配置

不同电脑同步 Vscode 配置

token: f1d271d318f839fa858681ec1c18d77642a83e70;
gist: fc7a4a0269a459785782797ff83e65a1

> [Visual Studio Code Settings Synchronization](http://shanalikhan.github.io/2015/12/15/Visual-Studio-Code-Sync-Settings.html)

#### chrome 插件

* Infinity 标签支持备份数据

### 执行 brew install 命令长时间卡在 Updating Homebrew 的解决方法

执行 brew 命令安装软件的时候，跟以下 3 个仓库地址有关：

1. brew.git

```bash
# 替换成阿里巴巴的 brew.git 仓库地址:
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

#=======================================================

# 还原为官方提供的 brew.git 仓库地址
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git
```

2. homebrew-core.git

```bash
# 替换成阿里巴巴的 homebrew-core.git 仓库地址:
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

#=======================================================

# 还原为官方提供的 homebrew-core.git 仓库地址
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```

3. homebrew-bottles

```js
# 替换成阿里巴巴的 homebrew-bottles 访问地址:
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc

#=======================================================

# 还原为官方提供的 homebrew-bottles 访问地址
vi ~/.zshrc
# 然后，删除 HOMEBREW_BOTTLE_DOMAIN 这一行配置
source ~/.zshrc
```

> see [执行 brew install 命令长时间卡在 Updating Homebrew 的解决方法
](https://learnku.com/articles/18908)

### 软件

* [timetreeapp.com](https://timetreeapp.com/): 多人共享日历

### 外接显示屏变卡

* [mac 外接显示器卡成狗](https://www.v2ex.com/t/359003)

* 方案
  * 重置 SMC
  * 换线