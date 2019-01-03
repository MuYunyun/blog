### 数据备份方案

首先选择相应插件, 这里以 git-remark 为例

![](http://with.muyunyun.cn
http://with.muyunyun.cn/
oqhtscus0.bkt.clouddn.com/642ef9638488d9d9b0857464b354f246.jpg-200)

```js
chrome.storage.local.get('github-repo-remarks', res => {
  console.log(JSON.stringify(res['github-repo-remarks']))
})
```

```js
chrome.storage.local.set({'github-repo-remarks': obj}, () => {
})
```

### 相关文档

* [chrome://extensions](chrome://extensions)
* [360扩展开发文档](http://open.chrome.360.cn/extension_dev/overview.html)
* [chrome扩展开发文档](https://developer.chrome.com/extensions)