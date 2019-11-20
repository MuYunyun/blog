### mac 快捷键

* 截屏/录屏幕: shift + cmd + 5
* cmd + tab: 应用切换
* ctrl + cmd + 空格: 表情输入
* alt + cmd + v: 图床
* shift + cmd + c: 复制过的内容

### 管理 iphone 的图库

痛点: 照片越来越多, 占用 icloud 体积

1. 连接 iphone 和 Mac, 在 Mac 上使用 Photos 这个软件将 iphone 的照片都导入 Library, 勾选 iphone 中导入的图片自动删除;
2. 在 Mac 端将喜欢的照片打星, 然后右键点击 favourite 里的图片 create 到一个新文件;
3. 可以右键点击 Share/Airdrop 将最终筛选好的图片传回 iphone;

当前同步时间 2018.10.6

### 1password 快捷键

* cmd + \: 网页上使用自动填充/其它地方使用直接打开网页+填充登入

疑问点: 转换密码项到登录项

> [1Password for Mac 使用指南](https://sspai.com/post/35195)

### 邮箱加密

```bash
echo xxx | base64
```

得到 bXVqdWVAcGluZHVvZHVvLmNvbQo=

```bash
echo bXVqdWVAcGluZHVvZHVvLmNvbQo= | base64 -D
```