<!--
abbrlink: 5brmoiek
-->

### alfred workflow 是什么

可定制化工具流, 能用脚本(node.js、python、php、ruby、perl)提高我们日常效率，比如个人比较常用的有以下几种 —— 查文档，查单词，查 npm 包, 上传图床快捷操作等等。归纳下可以完成以下几类操作

* 查询信息并可以跳转到相应界面(npm、豆瓣、yd、canIUse)
* 监听键盘按键完成特定事件(yd)
* 和 mac 上的软件进行联动(dash、ip)
* 手机和 mac 的远端通信

### 一些实用的插件

演示一些常用的软件

> 一些有用传插件可查看 [alfred-workflows](https://github.com/willfarrell/alfred-workflows)

### 实用快捷键

`shift + cmd + c`: 找寻近期复制到剪切板中的内容。

### 控制 chrome

[chrome-control](https://github.com/bit2pixel/chrome-control)

阅读该插件的说明文档 [How I Navigate Hundreds of Tabs on Chrome with JXA and Alfred](https://medium.com/@bit2pixel/how-i-navigate-hundreds-of-tabs-on-chrome-with-jxa-and-alfred-9bbf971af02b)，目前控制 Chrome 的能力有限，当前可以使用 JavaScript 控制与 chrome 导航栏相关的部分。

### 七牛云插件调试技巧

该插件脚本使用 AppleScript 进行书写。

排查有如下技巧

1. 在 AppleScript 相关排查代码部分进行 return，可以结合 Copy to Clipboard 查看 log；