<!--
abbrlink: 1vso6n27
-->

- [Mac](#mac)
  - [快捷键](#快捷键)
  - [管理 iphone 的图库](#管理-iphone-的图库)
  - [邮箱加密](#邮箱加密)
  - [网易云音乐迁移到 apple music](#网易云音乐迁移到-apple-music)
  - [Foreign Books Resource](#foreign-books-resource)
  - [注册美区 Apple ID](#注册美区-apple-id)
  - [美区 Apple Id 账号如何购买付费应用?](#美区-apple-id-账号如何购买付费应用)
- [apple pencel](#apple-pencel)
- [快速切换勿扰模式](#快速切换勿扰模式)

## Mac

### 快捷键

* `shift + cmd + 5`: 截屏/录屏幕
* `cmd + tab`: 应用切换
* `ctrl + cmd + 空格`: 表情输入
* `alt + cmd + v`: 图床
* `shift + cmd + c`: 复制过的内容

### 管理 iphone 的图库

痛点: 照片越来越多, 占用 icloud 体积

1. 连接 iphone 和 Mac, 在 Mac 上使用 Photos 这个软件将 iphone 的照片都导入 Library, 勾选 iphone 中导入的图片自动删除;
2. 在 Mac 端将喜欢的照片打星, 然后右键点击 favourite 里的图片 create 到一个新文件;
3. 可以右键点击 Share/Airdrop 将最终筛选好的图片传回 iphone;

### 邮箱加密

```bash
echo xxx | base64
```

得到 bXVqdWVAcGluZHVvZHVvLmNvbQo=

```bash
echo bXVqdWVAcGluZHVvZHVvLmNvbQo= | base64 -D
```

### 网易云音乐迁移到 apple music

使用 TuneMyMusic 导入。

1. 打开 https://yyrcd.com/2018/11/14/n2s-zh/, 填入网易云歌单的 ID。假如歌单地址是 https://music.163.com/#/playlist?id=2651036663, 那么便填写 2651036663;
2. 接下来点击 Search, 会显示歌单列表, 然后复制生成的文字版歌单。导出歌单后，打开 [TuneMyMusic](https://www.tunemymusic.com/zh-cn/);
3. 导入来源选择从文本, 目的地选择 Apple Music 即可;

### Foreign Books Resource

首先支持正版图书, 但是在预算有限的情况下安利下 [Library Genesis](https://librarygenesis.net/), 亲测能获取各类外文图书资源。

### 注册美区 Apple ID

账号名(美区): muyy95@gmail.com
账户名(国区): 328375795@qq.com

> [注册美区 Apple ID](https://zhuanlan.zhihu.com/p/36574047)

### 美区 Apple Id 账号如何购买付费应用?

当付款的时候明显钱是够的，但是就是购买不了，会弹框提示你“insufficient remaining store credit tap continue to sign in”。很大可能是存在消费税问题，所以在实际扣款的时候会高于标价，可以切换成免税州再购买就可以了，具体操作可以参考[回答](https://www.zhihu.com/question/266838782/answer/1210827377)。

## apple pencel

* Mark up a screenshot

## 快速切换勿扰模式

cmd + shift + q

1. 打开系统设置，搜索 keyboard shortcuts 并进入。
2. 定位到 「Mission Control」，选中 「Turn Do Not Disturb On/Off」 双击以设置自己的快捷键。