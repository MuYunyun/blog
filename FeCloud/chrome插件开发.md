### 数据备份方案

首先选择相应插件, 这里以 git-remark 为例

![](http://with.muyunyun.cn/642ef9638488d9d9b0857464b354f246.jpg-200)

```js
chrome.storage.local.get('github-repo-notes', res => {
  console.log(JSON.stringify(res['github-repo-notes']))
})
```

```js
chrome.storage.local.set({'github-repo-notes': obj}, () => {
})
```

### 相关文档

* [chrome://extensions](chrome://extensions)
* [360 扩展开发文档](http://open.chrome.360.cn/extension_dev/overview.html)
* [chrome 扩展开发文档](https://developer.chrome.com/extensions)

### 插件发版

* [插件发版地址](https://chrome.google.com/webstore/developer/dashboard/)
* [GitHub Notes](https://chrome.google.com/webstore/detail/github-notes/ololfachmeilbnmipbbglhbdnadcjlak?authuser=0)

> 开发者账号 backup: liweirancn@gmail.com
